"use client";
import { useQuery, gql } from '@urql/next';
// import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LoadingSpinner } from "@/components/ui/loader";
import { get } from "@/api";
import { UserDatatable } from "./_components/data-table";
import { useEffect } from "react";

const GET_PRODUCT_SITE_DATA = gql`
query GetUserReadingData($offset: Int!, $count: Int!) {
  get_user_reading_data(offset: $offset, count: $count) {
    StatusCode
    message
    body {
      s_no
    }
  }
}`


export default function UserSetup() {
  // const { isLoading, error, isError, data, refetch } = useQuery({
  //   queryKey: ["get-users-list"],
  //   queryFn: () => get("/admin/users"),
  // });

   const [result, refetch] = useQuery({ query: GET_PRODUCT_SITE_DATA });
   const { data, fetching: isLoading, error: isError } = result

  console.log(result, 'result')
  // if (isError && !isLoading) {
  //   toast("Error fetching user list!", {
  //     action: {
  //       label: <Cross2Icon className="rounded-full" />,
  //     },
  //   });
  //   console.error("User fetching error", isError);
  // }
  const fetchGraphQLData = async () => {
    // debugger
    const response = await fetch('http://207.180.215.123:8002/graphql/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Application' : '*/*',
        // 'DNT' : 1,
        // 'Accept-Encoding' : 'gzip,deflate,br'
        // Don't include the 'Origin' header
      },
      body: JSON.stringify({
        operationName: "GetUserReadingData",
        variables: { offset: 0, count: 10 },
        query: `
          query GetUserReadingData($offset: Int!, $count: Int!) {
            get_user_reading_data(offset: $offset, count: $count) {
              StatusCode
              message
              body {
                  creation_time
              }
              __typename
            }
          }
        `,
      }),
    });
    debugger
    return response.json();
  };

  useEffect(()=>{
    fetchGraphQLData()
  },[]) 
  if (isLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="container min-h-screen sm:mx-auto p-4 pt-[40px]">
      <UserDatatable refetch={refetch} data={data?.data} />
    </div>
  );
}
