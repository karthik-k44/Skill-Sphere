import { UserRoundPlus } from "lucide-react"
import { Button, Text } from "../../../components"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes/types"
import { UserProfileFormType } from "../../../types/user-profile"

const NoUserProfileCard = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full flex flex-col gap-2 items-center justify-between p-5'>
       <div className="rounded-xl p-5 shadow">
         <UserRoundPlus className="text-primary" size={50}/>
       </div>
        <div>
            <Text font="ParagraphSmall" tabletFont="ParagraphMedium">
                Didn't create User Profile yet,
            </Text>
            <Text font="ParagraphXSmall" tabletFont="ParagraphSmall" color="text-primary">
                Click the button to create the profile
            </Text>
        </div>
        <div>
            <Button onClick={()=>{navigate(`${ROUTES.PROFILE}/${UserProfileFormType.CREATE}`)}}>
                Create Profile
            </Button>
        </div>
    </div>
  )
}

export default NoUserProfileCard
