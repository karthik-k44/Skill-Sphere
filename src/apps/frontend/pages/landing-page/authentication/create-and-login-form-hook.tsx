import { createUser, loginUser } from "../../../redux/action";
import { useAppDispatch } from "../../../redux/hook";
import { AuthType } from "../../../types/authentication";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/types";

interface CreateAndLoginFormProps {
  formType: AuthType;
  onLoginSuccess: () => void;
}

const CreateAndLoginFormHook = ({ formType, onLoginSuccess }: CreateAndLoginFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
        onSubmit: async (values) => {
            if (formType === AuthType.SIGN_UP) {
                try {
                    await dispatch(createUser(values)).unwrap();
                    formik.resetForm();
                    onLoginSuccess();
                    toast.success('User created successfully');
                    navigate(ROUTES.PORTAL);
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Unable to create user');
                }
            } else {
                try {
                    await dispatch(loginUser({
                        email: values.email,
                        password: values.password,
                    })).unwrap();
                    formik.resetForm();
                    onLoginSuccess();
                    toast.success('User logged in successfully');
                    navigate(ROUTES.PORTAL);
                } catch (error) {
                    toast.error(error instanceof Error ? error.message : 'Unable to login');
                }
            }
        },
    });

    return {
        formik,
    };
}

export default CreateAndLoginFormHook;
