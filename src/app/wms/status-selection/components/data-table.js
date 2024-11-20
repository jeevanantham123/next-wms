"use client";

import { useState } from "react";
import { SearchIcon, CrossIcon, X } from "lucide-react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateDialog from "./update-dialog";
import { Label } from "@/components/ui/label";
import { postDestinationChange } from "../actions";

export const columns = [
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
    accessorKey: "productId",
    header: "Product",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("productId")}</div>
    ),
  },
  {
    accessorKey: "lot",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LOT
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("lot")}</div>,
  },
  {
    accessorKey: "expiryDate",
    header: () => <div className="min-w-[100px]">Expiry Date</div>,
    cell: ({ row }) => {
      const date = row.getValue("expiryDate");

      // Format the date
      const formatted = date;

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "lpn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LPN/Pallet
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("lpn")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase justify-center flex items-center">
        {row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "UOM",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UOM
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase justify-center flex items-center">
        {row.getValue("UOM")}
      </div>
    ),
  },
  {
    accessorKey: "currentStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase justify-center flex items-center">
        {row.getValue("currentStatus")}
      </div>
    ),
  },
  {
    accessorKey: "destinationStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Destination Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase justify-center flex items-center">
        {row.getValue("destinationStatus")}
      </div>
    ),
  },
  {
    accessorKey: "loc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LOC
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase justify-center flex items-center">
        {row.getValue("loc")}
      </div>
    ),
  },
  {
    accessorKey: "packingQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Packing Quantity
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase justify-center flex items-center">
        {row.getValue("packingQuantity")}
      </div>
    ),
  },
  {
    accessorKey: "packingUnit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Packing Unit
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase justify-center flex items-center">
        {row.getValue("packingUnit")}
      </div>
    ),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export function DataTableDemo({ data }) {
  const [tableData, setTableData] = useState(data);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [destinationStatus, setDestinationStatus] = useState("");

  console.log(tableData, 'tableData')

  const table = useReactTable({
    data: tableData,
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

  const handleDestinationStatusChange = () => {
    let prevTableData = tableData;
    prevTableData = prevTableData?.map((tableRow) => {
      return { ...tableRow, destinationStatus: destinationStatus };
    });
    setTableData(prevTableData);
    setDestinationStatus("");
  };

  const handleSubmit = async () => {
    const flatArray = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);
    await postDestinationChange({ siteValue: "AU012", stockList: flatArray }) //FIXME: Sitevalue is constant
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full bg-white p-4 rounded-md overflow-hidden shadow-md">
      <div className="flex gap-2 mb-12 items-center py-2">
        <div className="relative">
          <Input
            placeholder="Search product"
            value={table.getColumn("productId")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("productId")?.setFilterValue(event.target.value)
            }
            className="w-fit"
          />
          {!table.getColumn("productId")?.getFilterValue() ?
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
            :
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X className="h-4 w-4 text-muted-foreground" />
            </span>
          }
        </div>
        <div className="relative">

          <Input
            placeholder="Search status" // Current status
            value={table.getColumn("currentStatus")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("currentStatus")?.setFilterValue(event.target.value)
            }
            className="w-fit"
          />
          {!table.getColumn("currentStatus")?.getFilterValue() ?
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
            :
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X className="h-4 w-4 text-muted-foreground" />
            </span>
          }
        </div>
        <div className="relative">
          <Input
            placeholder="Search pallet"
            value={table.getColumn("pallet")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("pallet")?.setFilterValue(event.target.value)
            }
            className="w-fit"
          />
          {!table.getColumn("pallet")?.getFilterValue() ?
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
            :
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X className="h-4 w-4 text-muted-foreground" />
            </span>
          }
        </div>
        <div className="relative">

          <Input
            placeholder="Search Lot "
            value={table.getColumn("lot")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("lot")?.setFilterValue(event.target.value)
            }
            className="w-fit"
          />
          {!table.getColumn("lot")?.getFilterValue() ?
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
            :
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X className="h-4 w-4 text-muted-foreground" />
            </span>
          }
        </div>
        <div className="relative">

          <Input
            placeholder="Destination Status"
            value={table.getColumn("destination status")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("destination status")?.setFilterValue(event.target.value)
            }
            className="w-fit"
          />
          {!table.getColumn("destination status")?.getFilterValue() ?
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </span>
            :
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <X className="h-4 w-4 text-muted-foreground" />
            </span>
          }
        </div>


        {/* <Button type="submit">Search</Button> */}

        {/* <UpdateDialog selectedRows={table.getSelectedRowModel().rows} /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
      </div>
      {/* <div className="flex w-full my-4 gap-4 justify-center items-center">
        <Label>Destination Status</Label>
        <Input
          placeholder="status"
          value={destinationStatus}
          className="w-fit"
          onChange={(e) => setDestinationStatus(e.target.value)}
        />
        <Button type="submit" onClick={() => handleDestinationStatusChange()}>
          Apply to all
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div> */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
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
