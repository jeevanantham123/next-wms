"use client";
import { useQuery, gql } from '@urql/next';
import { LoadingSpinner } from "@/components/ui/loader";
import { UserDatatable } from "./_components/data-table";
import { useEffect } from 'react';
import { useAuthStore } from "@/store/auth";
import { GET_USER_DATA } from '@/lib/graphqlQueries';


export default function UserSetup() {
  const offset = 0; 
  const count = 10;

   const [result, refetch] = useQuery({ query: GET_USER_DATA, variables: { offset, count }, });
   const { body,data, fetching: isLoading, error: isError } = result;


  useEffect(() => {
    refetch(); 
  }, [offset, count, refetch]);

  useEffect(()=>{
    useAuthStore.setState({ userData: data?.get_user_reading_data?.body});
  },[data])

  if (isLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="container min-h-screen sm:mx-auto p-4 pt-[40px]">
      <UserDatatable refetch={refetch} data={data?.get_user_reading_data?.body} />
    </div>
  );
}

