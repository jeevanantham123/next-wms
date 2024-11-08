"use client";
import { useState } from "react";

import { Cross2Icon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { put } from "@/api";
import { toast } from "sonner";
import AddUserModal from "./create-user";
import AddPermissionModal from "./create-permission";
import ChangePasswordModal from "./change-password";
import DeleteUserModal from "./delete-user";
import ChangePermissionModal from "./change-permission";
import { useRouter } from "next/navigation";

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
      enableHiding: false,
      cell: ({ row }) => {
        console.log(row.original.id, "row");
        return (
          <DropdownMenu className="bg-white">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <ChangePermissionModal refetch={refetch} row={row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <ChangePasswordModal refetch={refetch} row={row.original} />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push(`/admin/user/${row.original.id}`)}
              >
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <DeleteUserModal refetch={refetch} row={row.original} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
        <Input
          placeholder="Filter user..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="w-fit"
        />
        <div className="flex gap-4">
          <AddPermissionModal refetch={refetch} />
          <AddUserModal refetch={refetch} />
        </div>
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
