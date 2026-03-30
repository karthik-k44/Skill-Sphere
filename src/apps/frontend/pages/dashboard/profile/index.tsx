
import { useEffect } from "react";
import { GetUserProfile } from "../../../redux/action";
import { UserProfileFormType } from "../../../types/user-profile";
import CreateUserProfileForm from "./create-user-profile/create-user-profile-form";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";

const Profile = () => {
  const userProfileFormType = useParams().type as UserProfileFormType;
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
  
  const { getUserProfileData } = useAppSelector((state) => state.userProfile);
  
  useEffect(() => {
    if (userId) dispatch(GetUserProfile(userId)).catch(() => {});
  }, []);


  return (
    <div className="py-20 px-4 min-h-screen sm:px-6 lg:px-20 bg-primary-50 dark:bg-black">
      {userProfileFormType === UserProfileFormType.CREATE ? (
        <CreateUserProfileForm formType={UserProfileFormType.CREATE} />
      ) : (
        <CreateUserProfileForm
          formType={UserProfileFormType.UPDATE}
          userProfileData={getUserProfileData?.userProfile}
        />
      )}
    </div>
  );
}

export default Profile
