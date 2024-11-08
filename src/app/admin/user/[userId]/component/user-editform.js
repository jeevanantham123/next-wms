"use client";
import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // Ensure this import
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "Lastname must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),

  phonenumber: z.string().min(10, {
    message: "Phone number must be 10 digits.",
  }),

  roleId: z.string().min(1, { message: "This field has to be filled." }),
});
const roles = [
  { id: 1, name: "Distributor" },
  { id: 2, name: "Stock manager" },
  { id: 3, name: "Manager" },
  { id: 4, name: "IT Manager" },
  { id: 5, name: "Sales representative" },
  { id: 6, name: "Production line user" },
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
  const [useractive, setUserActive] = useState(true);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userDetails?.userName || "",
      lastname: userDetails?.userName || "",
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
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Edit User" description="Edit a user." />
        {userDetails && (
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col">
        <h4>Active</h4>
        <Switch
          checked={useractive}
          onCheckedChange={() => handleStatusChange(!!useractive)}
        />
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-4 gap-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
                    <Input placeholder="Enter lastname" {...field} />
                  </FormControl>
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
                    <Input placeholder="Enter email" {...field} />
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
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-10 px-4">
            <label className="py-3 text-lg font-semibold text-gray-700">
              Company
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {companies.map((company, index) => (
                <div key={index} className="px-2">
                  {userCompany.some(
                    (userComp) => userComp.name === company.name
                  ) ? (
                    <div
                      className="flex"
                      onClick={() => removeCompany(company.name)}
                      title="Click to remove company"
                    >
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r bg-theme text-white shadow-lg p-2 cursor-pointer rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        {company.name}
                      </Badge>
                    </div>
                  ) : (
                    <div
                      onClick={() => addCompany(company.name)}
                      title="Click to add company"
                    >
                      <Badge
                        variant="outline"
                        className="border border-gray-300 text-gray-600 p-2 cursor-pointer rounded-lg hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
                      >
                        {company.name}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <label className="py-3 text-lg font-semibold text-gray-700">
                Company Sites
              </label>
              <div className="flex flex-col gap-6 mt-4">
                {companies.map((company, companyIndex) => {
                  const userComp = userCompany.find(
                    (userComp) => userComp.name === company.name
                  );
                  if (!userComp) return null;

                  return (
                    <div
                      key={companyIndex}
                      className="p-4 bg-gray-100 rounded-lg shadow-sm"
                    >
                      {/* Company Name */}
                      <div className="font-bold text-gray-700 text-lg mb-2 border-b-2 border-gray-300 pb-2">
                        {company.name}
                      </div>

                      {/* Sites in a row */}
                      <div className="flex flex-wrap gap-3 mt-2">
                        {company.sites.map((sitename, siteIndex) => {
                          const isUserSite =
                            userComp && userComp.sites.includes(sitename);

                          return (
                            <div
                              key={`${companyIndex}-${siteIndex}`}
                              onClick={() =>
                                isUserSite
                                  ? removeCompanySite(company.name, sitename)
                                  : addCompanySite(company.name, sitename)
                              }
                              title={
                                isUserSite
                                  ? "Click to deselect site"
                                  : "Click to select site"
                              }
                            >
                              <Badge
                                variant="outline"
                                className={`border p-2 cursor-pointer rounded-lg transition-all duration-200 
                                                        ${
                                                          isUserSite
                                                            ? "bg-theme text-white shadow-md hover:scale-105"
                                                            : "border-gray-300 text-gray-600 hover:bg-gray-200 hover:scale-105"
                                                        }`}
                              >
                                {sitename}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 px-4">
            <label className="py-3 text-lg font-semibold text-gray-700">
              Modules
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {modules.map((module, index) => (
                <div key={index} className="px-2">
                  {userModules.some(
                    (userMod) => userMod.name === module.name
                  ) ? (
                    <div
                      className="flex"
                      onClick={() => removeModule(module.name)}
                    >
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r bg-theme text-white shadow-md p-2 cursor-pointer rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        {module.name}
                      </Badge>
                    </div>
                  ) : (
                    <div onClick={() => addModule(module.name)}>
                      <Badge
                        variant="outline"
                        className="border border-gray-300 text-gray-600 p-2 cursor-pointer rounded-lg hover:border-gray-400 hover:text-gray-800 transition-all duration-200"
                      >
                        {module.name}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <label className="py-3 text-lg font-semibold text-gray-700">
                Transactions
              </label>
              <div className="flex flex-col gap-4 mt-3">
                {modules.map((module, moduleIndex) => {
                  const userMod = userModules.find(
                    (userMod) => userMod.name === module.name
                  );
                  if (!userMod) return null;

                  return (
                    <div key={moduleIndex} className="flex items-center gap-4">
                      {/* Module Name */}
                      <div className="font-bold text-gray-700">
                        {module.name}
                      </div>

                      {/* Transactions in a row */}
                      <div className="flex gap-2 ml-4 flex-wrap">
                        {module.transactions.map(
                          (transaction, transactionIndex) => {
                            const isUserTransaction =
                              userMod &&
                              userMod.transactions.includes(transaction);

                            return (
                              <div
                                key={`${moduleIndex}-${transactionIndex}`}
                                onClick={() =>
                                  isUserTransaction
                                    ? removeModuleTransaction(
                                        module.name,
                                        transaction
                                      )
                                    : addModuleTransaction(
                                        module.name,
                                        transaction
                                      )
                                }
                              >
                                <Badge
                                  variant="outline"
                                  className={`border p-2 cursor-pointer rounded-lg transition-all duration-200 
                                                        ${
                                                          isUserTransaction
                                                            ? "bg-theme text-white shadow-md"
                                                            : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800"
                                                        }`}
                                >
                                  {transaction}
                                </Badge>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default UserEditForm;
