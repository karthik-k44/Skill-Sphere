import { createUser, loginUser } from "../../../redux/action";
import { useAppDispatch } from "../../../redux/hook";
import { AuthType } from "../../../types/authentication";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

interface CreateAndLoginFormProps {
  formType: AuthType
}

const CreateAndLoginFormHook = ({ formType }: CreateAndLoginFormProps) => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            name: formType === AuthType.SIGN_UP ? Yup.string().required('Name is required') : Yup.string(),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values) => {
            if (formType === AuthType.SIGN_UP) {
                dispatch(createUser(values))
                .then(() => {
                    formik.resetForm();
                    toast.success('User created successfully');
                })
                .catch((error) => {
                    console.log(error);
                });
                console.log('Signing up with:', values);
            } else {
                dispatch(loginUser(values))
                .then(() => {
                    formik.resetForm();
                    toast.success('User logged in successfully');
                })
                .catch((error) => {
                    console.log(error);
                });
                console.log('Logging in with:', values);
            }
        },
    });

    return {
        formik,
    };
}

export default CreateAndLoginFormHook;
