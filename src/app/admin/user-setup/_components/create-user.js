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
import { setAuth, useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import { LoadingSpinner } from "@/components/ui/loader";
import { addUsertoDb } from "./actions";

export default function AddUserModal({ refetch }) {
  const { regUsername, regEmail, regPassword } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleInputChange = (event) => {
    setAuth({ key: event.target.id, value: event.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const hashedPassword = await bcrypt.hash(regPassword, 10);
      const newUser = await addUsertoDb({
        hashedPassword,
        regUsername,
        regEmail,
      });
      if (newUser) toast.success("User created successfully");
      refetch();
    } catch (e) {
      toast.error("Unable to create user");
      console.error(e);
    } finally {
      setLoading(false);
      useAuthStore.setState({ regUsername: "", regEmail: "", regPassword: "" });
      setDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(val) => {
        useAuthStore.setState({
          regUsername: "",
          regEmail: "",
          regPassword: "",
        });
        setDialogOpen(val);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          <PlusCircledIcon className="mr-2" />
          New User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            A new user will be added to the system.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="regUsername"
              placeholder="Enter username"
              value={regUsername}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="regEmail"
              value={regEmail}
              placeholder="Enter email address"
              type="email"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="Enter preferred password"
              id="regPassword"
              value={regPassword}
              onChange={handleInputChange}
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
