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
import { Input } from "@/components/ui/input";
import { downloadExcel, downloadPDF } from "@/lib/utils";

const mockUserData = [
  {
    userCode: "U001",
    userName: "WillSmith",
    firstName: "Will",
    lastName: "Smith",
    active: "Yes",
    email: "willSmith@example.com",
    mobile: "1234567890",
    loginId: "WS123",
    functionalProfile: "Admin",
    menuProfile: "Full Access",
    professionalCode: "PRO123",
    lastConnection: "2024-11-03 14:30",
  },
  {
    userCode: "U002",
    userName: "JaneSmith",
    firstName: "Jane",
    lastName: "Smith",
    active: "No",
    email: "janesmith@example.com",
    mobile: "9876543210",
    loginId: "js456",
    functionalProfile: "User",
    menuProfile: "Limited Access",
    professionalCode: "PRO456",
    lastConnection: "2024-11-02 10:15",
  },
  {
    userCode: "U003",
    userName: "JhonDeo",
    firstName: "Jhon",
    lastName: "Deo",
    active: "Yes",
    email: "johndoe@example.com",
    mobile: "1234567890",
    loginId: "johnd123",
    functionalProfile: "SuperAdmin",
    menuProfile: "Full Access",
    professionalCode: "PRO123",
    lastConnection: "2024-11-03 14:30",
  },
  {
    userCode: "U004",
    userName: "KimJhon",
    firstName: "Kim",
    lastName: "Jhon",
    active: "No",
    email: "kimJhon@example.com",
    mobile: "9876543210",
    loginId: "kj456",
    functionalProfile: "User",
    menuProfile: "Limited Access",
    professionalCode: "PRO456",
    lastConnection: "2024-11-02 10:15",
  },
  {
    userCode: "U005",
    userName: "RobertShim",
    firstName: "Robert",
    lastName: "Shim",
    active: "Yes",
    email: "robertShim@example.com",
    mobile: "1234567890",
    loginId: "rs123",
    functionalProfile: "Admin",
    menuProfile: "Full Access",
    professionalCode: "PRO123",
    lastConnection: "2024-11-03 14:30",
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
    accessorKey: "userCode",
    header: "User Code",
    cell: ({ row }) => (
      <div className="capitalize min-w-[100px]">{row.getValue("userCode")}</div>
    ),
  },
  {
    accessorKey: "userName",
    header: "User Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userName")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize min-w-[100px]">
        {row.getValue("firstName")}
      </div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize min-w-[100px]">{row.getValue("lastName")}</div>
    ),
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("active")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("mobile")}</div>
    ),
  },
  {
    accessorKey: "loginId",
    header: "Login ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("loginId")}</div>
    ),
  },
  {
    accessorKey: "functionalProfile",
    header: "Functional Profile",
    cell: ({ row }) => (
      <div className="capitalize min-w-[150px]">
        {row.getValue("functionalProfile")}
      </div>
    ),
  },
  {
    accessorKey: "menuProfile",
    header: "Menu Profile",
    cell: ({ row }) => (
      <div className="capitalize min-w-[150px]">
        {row.getValue("menuProfile")}
      </div>
    ),
  },
  {
    accessorKey: "professionalCode",
    header: "Professional Code",
    cell: ({ row }) => (
      <div className="capitalize min-w-[150px]">
        {row.getValue("professionalCode")}
      </div>
    ),
  },
  {
    accessorKey: "lastConnection",
    header: "Last Connection",
    cell: ({ row }) => (
      <div className="capitalize min-w-[150px]">
        {row.getValue("lastConnection")}
      </div>
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

function UserData() {
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
          masterData.userCode,
          masterData.userName,
          masterData.firstName,
          masterData.lastName,
          masterData.active,
          masterData.email,
          masterData.mobile,
          masterData.loginId,
          masterData.functionalProfile,
          masterData.menuProfile,
          masterData.professionalCode,
          masterData.lastConnection,
        ];
      }),
      "User Data.pdf",
      "User Data Report"
    );
  };

  const convertToExcel = () => {
    downloadExcel(
      "User Data.xlsx",
      "User Data",
      mockUserData?.map((masterData) => {
        return {
          "User Code": masterData.userCode,
          "User Name": masterData.userName,
          "First Name": masterData.firstName,
          "Last Name": masterData.lastName,
          Active: masterData.active,
          Email: masterData.email,
          Mobile: masterData.mobile,
          "Login ID": masterData.loginId,
          "Functional Profile": masterData.functionalProfile,
          "Menu Profile": masterData.menuProfile,
          "Professional Code": masterData.professionalCode,
          "Last Connection": masterData.lastConnection,
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
          <div className="text-[18px] font-medium text-pt">User Data</div>
          <div className="text-[14px] text-st">Description</div>
        </div>

        <Input
          placeHolder="Start Date"
          type="date"
          className="ml-auto w-[150px] text-theme h-[36px] border border-theme"
        />
        <Input
          placeHolder="End Date"
          type="date"
          className="w-[150px] text-theme h-[36px] border border-theme"
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

export default UserData;
