"use client";
import { use, useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Ensure this import
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useUserDataStore } from "./store";
import { UPDATE_USER } from "@/lib/graphqlQueries";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@urql/next";
import { LoadingSpinner } from "@/components/ui/loader";

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  gender: z.string().min(2, {
    message: "Gender must be at least 3 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),

  phonenumber: z.string().min(10, {
    message: "Phone number must be 10 digits.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  active: z.boolean(),
  hold: z.boolean(),
});

const UserEditForm = ({ userEmail, reFetchUser }) => {
  const userData = useUserDataStore((state) => state.userData);
  const { selectedData, selectedRole, selectedModule } = useUserDataStore(
    (state) => state
  );
  const { email } = useAuthStore((state) => state);

  const adminUserMail = email || "admin@germinit.com";
  const userMail = decodeURIComponent(userEmail) || "superuser@germinit.com";
  const [{ data, fetching, error }, executeMutation] = useMutation(UPDATE_USER);

  const ud = userData?.userDetails?.userData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: ud?.firstname || "",
      lastname: ud?.lastname || "",
      gender: ud?.gender || "",
      email: ud?.email || "",
      phonenumber: ud?.phone_no || "",
      active: ud?.active || false,
      hold: ud?.hold || false,
      dob: ud?.date_of_birth ? new Date(ud?.date_of_birth) : "",
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    const {
      firstname,
      lastname,
      gender,
      email,
      phonenumber,
      active,
      hold,
      dob,
    } = form.getValues();

    const updatingValues = {
      assignedData: selectedData,
      userRole: selectedRole?.userRole,
      salesRepCode: selectedRole?.salesRepCode,
      master_module: selectedModule,
      userData: {
        firstname,
        lastname,
        gender,
        email,
        active: Number(active),
        phone_no: phonenumber,
        date_of_birth: format(dob, "yyyy-MM-dd"),
      },
    };

    try {
      const response = await executeMutation({
        admin_user_mail: adminUserMail,
        user_mail: userMail,
        data: updatingValues,
      });
      console.log(
        "Update successful:",
        response?.data?.update_user?.StatusCode,
        fetching,
        error
      );
      if (response?.data?.update_user?.StatusCode === 200) reFetchUser();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }

  return (
    <div className="flex flex-col rounded-md border border-[#EAECF0]">
      {fetching && (
        <div className="fixed inset-0 h-full flex justify-center items-center bg-black/30 z-[9999]">
          <LoadingSpinner />
        </div>
      )}
      <div className="w-90  bg-white lexend-font border-b border-[#EAECF0]">
        <div className="flex h-[60px] px-[16px] justify-between items-center">
          <span className="flex items-center text-[18px] text-pt font-medium">
            Edit User Details
          </span>
          <Button onClick={onSubmit}>Save & Update</Button>
        </div>
      </div>
      <div className="w-90 bg-white p-2 lexend-font">
        <div className="p-2 flex">
          <div className="w-[15%]">
            <span className="text-[16px]">Profile Image</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/200/200"
              className="profileImg rounded-sm"
              alt="avatar"
            />
          </div>
          {/* form */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[85%]">
              <div className="flex ">
                <div className="w-[15%] mt-[16px] grid grid-cols-2 h-[80px] grid-rows-2">
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <>
                        <h4>Active</h4>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hold"
                    render={({ field }) => (
                      <>
                        <h4>Hold</h4>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 grid-rows-2 min-w-[500px] gap-8">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Enter firstname"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lastname</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Enter lastname"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Enter Gender"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex mt-[10px] flex-col bg-white">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px]  bg-white",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd-MM-yyyy")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(value) => {
                                field.onChange(value);
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Enter email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Enter phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default UserEditForm;
