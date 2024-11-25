'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@urql/next';
import UserEditForm from './component/user-editform';
import { useAuthStore } from '@/store/auth';
  
const UserPage =  ({ params }) => {

  const { userData } = useAuthStore((state) => state);
  const [loading,setLoading] = useState(false)
  const [userDetails,setUserDetils] = useState({})

  const [result, refetch] = useQuery({ query: GET_USER_DATA, variables: { offset, count }, });
  const { body,data, fetching: isLoading, error: isError } = result;

  const fetchUserData = async() =>{
    const { userId } = await params; 
    setLoading(true)
    const user = userData.filter((user)=>user.code == userId)
    setUserDetils(user)
    setLoading(false)
  }

  useEffect(()=>{
    fetchUserData()
  },[])
  if (loading)
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  
    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-4 pt-4">
          <UserEditForm
          userDetails={userDetails}
          />
        </div>
      </div>
    );
};

export default UserPage;
