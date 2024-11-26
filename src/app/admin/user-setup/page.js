"use client";
import { useQuery, gql } from "@urql/next";
import { LoadingSpinner } from "@/components/ui/loader";
import { UserDatatable } from "./_components/data-table";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { GET_ADMIN_USERS_LIST } from "@/lib/graphqlQueries";

export default function UserSetup() {
  const {
    email,
  } = useAuthStore((state) => state);

  const [result, refetch] = useQuery({
    query: GET_ADMIN_USERS_LIST,
    variables: { adminUserMail:email ?? 'admin@germinit.com' },
  });
  const { body, data, fetching: isLoading, error: isError } = result;

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    useAuthStore.setState({ userData: data?.get_users_list?.body });
  }, [data]);

  if (isLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="container min-h-screen sm:mx-auto p-4 pt-[40px]">
      <UserDatatable
        refetch={refetch}
        data={data?.get_users_list?.body}
      />
    </div>
  );
}
