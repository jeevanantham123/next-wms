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

export default function UpdateDialog({ selectedRows }) {
  const [status, setStatus] = useState("");
  console.log({ selectedRows });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!selectedRows.length} variant="outline">
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Destination Status</DialogTitle>
          <DialogDescription>
            Status changes will be applied to all the selected items
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-start items-start gap-4">
          <Input
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <Button type="submit">Apply to all</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
