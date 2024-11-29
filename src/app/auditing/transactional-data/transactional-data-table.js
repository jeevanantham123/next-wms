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
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "SORDER",
    tableTitle: "POs",
    transaction: "ZA001",
    date: "11/01/24",
    time: "07:05",
    operation: "UPDATE",
    user: "SREE",
    name: "Sree G",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SREE",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
  },
  {
    table: "PORDER",
    tableTitle: "POs",
    transaction: "ZA061",
    date: "10/22/24",
    time: "07:05",
    operation: "INSERT",
    user: "SRAV",
    name: "Sravya",
    folder: "GITTRN",
    tableField: "BPAADD",
    fieldDesc: "Address",
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
    accessorKey: "table",
    header: "Table",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("table")}</div>
    ),
  },
  {
    accessorKey: "tableTitle",
    header: "Table Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tableTitle")}</div>
    ),
  },
  {
    accessorKey: "transaction",
    header: "Transaction",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("transaction")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => <div className="capitalize">{row.getValue("time")}</div>,
  },
  {
    accessorKey: "operation",
    header: "Operation",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("operation")}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <div className="capitalize">{row.getValue("user")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "folder",
    header: "Folder",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("folder")}</div>
    ),
  },
  {
    accessorKey: "tableField",
    header: "Table Field",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tableField")}</div>
    ),
  },
  {
    accessorKey: "fieldDesc",
    header: "Field Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fieldDesc")}</div>
    ),
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex divide-x cursor-pointer">
  //         <div
  //           onClick={() => router.push(`/admin/user-setup/${row.original.id}`)}
  //         >
  //           <Pencil1Icon className="h-[24px] w-[24px] mr-2" />
  //         </div>
  //         <div className="">
  //           <TrashIcon className="h-[24px] ml-2 w-[24px]" />
  //         </div>
  //       </div>
  //     );
  //   },
  // },
];

function TransactionalData() {
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
          masterData.table,
          masterData.tableTitle,
          masterData.transaction,
          masterData.date,
          masterData.time,
          masterData.operation,
          masterData.user,
          masterData.name,
          masterData.folder,
          masterData.tableField,
          masterData.fieldDesc,
        ];
      }),
      "Transactional Data.pdf",
      "Transactional Data Report"
    );
  };

  const convertToExcel = () => {
    downloadExcel(
      "Transactional Data.xlsx",
      "Transactional Data",
      mockUserData?.map((masterData) => {
        return {
          Table: masterData.table,
          TableTitle: masterData.tableTitle,
          Transaction: masterData.transaction,
          Date: masterData.date,
          Time: masterData.time,
          Operation: masterData.operation,
          User: masterData.user,
          Name: masterData.name,
          Folder: masterData.folder,
          "Table Field": masterData.tableField,
          "Field Description": masterData.fieldDesc,
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
            Transactional Data
          </div>
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

export default TransactionalData;
