import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loader";
import { deleteUserbyId } from "./actions";

export default function DeleteUserModal({ refetch, row }) {
  const { userName, id } = row;
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const deleteUser = await deleteUserbyId({
        id,
      });
      if (deleteUser) toast.success("User deleted successfully");
      refetch();
    } catch (e) {
      toast.error("Unable to delete user");
      console.error(e);
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

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
          <TrashIcon />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user - {userName}</DialogTitle>
          <DialogDescription>
            Selected user will be deleted from the system.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-start items-start gap-4">
          <Button
            disabled={loading}
            type="submit"
            variant="outline"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button disabled={loading} type="submit" onClick={handleSubmit}>
            {loading ? <LoadingSpinner /> : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
