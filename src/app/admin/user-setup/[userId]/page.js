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
} from "@/lib/graphqlQueries";
import AccessControl from "./component/AccessControl";
import { LoadingSpinner } from "@/components/ui/loader";
import { globalValues, userDetails } from "./mock";
import { useAvailableData, useUserDataStore } from "./component/store";

const UserPage = ({ params }) => {
  const { email } = useAuthStore((state) => state);
  const setUserData = useUserDataStore((state) => state.setUserData);
  const setAvailableData = useAvailableData((state) => state.setAvailableData);

  const value = use(params);

  //mock
  const userData = userDetails;
  setUserData(userData?.data);

  const availableData = globalValues;
  setAvailableData(availableData?.data);

  const adminUserMail = email || "admin@germinit.com";
  const userMail =
    decodeURIComponent(value?.userId) || "superuser@germinit.com";
  const [{ data, fetching: isLoading, error: isError }] = useQuery({
    query: GET_ADMIN_USER,
    variables: {
      admin_user_mail: adminUserMail,
      user_mail: userMail,
    },
  });

  if (isLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex-col">
      <div className="flex-1 p-4 pt-4">
        <UserEditForm />
        <MasterData />
        <UserRole />
        <AccessControl />
      </div>
    </div>
  );
};

export default UserPage;
