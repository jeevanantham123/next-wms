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
import { ChevronDownIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import "jspdf-autotable";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { downloadExcel, downloadPDF } from "@/lib/utils";
const mockUserData = [
  {
    functionalProfile: "FP001",
    description: "Admin Profile",
    accessCodes: ["Full Access"],
  },
  {
    functionalProfile: "FP002",
    description: "Sales Profile",
    accessCodes: ["Read", "Write"],
  },
  {
    functionalProfile: "FP003",
    description: "Inventory Profile",
    accessCodes: ["Read only"],
  },
  {
    functionalProfile: "FP001",
    description: "Admin Profile",
    accessCodes: ["Full Access"],
  },
  {
    functionalProfile: "FP002",
    description: "Sales Profile",
    accessCodes: ["Read", "Write"],
  },
  {
    functionalProfile: "FP003",
    description: "Inventory Profile",
    accessCodes: ["Read only"],
  },
  {
    functionalProfile: "FP001",
    description: "Admin Profile",
    accessCodes: ["Full Access"],
  },
  {
    functionalProfile: "FP002",
    description: "Sales Profile",
    accessCodes: ["Read", "Write"],
  },
  {
    functionalProfile: "FP003",
    description: "Inventory Profile",
    accessCodes: ["Read only"],
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
    accessorKey: "functionalProfile",
    header: "Functional Profile",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("functionalProfile")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Description
    //       <CaretSortIcon className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "accessCodes",
    header: "All Access Codes",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       All Access Codes
    //       <CaretSortIcon className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => (
      <div className="capitalize flex gap-2">
        {row.getValue("accessCodes")?.map((access) => {
          return (
            <Badge
              className="rounded-full bg-[#ECFDF3] text-[#027A48] h-[26px] shadow-none font-normal text-[12px]"
              key={access}
            >
              {access}
            </Badge>
          );
        })}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex divide-x cursor-pointer">
          <div
            onClick={() => router.push(`/admin/user-setup/${row.original.id}`)}
          >
            <Pencil1Icon className="h-[24px] w-[24px] mr-2" />
          </div>
          <div className="">
            <TrashIcon className="h-[24px] ml-2 w-[24px]" />
          </div>
        </div>
      );
    },
  },
];

function FunctionalProfile() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const convertToExcel = () => {
    downloadExcel(
      "Functional Profile.xlsx",
      "Functional Profile",
      mockUserData?.map((masterData) => {
        return {
          "Functional Profile": masterData.functionalProfile,
          Description: masterData.description,
          "Access Codes": masterData.accessCodes?.join(","),
        };
      })
    );
  };

  const convertToPDF = () => {
    downloadPDF(
      columns
        ?.filter((column) => column.id !== "select" && column.id !== "actions")
        ?.map((column) => column.header),
      mockUserData?.map((masterData) => {
        return [
          masterData.functionalProfile,
          masterData.description,
          masterData.accessCodes,
        ];
      }),
      "Functional Profile.pdf",
      "Functional Profile Report"
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
            Functional Profile Code
          </div>
          <div className="text-[14px] text-st">Description</div>
        </div>

        <Input
          placeholder="Search functional profile..."
          value={table.getColumn("functionalProfile")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table
              .getColumn("functionalProfile")
              ?.setFilterValue(event.target.value)
          }
          className="w-[400px] ml-auto h-[36px] border border-theme"
        />
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

export default FunctionalProfile;
