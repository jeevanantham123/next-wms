import React from 'react';
import { getUserbyId } from '../../user-setup/_components/actions';
import UserEditForm from './component/user-editform';

const UserPage = async ({ params }) => {
    const id = (await params).userId;
    const userDetails = await getUserbyId({
        id,
    });

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
