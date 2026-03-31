import { useEffect } from "react"
import { Skeleton } from "../../../components/skeleton"
import { useAppDispatch, useAppSelector } from "../../../redux/hook"
import { GetUserProfile } from "../../../redux/action"
import { Text } from "../../../components"
import UserHead from "./userHead"
import NoUserProfileCard from "./no-user-profile-card"
import HomePage from "./home"

const Home = () => {
  const dispatch = useAppDispatch()
  const userId = localStorage.getItem('userId') as string
  const { getUserProfileData, getUserProfileLoading } = useAppSelector(state => state.userProfile)

  console.log(getUserProfileLoading)

  useEffect(()=>{
    dispatch(GetUserProfile(userId)).catch(()=> {})
  }, [])

  const isDataEmpty = !getUserProfileData || Object.keys(getUserProfileData || {}).length === 0;
  const isUserProfileEmpty = !getUserProfileData?.userProfile || Object.keys(getUserProfileData?.userProfile || {}).length === 0;

  if (getUserProfileLoading) {
    return (
      <div className="py-20 px-4 min-h-screen sm:px-6 lg:px-20 bg-primary-50 dark:bg-black">
        <Skeleton className="h-64 rounded-xl w-full" />
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Skeleton className="h-64 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
          <div className="space-y-6">s
            <Skeleton className="h-52 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
        </div>
      </div>
    );
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
      <div className="py-20 px-4 min-h-screen sm:px-6 lg:px-20 bg-primary-50 dark:bg-black">
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
