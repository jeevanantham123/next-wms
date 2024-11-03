import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loader";
import {
  changePasswordbyId,
  getPermissions,
  updatePermissionsbyId,
} from "./actions";
import bcrypt from "bcryptjs";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";

export default function ChangePermissionModal({ refetch, row }) {
  const { userName, id, permissions } = row;
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allPermissions, setAllPermissions] = useState([]);
  const fetchPermissions = useQuery({
    queryKey: ["fetch-permissions"],
    queryFn: async () => await getPermissions(),
  });

  const toggleCheckPermissions = (id) => {
    let updatedPermissions = allPermissions;
    updatedPermissions = updatedPermissions.map((permission) => {
      if (permission.id === id)
        return { ...permission, isChecked: !permission.isChecked };
      else return permission;
    });
    setAllPermissions(updatedPermissions);
  };

  useEffect(() => {
    if (!fetchPermissions.isLoading && fetchPermissions.data.length) {
      const fetchedPermissions = fetchPermissions.data?.map((permission) => {
        return {
          ...permission,
          isChecked: permissions?.some(
            (userPermission) => userPermission.name === permission.name
          ),
        };
      });

      setAllPermissions(fetchedPermissions);
    }
  }, [fetchPermissions?.data, permissions]);

  const handleSubmit = async () => {
    setLoading(true);
    const selectedPermissions = allPermissions
      .filter((checkedPermissions) => checkedPermissions.isChecked)
      .map((permission) => permission.id);
    console.log(selectedPermissions);
    try {
      const updatedPermissions = await updatePermissionsbyId({
        permissions: selectedPermissions,
        id,
      });
      if (updatedPermissions) toast.success("Permissions updated successfully");
      refetch();
    } catch (e) {
      toast.error("Unable to update permissions ");
      console.error(e);
    } finally {
      fetchPermissions.refetch();
      setLoading(false);
      setDialogOpen(false);
    }
  };

  if (fetchPermissions.isError) toast.error("Error fetching permissions");

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(val) => {
        setDialogOpen(val);
      }}
    >
      <DialogTrigger asChild>
        <div
          variant="outlined"
          className="cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          Change Permission
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Permission for {userName}</DialogTitle>
          <DialogDescription>
            Permissions will be modified to the selected user.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-start items-start gap-4">
          {fetchPermissions.isLoading ?? (
            <div className="flex w-48 justify-center items-center h-48">
              <LoadingSpinner />
            </div>
          )}
          {!fetchPermissions.isLoading && fetchPermissions.data?.length ? (
            <div className="space-y-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Permissions <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {allPermissions.map((permission) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={permission.id}
                        className="capitalize"
                        checked={permission.isChecked}
                        onCheckedChange={(value) =>
                          toggleCheckPermissions(permission.id, value)
                        }
                      >
                        {permission.name}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}

          <Button disabled={loading} type="submit" onClick={handleSubmit}>
            {loading ? <LoadingSpinner /> : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
