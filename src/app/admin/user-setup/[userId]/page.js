import { getUserbyId } from "../../user-setup/_components/actions";
import AccessControl from "./component/AccessControl";
import MasterData from "./component/MasterData";
import UserEditForm from "./component/user-editform";
import UserRole from "./component/UserRole";

const UserPage = async ({ params }) => {
  const id = (await params).userId;
  const userDetails = await getUserbyId({
    id,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-4 pt-4">
        <UserEditForm userDetails={userDetails} />
        <MasterData />
        <UserRole />
        <AccessControl />
      </div>
    </div>
  );
};

export default UserPage;
