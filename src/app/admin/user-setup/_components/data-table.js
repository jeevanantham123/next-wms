"use client";
import { useState } from "react";

import { Cross2Icon, DownloadIcon, Pencil1Icon } from "@radix-ui/react-icons";
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";

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
  const [filterStatus, setFilterStatus] = useState("all");

  const columns = [
    {
      accessorKey: "userName",
      header: "Username",
      cell: ({ row }) => (
        <div className="">{row.original.username}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="">{row.original.email}</div>,
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => (
        <div className="flex justify-start gap-1 flex-wrap items-center">
          {row.getValue("permissions")?.map((permission) => (
            <Badge
              key={permission}
              className="rounded-full font-normal bg-theme/10 text-theme text-[12px] h-[22px]"
            >
              {permission.name}
            </Badge>
          ))}
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
          <div className="flex divide-x cursor-pointer">
            <div
              onClick={async() =>{
                await useAuthStore.setState({
                  userEmail : row.original.email
                });
                router.push(`/admin/user-setup/${row.original.email}`)
              }
            }
            >
              <Pencil1Icon className="h-[24px] w-[24px] mr-2" />
            </div>
            <div className="">
              <DeleteUserModal refetch={refetch} row={row.original} />
            </div>
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
      <div className="flex my-[14px] items-center justify-between">
        <div>
          <div className="text-pt font-medium flex items-center justify-start text-[18px]">
            Total User
            <Badge className="ml-2 bg-theme/10 h-[20px] text-theme text-[12px]">
              240+
            </Badge>
          </div>
          <div className="text-st text-[14px]">
            Keep track of User and their security ratings.
          </div>
        </div>
        <Button>
          <DownloadIcon className="mr-2" />
          Export Data
        </Button>
      </div>
      <div className="flex justify-between mb-[12px] items-center py-4">
        <div className="flex justify-center overflow-hidden  items-center border rounded-md border-theme">
          <div
            className={cn(
              "h-[40px] cursor-pointer w-[80px] border-r border-theme justify-center flex items-center",
              {
                "bg-theme text-white": filterStatus === "all",
              }
            )}
            onClick={() => setFilterStatus("all")}
          >
            All
          </div>
          <div
            className={cn(
              "h-[40px] cursor-pointer w-[80px] border-r border-theme justify-center flex items-center",
              {
                "bg-theme text-white": filterStatus === "active",
              }
            )}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </div>
          <div
            className={cn(
              "h-[40px] cursor-pointer w-[80px] justify-center flex items-center",
              {
                "bg-theme text-white": filterStatus === "inactive",
              }
            )}
            onClick={() => setFilterStatus("inactive")}
          >
            Inactive
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search user..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="w-[400px] h-[44px] border border-theme"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
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
