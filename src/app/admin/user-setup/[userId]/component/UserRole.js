"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl } from "@mui/material";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

export default function UserRole() {
  const [userRole, setUserRole] = useState("");
  const roles = [
    { id: 1, name: "Distributor" },
    { id: 2, name: "Stock manager" },
    { id: 3, name: "Manager" },
    { id: 4, name: "IT Manager" },
    { id: 5, name: "Sales representative" },
    { id: 6, name: "Production line user" },
  ];
  const formSchema = z.object({
    roleId: z.string().min(1, { message: "This field has to be filled." }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleId: "",
    },
  });
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="flex bg-white px-[16px] items-center mt-[16px] justify-between rounded-md border border-[#EAECF0]">
      <div className="h-[55px] border-b border-[#EAECF0] flex items-center text-[18px] font-medium text-pt">
        Role for the employee
      </div>
      <div className="flex gap-4">
        <Select
          onValueChange={(value) => {
            setUserRole(value);
          }}
          value={userRole}
          className="bg-white"
        >
          <FormControl>
            <SelectTrigger className="bg-white  min-w-[200px]">
              <SelectValue className="bg-white" placeholder="Select a role" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="bg-white">
            {roles.map((role) => (
              <SelectItem
                className="bg-white"
                key={role.id}
                value={String(role.name)}
              >
                {role.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {userRole == "Sales representative" && (
          <Input className="bg-white w-[150px]" placeholder="Sales rep code" />
        )}
      </div>
    </div>
  );
}