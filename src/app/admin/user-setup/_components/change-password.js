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
import { changePasswordbyId } from "./actions";
import bcrypt from "bcryptjs";

export default function ChangePasswordModal({ refetch, row }) {
  const { userName, id } = row;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const changedPassword = await changePasswordbyId({
        password: hashedPassword,
        id,
      });
      if (changedPassword) toast.success("Password changed successfully");
      refetch();
    } catch (e) {
      toast.error("Unable to change password");
      console.error(e);
    } finally {
      setLoading(false);
      setPassword("");
      setDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(val) => {
        setPassword("");
        setDialogOpen(val);
      }}
    >
      <DialogTrigger asChild>
        <div
          variant="outlined"
          className="cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          Change Password
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password for {userName}</DialogTitle>
          <DialogDescription>
            Password will be modified to the selected user.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="space-y-1">
            <Label htmlFor="username">Password</Label>
            <Input
              id="password"
              placeholder="Enter password name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button disabled={loading} type="submit" onClick={handleSubmit}>
            {loading ? <LoadingSpinner /> : "Change"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
