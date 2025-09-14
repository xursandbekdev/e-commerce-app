import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Eye, EyeOff, Loader } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../../api/apiSlice";
import Image from "../../assets/register.jpg";
import { useAuth } from "../../context/authContext";
import type { IFormInput } from "../../interface";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Please confirm password"),
  })
  .required();

const Register: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res.success) {
        const userData = {
          token: res.data.token,
          type: res.data.type,
          username: res.data.username,
          email: res.data.email,
          role: res.data.role.toLowerCase() === "ADMIN" ? "ADMIN" : "USER",
        };

        login(userData as any);
        toast.success(res.message || "Registration successful!");

        setTimeout(() => {
          navigate("/");
        }, 400);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <img
          src={Image}
          alt="Register Illustration"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg">
        <div className="w-full max-w-md space-y-8 bg-offwhite p-8 rounded shadow">
          <h2 className="text-3xl font-bold text-title text-center lg:text-left">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="standard"
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="standard"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  label="Password"
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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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
              {isLoading ? <Loader className="animate-spin" /> : "Register"}
            </Button>
          </form>

          <Typography className="text-sm text-center text-label">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Register;
