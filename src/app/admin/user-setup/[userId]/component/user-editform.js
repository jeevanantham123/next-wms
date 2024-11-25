"use client";
import { useState } from "react";
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

const formSchema = z.object({
  username: z.string().min(2, {
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

  roleId: z.string().min(1, { message: "This field has to be filled." }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});
const roles = [
  { id: 1, name: "Distributor" },
  { id: 2, name: "Stock manager" },
  { id: 3, name: "Manager" },
  { id: 4, name: "IT Manager" },
  { id: 5, name: "Sales representative" },
  { id: 6, name: "Production line user" },
];

const DaDcompanies = [
  { id: 1, name: "Company 1", assigned: false },
  { id: 2, name: "Company 2", assigned: false },
  { id: 3, name: "Company 3", assigned: false },
  { id: 4, name: "Company 4", assigned: false },
];

const DaRoles = [
  { id: 1, name: "Role 1", assigned: false },
  { id: 2, name: "Role 2", assigned: false },
  { id: 3, name: "Role 3", assigned: false },
  { id: 4, name: "Role 4", assigned: false },
];

const DaPermissions = [
  { id: 1, name: "Permission 1", assigned: false },
  { id: 2, name: "Permission 2", assigned: false },
  { id: 3, name: "Permission 3", assigned: false },
  { id: 4, name: "Permission 4", assigned: false },
];

const DaSites = [
  { id: 1, name: "Site 1", assigned: false },
  { id: 2, name: "Site 2", assigned: false },
  { id: 3, name: "Site 3", assigned: false },
  { id: 4, name: "Site 4", assigned: false },
];

const DaModules = [
  { id: 1, name: "Module 1", assigned: false },
  { id: 2, name: "Module 2", assigned: false },
  { id: 3, name: "Module 3", assigned: false },
  { id: 4, name: "Module 4", assigned: false },
];

const DaTransactions = [
  { id: 1, name: "Transaction 1", assigned: false },
  { id: 2, name: "Transaction 2", assigned: false },
  { id: 3, name: "Transaction 3", assigned: false },
  { id: 4, name: "Transaction 4", assigned: false },
];

const DaFolders = [
  { id: 1, name: "Folder 1", assigned: false },
  { id: 2, name: "Folder 2", assigned: false },
  { id: 3, name: "Folder 3", assigned: false },
  { id: 4, name: "Folder 4", assigned: false },
];

const companies = [
  {
    name: "Company 1",
    sites: ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5"],
  },
  {
    name: "Company 2",
    sites: ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5"],
  },
  {
    name: "Company 3",
    sites: ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5"],
  },
  {
    name: "Company 4",
    sites: ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5"],
  },
  {
    name: "Company 5",
    sites: ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5"],
  },
];
const modules = [
  {
    name: "Module 1",
    transactions: [
      "Transaction 1",
      "Transaction 2",
      "Transaction 3",
      "Transaction 4",
      "Transaction 5",
    ],
  },
  {
    name: "Module 2",
    transactions: [
      "Transaction 1",
      "Transaction 2",
      "Transaction 3",
      "Transaction 4",
      "Transaction 5",
    ],
  },
  {
    name: "Module 3",
    transactions: [
      "Transaction 1",
      "Transaction 2",
      "Transaction 3",
      "Transaction 4",
      "Transaction 5",
    ],
  },
  {
    name: "Module 4",
    transactions: [
      "Transaction 1",
      "Transaction 2",
      "Transaction 3",
      "Transaction 4",
      "Transaction 5",
    ],
  },
  {
    name: "Module 5",
    transactions: [
      "Transaction 1",
      "Transaction 2",
      "Transaction 3",
      "Transaction 4",
      "Transaction 5",
    ],
  },
];
const UserEditForm = ({ userDetails }) => {
  const [userCompany, setUserCompany] = useState([
    { name: "Company 1", sites: ["Site 1", "Site 2"] },
    {
      name: "Company 2",
      sites: ["Site 1", "Site 2", "Site 3", "Site 4", "Site 5"],
    },
  ]);
  const [userModules, setUserModules] = useState([
    { name: "Module 1", transactions: ["Transaction 1", "Transaction 2"] },
    {
      name: "Module 2",
      transactions: [
        "Transaction 1",
        "Transaction 2",
        "Transaction 3",
        "Transaction 4",
        "Transaction 5",
      ],
    },
  ]);
  const [userrole, setUserRole] = useState("");
  const [useractive, setUserActive] = useState(true);
  const [holdStatus, setUserHold] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userDetails?.userName || "",
      lastname: userDetails?.userName || "",
      gender: "male",
      email: userDetails?.email || "",
      phonenumber: "6380055351" || "",
      roleId: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  function addCompany(companyname) {
    setUserCompany((prevUserCompany) => [
      ...prevUserCompany,
      { name: companyname, sites: [] },
    ]);
  }
  function removeCompany(companyname) {
    setUserCompany((prevUserCompany) =>
      prevUserCompany.filter((userComp) => userComp.name !== companyname)
    );
  }
  function addCompanySite(companyname, sitename) {
    setUserCompany((prevUserCompany) =>
      prevUserCompany.map((userComp) =>
        userComp.name === companyname
          ? { ...userComp, sites: [...userComp.sites, sitename] }
          : userComp
      )
    );
  }
  function removeCompanySite(companyname, sitename) {
    setUserCompany((prevUserCompany) =>
      prevUserCompany.map((userComp) =>
        userComp.name === companyname
          ? {
              ...userComp,
              sites: userComp.sites.filter((site) => site !== sitename),
            }
          : userComp
      )
    );
  }

  function addModule(moduleName) {
    setUserModules((prevUserModules) => [
      ...prevUserModules,
      { name: moduleName, transactions: [] },
    ]);
  }

  function removeModule(moduleName) {
    setUserModules((prevUserModules) =>
      prevUserModules.filter((module) => module.name !== moduleName)
    );
  }

  function addModuleTransaction(moduleName, transactionName) {
    setUserModules((prevUserModules) =>
      prevUserModules.map((module) =>
        module.name === moduleName
          ? {
              ...module,
              transactions: [...module.transactions, transactionName],
            }
          : module
      )
    );
  }

  function removeModuleTransaction(moduleName, transactionName) {
    setUserModules((prevUserModules) =>
      prevUserModules.map((module) =>
        module.name === moduleName
          ? {
              ...module,
              transactions: module.transactions.filter(
                (transaction) => transaction !== transactionName
              ),
            }
          : module
      )
    );
  }
  function handleStatusChange(activestatus) {
    setUserActive(activestatus);
  }
  function handleHoldChange(holdStatus) {
    setUserHold(holdStatus);
  }

  return (
    <div className="flex flex-col rounded-md border border-[#EAECF0]">
      <div className="w-90  bg-white lexend-font border-b border-[#EAECF0]">
        <div className="flex h-[60px] px-[16px] justify-between items-center">
          <span className="flex items-center text-[18px] text-pt font-medium">
            Edit User Details
          </span>
          <Button>Save & Update</Button>
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
          <div className="w-[15%] ">
            <span className="text-sm">User Status</span>
            <div className="grid mr-12 grid-cols-2 gap-2 grid-rows-2 mt-6">
              <Switch
                checked={useractive}
                onCheckedChange={() => handleStatusChange(!useractive)}
              />
              <h4>Active</h4>
              <Switch
                checked={holdStatus}
                onCheckedChange={() => handleHoldChange(!holdStatus)}
              />
              <h4>Hold</h4>
            </div>
          </div>
          {/* form */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[70%]">
              <div className="flex ">
                <div className="grid grid-cols-3 grid-rows-2 min-w-[500px] gap-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Firstname</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="Enter username"
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
                                  format(field.value, "PPP")
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
                              selected={field.value}
                              onSelect={field.onChange}
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
