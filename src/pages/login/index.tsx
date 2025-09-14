import React, { useState } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from '@mui/material';
import { useLoginMutation } from '../../api/apiSlice';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader } from 'lucide-react';
import Image from '../../assets/register.jpg';
import type { ILoginForm, UserData, Role } from '../../interface';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // i18next hook

const schema = (t: (key: string) => string) =>
  yup
    .object({
      username: yup.string().required(t('usernameRequired')),
      password: yup.string().required(t('passwordRequired')),
    })
    .required();

const Login: React.FC = () => {
  const { t } = useTranslation(); // Tarjima uchun hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema(t)), // Tarjima funksiyasi sxemaga uzatildi
  });

  const [loginUser, { isLoading }] = useLoginMutation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res = await loginUser(data).unwrap();
      if (res.success) {
        const role: Role =
          res.data.role?.toUpperCase() === 'USER'
            ? 'USER'
            : res.data.role?.toUpperCase() === 'ADMIN'
              ? 'ADMIN'
              : null;
        if (!role) {
          toast.error(t('invalidRole')); // Tarjima
          return;
        }
        const userData: UserData = {
          token: res.data.token,
          type: 'Bearer',
          username: res.data.username,
          email: res.data.email,
          role,
        };
        login(userData);

        toast.success(t('loginSuccess')); // Tarjima
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || t('somethingWentWrong')); // Tarjima
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <img
          src={Image}
          alt={t('login')} // Tarjima
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg">
        <div className="w-full max-w-md space-y-8 bg-offwhite p-8 rounded shadow">
          <h2 className="text-3xl font-bold text-title text-center lg:text-left">
            {t('login')} {/* Tarjima */}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('username')} // Tarjima
                  variant="standard"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  label={t('password')} // Tarjima
                  variant="standard"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              className="!py-3 !font-medium"
            >
              {isLoading ? <Loader /> : t('login')} {/* Tarjima */}
            </Button>
          </form>
          <Typography className="text-sm text-center text-label">
            {t('dontHaveAccount')}{' '} {/* Tarjima */}
            <Link
              to="/register"
              className="text-primary font-medium hover:underline"
            >
              {t('signUp')} {/* Tarjima */}
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;