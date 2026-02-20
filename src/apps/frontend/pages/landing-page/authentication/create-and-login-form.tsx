import { useState } from 'react';
import Modal from '../../../components/modal';
import { AuthType } from '../../../types/authentication';
import FormControl from '../../../components/form-control';
import Input from '../../../components/input';
import Text from '../../../components/typography/text';
import CreateAndLoginFormHook from './create-and-login-form-hook';
 

interface CreateAndLoginFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateAndLoginForm: React.FC<CreateAndLoginFormProps> = ({ isOpen, setIsOpen }) => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);

  const { formik } = CreateAndLoginFormHook({ formType: authType });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={authType === AuthType.SIGN_UP ? 'Sign Up' : 'Login'}>
      <form onSubmit={formik.handleSubmit} className='w-full flex flex-col gap-2'>
        {authType === AuthType.SIGN_UP && (
          <FormControl error={formik.errors.name && formik.touched.name ? formik.errors.name : ''} label='Name'>
            <Input
              value={formik.values.name}
              onChange={formik.handleChange('name')}
              placeholder='Name'
            />
          </FormControl>
        )}
        <FormControl error={formik.errors.email && formik.touched.email ? formik.errors.email : ''} label='Email'>
          <Input
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            placeholder='Email'
            type='email'
          />
        </FormControl>

        <FormControl error={formik.errors.password && formik.touched.password ? formik.errors.password : ''} label='Password'>
          <Input
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            placeholder='Password'
            type='password'
          />
        </FormControl>

        <Text>
          {authType === AuthType.SIGN_UP ? 'Already have an account? ' : "Don't have an account? "}
          <button type='button' onClick={() => setAuthType(authType === AuthType.SIGN_UP ? AuthType.LOGIN : AuthType.SIGN_UP)} className='text-blue-500 hover:underline'>
            {authType === AuthType.SIGN_UP ? 'Login' : 'Sign Up'}
          </button>
        </Text>

        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors'>
          {authType === AuthType.SIGN_UP ? 'Sign Up' : 'Login'}
        </button>
      </form>
    </Modal>
  );
};

export default CreateAndLoginForm;
