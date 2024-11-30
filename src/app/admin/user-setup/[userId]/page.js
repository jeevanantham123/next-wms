'use client'
import React, { useEffect, useState,use } from 'react';
import { useQuery } from '@urql/next';
import { useRouter } from 'next/navigation'
import MasterData from "./component/MasterData";
import UserEditForm from "./component/user-editform";
import UserRole from "./component/UserRole";
import { useAuthStore } from '@/store/auth';
import { GET_ADMIN_USER ,GET_ADMIN_COMPANIES,GET_ADMIN_ROLES,GET_ADMIN_MODULES_AND_TRANSACTION} from '@/lib/graphqlQueries';
import AccessControl from './component/AccessControl';
import { LoadingSpinner } from '@/components/ui/loader';
  
const UserPage =  ({ params }) => {
  const {
    email,
  } = useAuthStore((state) => state);
  const value =use(params)

  const adminUserMail = email || 'admin@germinit.com';
  const userMail = decodeURIComponent(value?.userId) || 'superuser@germinit.com';
  const [{ data, fetching: isLoading, error: isError }] = useQuery({
    query: GET_ADMIN_USER,
    variables: {
      admin_user_mail: adminUserMail,
      user_mail: userMail,
    },
  });

  const [{ data : adminCompaniesData  }] = useQuery({
    query: GET_ADMIN_COMPANIES,
    variables: {
      offset: 0,
      count: 10,
    },
  });

  const [{ data : adminRolesData  }] = useQuery({
    query: GET_ADMIN_ROLES,
    variables: {
      user_mail: userMail,
    },
  });

  const [{ data : adminModulesAndTransaction  }] = useQuery({
    query: GET_ADMIN_MODULES_AND_TRANSACTION,
    variables: {
      user_mail: userMail,
    },
  });

  const userDetails = data?.get_user_details?.body;
  const adminCompanies = adminCompaniesData?.get_all_companies?.body;
  const adminRoles = adminRolesData?.get_all_available_roles?.body;
  const adminModulesTransactions = adminModulesAndTransaction?.get_all_modules_and_transactions?.body;
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
        {adminRoles && 
        <UserRole adminRoles={adminRoles} />
}
        {adminCompanies && adminModulesTransactions && 
        <AccessControl adminCompanies={adminCompanies} adminModulesTransactions={adminModulesTransactions}/>
}

      </div>
      </div>
  );
};

export default UserPage;
