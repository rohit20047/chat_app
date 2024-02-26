import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'


function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            localStorage.setItem("auth", "yes");
            const userData = await authService.createAccount(data);
            console.log('working');
            if (userData) {
                
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className="flex items-center justify-center bg-slate-900">
            <div className={`mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-black/10`}>
          
                <h2 className="text-center text-2xl font-bold text-yellow-500 leading-tight"  style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}>Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-yellow-300/60"  style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}>
                    Already have  an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-yellow-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 text-white'  style={{ fontFamily: "Kode Mono, monospace" , fontWeight: 700}}>
                        <Input
                         className="bg-slate-600 border-transparent"
                        label="User Name: "
                        placeholder="Enter your  name"
                        {...register("name", {
                            required: true,
                        })}
                       
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                        className="bg-slate-600 border-transparent"
                        />
                        <Input
                        label="create new Password: "
                        type="password"
                        placeholder="Enter your password (8 charectors)"
                        {...register("password", {
                            required: true,})}
                            className="bg-slate-600 border-transparent"
                        />
                        <Button type="submit" className="w-full text-yellow-500 bg-slate-900 ">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup