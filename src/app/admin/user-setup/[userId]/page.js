'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@urql/next';
import MasterData from "./component/MasterData";
import UserEditForm from "./component/user-editform";
import UserRole from "./component/UserRole";
import { useAuthStore } from '@/store/auth';
import { GET_ADMIN_USER } from '@/lib/graphqlQueries';
import AccessControl from './component/AccessControl';
import { LoadingSpinner } from '@/components/ui/loader';
  
const UserPage =  ({ params }) => {
  const {
    email,
    userEmail
  } = useAuthStore((state) => state);
  const { userData } = useAuthStore((state) => state);
  const [loading,setLoading] = useState(false)
  const [userDetails,setUserDetils] = useState({})

  const [result, refetch] = useQuery({ query: GET_ADMIN_USER, variables: { adminUserMail:email ?? 'admin@germinit.com' , UserMail:userEmail || "superuser@germinit.com" }, });
  const { data, fetching: isLoading, error: isError } = result;

  const fetchUserData = async() =>{
    setLoading(true)
    setUserDetils(data?.get_user_details?.body)
    setLoading(false)
  }

  useEffect(()=>{
    fetchUserData()
  },[data])
  if (isLoading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="flex-col">
      <div className="flex-1 p-4 pt-4">
        {userDetails && 
        <UserEditForm userDetails={userDetails} />
}
        <MasterData />
        <UserRole />
        <AccessControl />

      </div>
    </div>
  );
};

export default UserPage;
