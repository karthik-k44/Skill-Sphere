import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UserProfileFormType, type UserProfileResponse } from '../../../../types/user-profile'
import { useAppDispatch } from '../../../../redux/hook'
import { CreateUserProfile, GetUserProfile, UpdateUserProfile } from '../../../../redux/action'
import toast from 'react-hot-toast'

interface CreateUserFormHookProps {
  formType: UserProfileFormType
  userProfileData?: UserProfileResponse
  formSuccess?: () => void
}
const CreateUserFormHook = ({ formType, userProfileData, formSuccess }: CreateUserFormHookProps) => {
  const dispatch = useAppDispatch()
  const userId = localStorage.getItem('userId')

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
      phoneNumber: userProfileData?.phoneNumber || '',
      streetAddress: userProfileData?.address?.street || '',
      city: userProfileData?.address?.city || '',
      state: userProfileData?.address?.state || '',
      zipCode: userProfileData?.address?.zipCode || '',
      country: userProfileData?.address?.country || '',
      skills: userProfileData?.skills || [],
      experience: userProfileData?.experience || [],
      education: userProfileData?.education || [],
      projects: userProfileData?.projects || [],
      certifications: userProfileData?.certifications || [],
      languages: userProfileData?.languages || [],
      interests: userProfileData?.interests || [],
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .length(10, 'Enter valid number')
        .required('Enter your phone number'),
      streetAddress: Yup.string().required('Enter your street address'),
      city: Yup.string().required('Enter your city name'),
      state: Yup.string().required('Enter your state name'),
      zipCode: Yup.string(),
      country: Yup.string().required('Enter your country name'),
    }),
    onSubmit: async (values) => {
      if (!userId) {
        toast.error('User not found')
        return
      }

      const { streetAddress, city, state, zipCode, country, ...rest } = values
      const params = {
        ...rest,
        userId,
        address: {
          street: streetAddress,
          city,
          state,
          zipCode,
          country,
        }
      }
    
      try {
        if (formType === UserProfileFormType.CREATE) {
          await dispatch(CreateUserProfile(params)).unwrap()
          toast.success('Profile created successfully')
          formik.resetForm()
          formSuccess?.()
        } else if(formType === UserProfileFormType.UPDATE) {
          console.log(params, 'Update params')
          await dispatch(UpdateUserProfile({ userId, params })).unwrap()
          toast.success('Profile updated successfully')
          formSuccess?.()
        }

        await dispatch(GetUserProfile(userId)).unwrap()
      } catch (error) {
        const message =
          error instanceof Error ? error.message : `Failed to ${formType === UserProfileFormType.CREATE ? 'create' : 'update'} profile`
        toast.error(message)
      }
    }
  })
  return formik;
}

export default CreateUserFormHook
