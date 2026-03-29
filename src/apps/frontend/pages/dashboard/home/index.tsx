import { useEffect } from "react"
import { Skeleton } from "../../../components/skeleton"
import { useAppDispatch, useAppSelector } from "../../../redux/hook"
import { GetUserProfile } from "../../../redux/action"
import { Text } from "../../../components"
import HomePage from "./home"
import UserHead from "./userHead"
import NoUserProfileCard from "./no-user-profile-card"

const Home = () => {
  const dispatch = useAppDispatch()
  const userId = localStorage.getItem('userId') as string
  const { getUserProfileData, getUserProfileLoading } = useAppSelector(state => state.userProfile)

  useEffect(()=>{
    dispatch(GetUserProfile(userId)).catch(()=> {})
  }, [])

  const isDataEmpty = !getUserProfileData || Object.keys(getUserProfileData || {}).length === 0;
  const isUserProfileEmpty = !getUserProfileData?.userProfile || Object.keys(getUserProfileData?.userProfile || {}).length === 0;

  if (getUserProfileLoading) {
    return <Skeleton />
  }


  if (isDataEmpty) {
    return (
       <div className="py-20 px-4 min-h-screen sm:px-6 lg:px-8 bg-primary-50 dark:bg-black">
        <div className="">
          <Text>
            No Data Found
          </Text>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="py-20 px-4 min-h-screen sm:px-6 lg:px-20 bg-gray-50 dark:bg-black">
        <UserHead
          email={getUserProfileData.user?.email}
          phone={getUserProfileData.userProfile?.phoneNumber}
          name={getUserProfileData.user?.name}
          role={getUserProfileData.user?.role}
          address={getUserProfileData.userProfile?.address}
        />
        {isUserProfileEmpty ? (
          <NoUserProfileCard />
        ) : (
          <HomePage userData={getUserProfileData.userProfile} />
        )}
      </div>
    </>
  );
}

export default Home
