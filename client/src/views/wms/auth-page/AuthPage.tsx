import FormInput from '@/components/input/FormInput';
import styles from './AuthPage.module.scss';
import { useForm } from 'react-hook-form';
import boxes from '@/assets/icons/box.svg';
import { useState } from 'react';
import { defaultValues } from './static';
import { useNavigate } from 'react-router-dom';
import { useAuthenticateUser } from './query';
import API from '@/config/api';
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from '@/utils/globalValidation';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const loginUserMutation = useAuthenticateUser(API.LOGIN_USER);
  const registerUserMutation = useAuthenticateUser(API.REGISTER_USER);

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
  } = useForm<AuthFormData>({ defaultValues });

  const login = (data: AuthFormData) => {
    loginUserMutation.mutate(data, {
      onError: (error: any) => {
        setError(error?.response?.data?.msg);
      },
      onSuccess: () => {
        navigate('/cms');
      },
    });
  };

  const switchAuth = () => {
    setIsLogin((prev) => !prev);
    setError(null);
  };

  const register = (data: AuthFormData) => {
    registerUserMutation.mutate(data, {
      onError: (error: any) => {
        setError(error?.response?.data?.msg);
      },
      onSuccess: () => {
        navigate('/cms');
      },
    });
  };

  const onSubmit = (data: AuthFormData) => {
    if (isLogin) {
      login(data);
    } else {
      register(data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>WMS</h2>
          <img src={boxes} />
        </div>
        <form>
          {!isLogin && (
            <FormInput
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              type="text"
              animationDelay={0.4}
              error={errors.fullName}
              control={control}
              rules={{
                required: 'Full Name is required',
                validate: validateFullName,
              }}
            />
          )}
          <FormInput
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            error={errors.email}
            control={control}
            rules={{
              required: 'Email is required',
              validate: validateEmail,
            }}
          />
          <FormInput
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            error={errors.password}
            control={control}
            animationDelay={0.4}
            rules={{
              required: 'Password is required',
              validate: validatePassword,
            }}
          />
          {error && <p className={styles.error}>{error}</p>}

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className={styles.btn}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
          <button
            type="button"
            className={styles['switch-btn']}
            onClick={switchAuth}
          >
            {isLogin
              ? "Don't have account yet? Register"
              : 'Already have an account? Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
