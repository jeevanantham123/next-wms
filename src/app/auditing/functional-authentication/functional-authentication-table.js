"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "jspdf-autotable";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { downloadExcel, downloadPDF } from "@/lib/utils";

const mockUserData = [
  {
    profileCode: "PC001",
    desc: "Admin",
    function: "User Management",
    description: "Manage users",
    module: "Admin",
    groupBySite: "Yes",
    access: "Full",
    permissions: "Read/Write",
  },
  {
    profileCode: "PC002",
    desc: "Sales",
    function: "Order Processing",
    description: "Process orders",
    module: "Sales",
    groupBySite: "No",
    access: "Limited",
    permissions: "Read-Only",
  },
  {
    profileCode: "PC003",
    desc: "Inventory",
    function: "Stock Management",
    description: "Manage stock",
    module: "Inventory",
    groupBySite: "Yes",
    access: "Full",
    permissions: "Read/Write",
  },
  {
    profileCode: "PC004",
    desc: "Finance",
    function: "Invoicing",
    description: "Generate invoices",
    module: "Finance",
    groupBySite: "No",
    access: "Full",
    permissions: "Read-Only",
  },
  {
    profileCode: "PC005",
    desc: "Operations",
    function: "Scheduling",
    description: "Schedule tasks",
    module: "Operations",
    groupBySite: "Yes",
    access: "Limited",
    permissions: "Read/Write",
  },
  {
    profileCode: "PC006",
    desc: "Admin",
    function: "User Management",
    description: "Manage users",
    module: "Admin",
    groupBySite: "Yes",
    access: "Full",
    permissions: "Read/Write",
  },
  {
    profileCode: "PC007",
    desc: "Sales",
    function: "Order Processing",
    description: "Process orders",
    module: "Sales",
    groupBySite: "No",
    access: "Limited",
    permissions: "Read-Only",
  },
  {
    profileCode: "PC008",
    desc: "Inventory",
    function: "Stock Management",
    description: "Manage stock",
    module: "Inventory",
    groupBySite: "Yes",
    access: "Full",
    permissions: "Read/Write",
  },
  {
    profileCode: "PC009",
    desc: "Finance",
    function: "Invoicing",
    description: "Generate invoices",
    module: "Finance",
    groupBySite: "No",
    access: "Full",
    permissions: "Read-Only",
  },
  {
    profileCode: "PC010",
    desc: "Operations",
    function: "Scheduling",
    description: "Schedule tasks",
    module: "Operations",
    groupBySite: "Yes",
    access: "Limited",
    permissions: "Read/Write",
  },
];

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-[50px]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profileCode",
    header: "Profile Code",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("profileCode")}</div>
    ),
  },
  {
    accessorKey: "desc",
    header: "Title",
    cell: ({ row }) => <div className="capitalize">{row.getValue("desc")}</div>,
  },
  {
    accessorKey: "function",
    header: "Function",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("function")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "module",
    header: "Module",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("module")}</div>
    ),
  },
  {
    accessorKey: "groupBySite",
    header: "Group By Sites",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("groupBySite")}</div>
    ),
  },
  {
    accessorKey: "access",
    header: "Access",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("access")}</div>
    ),
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("permissions")}</div>
    ),
  },
  //   {
  //     id: "actions",
  //     header: "Actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex divide-x cursor-pointer">
  //           <div
  //             onClick={() => router.push(`/admin/user-setup/${row.original.id}`)}
  //           >
  //             <Pencil1Icon className="h-[24px] w-[24px] mr-2" />
  //           </div>
  //           <div className="">
  //             <TrashIcon className="h-[24px] ml-2 w-[24px]" />
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
];

function FunctionalAuthentication() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const convertToPDF = () => {
    downloadPDF(
      columns
        ?.filter((column) => column.id !== "select" && column.id !== "actions")
        ?.map((column) => column.header),
      mockUserData?.map((masterData) => {
        return [
          masterData.profileCode,
          masterData.desc,
          masterData.function,
          masterData.description,
          masterData.module,
          masterData.groupBySite,
          masterData.access,
          masterData.permissions,
        ];
      }),
      "Functional Authentication.pdf",
      "Functional Authentication Report"
    );
  };

  const convertToExcel = () => {
    downloadExcel(
      "Functional Authentication.xlsx",
      "Functional Authentication",
      mockUserData?.map((masterData) => {
        return {
          "Profile Code": masterData.profileCode,
          Description: masterData.desc,
          Function: masterData.function,
          "Detailed Description": masterData.description,
          Module: masterData.module,
          "Group By Site": masterData.groupBySite,
          Access: masterData.access,
          Permissions: masterData.permissions,
        };
      })
    );
  };

  const table = useReactTable({
    data: mockUserData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full bg-white p-4 rounded-md overflow-hidden shadow-md">
      <div className="flex gap-2 mb-4 items-center py-4">
        <div className="flex flex-col">
          <div className="text-[18px] font-medium text-pt">
            Functional Authentication
          </div>
          <div className="text-[14px] text-st">Description</div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button
              variant="outline"
              className="ml-auto border text-theme border-theme bg-white"
            >
              Module <ChevronDownIcon className="ml-2 h-4 w-4 text-theme" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {mockUserData.map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.profileCode}
                  className="capitalize"
                  checked={true}
                  // checked={column.getIsVisible()}
                  // onCheckedChange={(value) =>
                  //   column.toggleVisibility(!!value)
                  // }
                >
                  {column.module}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="bg-white">
            <Button
              variant="outline"
              className=" border text-theme border-theme bg-white"
            >
              Columns <ChevronDownIcon className="ml-2 h-4 w-4 text-theme" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown for Download Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="default" className="">
              Download As{" "}
              <ChevronDownIcon className="ml-2 h-4 w-4 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem className="bg-white" onClick={convertToExcel}>
              Excel Format
            </DropdownMenuItem>
            <DropdownMenuItem className="bg-white" onClick={convertToPDF}>
              PDF Format
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader className="h-[44px] bg-[#F9FAFB]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[14px] font-normal text-[#667085]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="h-[44px]"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FunctionalAuthentication;
