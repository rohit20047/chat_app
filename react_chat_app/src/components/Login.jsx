import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border bg-slate-800 border-black/10`} style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}>
        
        <h2 className="text-center text-2xl font-bold leading-tight text-yellow-500" style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}>Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-yellow-300/60" style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}>
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                        style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-yellow-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5 text-white 'style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}} >
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                className="bg-slate-600 border-transparent"
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password(8 charectors)"
                {...register("password", {
                    required: true,
                })}
                className="bg-slate-600 border-transparent"
                />
                <Button
                type="submit"
                className="w-full text-yellow-500 bg-slate-900 "
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login