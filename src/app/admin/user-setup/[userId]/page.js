"use client";
import React, { useEffect, useState, use } from "react";
import { useQuery } from "@urql/next";
import { useRouter } from "next/navigation";
import MasterData from "./component/MasterData";
import UserEditForm from "./component/user-editform";
import UserRole from "./component/UserRole";
import { useAuthStore } from "@/store/auth";
import {
  GET_ADMIN_USER,
  GET_ADMIN_COMPANIES,
  GET_ADMIN_ROLES,
  GET_ADMIN_MODULES_AND_TRANSACTION,
  GET_GLOBAL_VALUES,
} from "@/lib/graphqlQueries";
import AccessControl from "./component/AccessControl";
import { LoadingSpinner } from "@/components/ui/loader";
import { useAvailableData, useUserDataStore } from "./component/store";

const UserPage = ({ params }) => {
  const { email } = useAuthStore((state) => state);
  const setUserData = useUserDataStore((state) => state.setUserData);
  const setAvailableData = useAvailableData((state) => state.setAvailableData);

  const value = use(params);

  const adminUserMail = email || "admin@germinit.com";
  const userMail =
    decodeURIComponent(value?.userId) || "superuser@germinit.com";
  const [{ data, fetching: isLoading, error: isError }, reexecuteQuery] =
    useQuery({
      query: GET_ADMIN_USER,
      variables: {
        admin_user_mail: adminUserMail,
        user_mail: userMail,
      },
    });
  const [
    {
      data: globalValues,
      isLoading: isGlobalValuesLoading,
      error: isGlobalValuesError,
    },
  ] = useQuery({
    query: GET_GLOBAL_VALUES,
    variables: {
      admin_user_mail: adminUserMail,
    },
  });

  setUserData(data?.["get_user_details"]?.["body"]);
  setAvailableData(globalValues?.["get_all_global_values"]?.["body"]);

  const reFetchUser = async () => {
    console.log("Refetch user");
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  if (isLoading || isGlobalValuesLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  if (!isLoading && data && globalValues)
    return (
      <div className="flex-col">
        <div className="flex-1 p-4 pt-4">
          <UserEditForm userEmail={userMail} reFetchUser={reFetchUser} />
          <MasterData />
          <UserRole />
          <AccessControl />
        </div>
      </div>
    );
};

export default UserPage;
