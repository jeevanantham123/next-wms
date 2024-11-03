import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loader";
import { addPermissiontoDb } from "./actions";

export default function AddPermissionModal({ refetch }) {
  const [permission, setPermission] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newPermission = await addPermissiontoDb(permission);
      if (newPermission) toast.success("Permission created successfully");
      refetch();
    } catch (e) {
      toast.error("Unable to create permission");
      console.error(e);
    } finally {
      setLoading(false);
      setPermission("");
      setDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(val) => {
        setPermission("");
        setDialogOpen(val);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          <PlusCircledIcon className="mr-2" />
          New Permission
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Permission</DialogTitle>
          <DialogDescription>
            A new permission will be added to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="space-y-1">
            <Label htmlFor="username">Permission</Label>
            <Input
              id="permission"
              placeholder="Enter permission name"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              required
            />
          </div>

          <Button disabled={loading} type="submit" onClick={handleSubmit}>
            {loading ? <LoadingSpinner /> : "Add"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
