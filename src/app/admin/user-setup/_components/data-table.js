"use client";
import { useState } from "react";

import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { put } from "@/api";
import { toast } from "sonner";
import DeleteUserModal from "./delete-user";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ToggleStatus = ({ row, refetch }) => {
  const statusChange = useMutation({
    mutationFn: (userDetails) => put("/admin/users/status-change", userDetails),
    onSuccess: (data) => {
      if (data.success) {
        toast("Status updated!", {
          action: {
            label: <Cross2Icon className="rounded-full" />,
          },
        });
        refetch();
      }
    },
    onError: () => {
      toast("Invalid credentials!", {
        action: {
          label: <Cross2Icon className="rounded-full" />,
        },
      });
    },
  });
  const handleStatusChange = async (val) => {
    statusChange.mutate({
      id: val.original["id"],
      active: !val.original["active"],
    });
  };

  return (
    <div className="">
      <Switch
        disabled={statusChange.isPending}
        checked={row.getValue("active")}
        onCheckedChange={() => handleStatusChange(row)}
      />
    </div>
  );
};

export function UserDatatable({ data, refetch }) {
  //   const [tableData, setTableData] = useState(data);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [destinationStatus, setDestinationStatus] = useState("");
  const router = useRouter();

  const columns = [
    {
      accessorKey: "userName",
      header: "Username",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("userName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => (
        <div className="">
          {row
            .getValue("permissions")
            ?.map((permission) => permission.name)
            ?.join(",")}
        </div>
      ),
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => {
        return <ToggleStatus row={row} refetch={refetch} />;
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              onClick={() =>
                router.push(`/admin/user-setup/${row.original.id}`)
              }
            >
              <Pencil1Icon />
            </Button>
            <Button variant="destructive" className="">
              <DeleteUserModal refetch={refetch} row={row.original} />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
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
      <div className="flex justify-between mb-12 items-center py-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search user..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="w-[250px]"
          />
          <Button className="ml-2">Search</Button>
        </div>
        <div className="flex ml-[24px]">
          {/* <div className="font-semibold">Filter users</div> */}
          <RadioGroup defaultValue="all" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inactive" id="inactive" />
              <Label htmlFor="inactive">Inactive</Label>
            </div>
          </RadioGroup>
        </div>
        {/* <div className="flex gap-4">
          <AddPermissionModal refetch={refetch} />
          <AddUserModal refetch={refetch} />
        </div> */}
      </div>

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
