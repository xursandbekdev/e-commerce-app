import React, { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    TextField, Button,
    InputAdornment, IconButton,
    Typography,
} from "@mui/material";
import { useLoginMutation } from "../../api/apiSlice";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader } from "lucide-react";
import Image from "../../assets/register.jpg";
import type { ILoginForm, UserData, Role } from "../../interface";
import { Link, useNavigate } from "react-router-dom";
const schema = yup
    .object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
    })
    .required();

const Login: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({
        resolver: yupResolver(schema),
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
                    res.data.role?.toUpperCase() === "USER"
                        ? "USER"
                        : res.data.role?.toUpperCase() === "ADMIN"
                            ? "ADMIN"
                            : null;
                if (!role) {
                    toast.error("Invalid role");
                    return;
                }
                const userData: UserData = {
                    token: res.data.token,
                    type: "Bearer",
                    username: res.data.username,
                    email: res.data.email,
                    role,
                };
                login(userData);

                toast.success("Login successful!");
                navigate("/");
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
                    alt="Login Illustration"
                    className="w-full h-auto object-contain"
                />
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg">
                <div className="w-full max-w-md space-y-8 bg-offwhite p-8 rounded shadow">
                    <h2 className="text-3xl font-bold text-title text-center lg:text-left">
                        Login
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                            className="!py-3 !font-medium"
                        >
                            {isLoading ? <Loader /> : "Login"}
                        </Button>
                    </form>
                    <Typography className="text-sm text-center text-label">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-medium hover:underline"
                        >
                            Sign up
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Login;
