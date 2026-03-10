import { useEffect, useState } from 'react';
import Modal from '../../../components/modal';
import { AuthType } from '../../../types/authentication';
import FormControl from '../../../components/form-control';
import Input from '../../../components/input';
import Text from '../../../components/typography/text';
import CreateAndLoginFormHook from './create-and-login-form-hook';
import Button from '../../../components/button';
import { ButtonKind, ButtonType } from '../../../types/button';
import type { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
 
interface CreateAndLoginFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateAndLoginForm: React.FC<CreateAndLoginFormProps> = ({ isOpen, setIsOpen }) => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
    const {isLoggingLoading, isSignUpLoading} = useSelector((state: RootState) => state.auth);

  const { formik } = CreateAndLoginFormHook({
    formType: authType,
    onLoginSuccess: () => setIsOpen(false),
  });

  useEffect(() => {
    setAuthType(AuthType.LOGIN);
    formik.resetForm();
  }, [isOpen]);

  useEffect(() => {
    formik.resetForm();
  }, [authType]);


  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={authType === AuthType.SIGN_UP ? 'Sign Up' : 'Login'}>
      <form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-2'>
        {authType === AuthType.SIGN_UP && (
          <FormControl error={formik.errors.name && formik.touched.name ? formik.errors.name : ''} label='Name' gap={1}>
            <Input
              value={formik.values.name}
              onChange={formik.handleChange('name')}
              placeholder='Name'
            />
          </FormControl>
        )}
        <FormControl error={formik.errors.email && formik.touched.email ? formik.errors.email : ''} label='Email' gap={1}>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            placeholder='Email'
            type='email'
          />
        </FormControl>

        <FormControl error={formik.errors.password && formik.touched.password ? formik.errors.password : ''} label='Password' gap={1}>
          <Input
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            placeholder='Password'
            type='password'
          />
        </FormControl>

        <Text>
          {authType === AuthType.SIGN_UP ? 'Already have an account? ' : "Don't have an account? "}
          <button type='button' onClick={() => setAuthType(authType === AuthType.SIGN_UP ? AuthType.LOGIN : AuthType.SIGN_UP)} className='text-primary-600 hover:text-primary-700 hover:underline'>
            {authType === AuthType.SIGN_UP ? 'Login' : 'Sign Up'}
          </button>
        </Text>

        <div className='flex w-full justify-end gap-3'>
          <Button
            kind={ButtonKind.DISCARD}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button
            kind={ButtonKind.PRIMARY}
            type={ButtonType.SUBMIT}
            isLoading={authType === AuthType.SIGN_UP ? isSignUpLoading : isLoggingLoading}
          >
            {authType === AuthType.SIGN_UP ? 'Sign Up' : 'Login'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateAndLoginForm;
