import { UserProfileFormType } from "../../../types/user-profile";
import CreateUserProfileForm from "./create-user-profile/create-user-profile-form";

const Profile = () => {
  return (
    <div className="py-20 px-2 min-h-screen sm:px-6 lg:px-20 bg-primary-50 dark:bg-black">
      <CreateUserProfileForm 
        formType={UserProfileFormType.CREATE}
      />
    </div>
  );
}

export default Profile
