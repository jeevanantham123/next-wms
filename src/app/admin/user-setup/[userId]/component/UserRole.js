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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useAvailableData, useUserDataStore } from "./store";

const getRoleList = (list) =>
  list?.map((item, index) => {
    return { id: index + 1, name: item };
  });

export default function UserRole() {
  const userData = useUserDataStore((state) => state.userData);
  const selectedRole = useUserDataStore((state) => state.selectedRole);
  const setSelectedRole = useUserDataStore((state) => state.setSelectedRole);
  const globalData = useAvailableData((state) => state.availableData);
  const { userRole: assignedUserRole = "" } = userData?.userDetails || {};
  const availableData = globalData?.availableData || {};

  const [userRole, setUserRole] = useState(assignedUserRole);
  const [salesRepCode, setSalesRepCode] = useState("");
  const roles = getRoleList(availableData?.roles);

  useEffect(() => {
    setUserRole(assignedUserRole);
  }, [assignedUserRole]);

  useEffect(() => {
    setSelectedRole({
      ...selectedRole,
      userRole: userRole,
      salesRepCode: salesRepCode,
    });
  }, [userRole, salesRepCode]);

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
          <Input
            value={salesRepCode}
            onChange={(e) => setSalesRepCode(e.target.value)}
            className="bg-white w-[150px]"
            placeholder="Sales rep code"
          />
        )}
      </div>
    </div>
  );
}
