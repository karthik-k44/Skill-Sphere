import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UserProfileFormType } from '../../../../types/user-profile'
import { useAppDispatch } from '../../../../redux/hook'
import { CreateUserProfile, GetUserProfile } from '../../../../redux/action'
import toast from 'react-hot-toast'

interface CreateUserFormHookProps {
  formType: UserProfileFormType
}
const CreateUserFormHook = ({ formType }: CreateUserFormHookProps) => {
  const dispatch = useAppDispatch()
  const userId = localStorage.getItem('userId')

  const formik = useFormik({
    initialValues:{
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      languages: [],
      interests: [],
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
    onSubmit: (values) => {
      const { streetAddress, city, state, zipCode, country, ...rest } = values
      const params = {
        ...rest,
        userId: userId || '',
        address: {
          street: streetAddress,
          city,
          state,
          zipCode,
          country,
        }
      }
    
      if(formType === UserProfileFormType.CREATE)
      {
        dispatch(CreateUserProfile(params))
        .then(()=>{})
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          toast.success('Profile created successfully')
          formik.resetForm()
          dispatch(GetUserProfile(userId || '')).catch(()=>{})
        })
      }
    }
  })
  return formik;
}

export default CreateUserFormHook
