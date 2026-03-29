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

const getErrorMessage = (error: unknown, fallbackMessage: string) => {
    if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
    ) {
        return (error as { message: string }).message;
    }

    if (typeof error === "string" && error.trim()) {
        return error;
    }

    return fallbackMessage;
};

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
            try {
                if (formType === AuthType.SIGN_UP) {
                    await dispatch(createUser(values)).unwrap();
                    formik.resetForm();
                    onLoginSuccess();
                    toast.success('User created successfully');
                    navigate(ROUTES.PORTAL);
                    return;
                }

                await dispatch(loginUser({
                    email: values.email,
                    password: values.password,
                })).unwrap();

                formik.resetForm();
                onLoginSuccess();
                toast.success('User logged in successfully');
                navigate(ROUTES.PORTAL);
            } catch (error) {
                toast.error(
                    getErrorMessage(
                        error,
                        formType === AuthType.SIGN_UP ? 'Unable to create user' : 'Unable to login',
                    ),
                );
            }
        },
    });

    return {
        formik,
    };
}

export default CreateAndLoginFormHook;
