import { useRef, useState} from "react"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"

export default function Register() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [errors,setErrors]= useState(null);
  const { setUser, setToken }= useStateContext()

  const onSubmit= (ev)=>{
    ev.preventDefault();
    const payload = {
      email:emailRef.current.value, 
      name:nameRef.current.value,
      password:passwordRef.current.value,
      password_confirmation:confirmPasswordRef.current.value


    }

    console.log(payload)

    axiosClient.post('/signup',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            console.log(err);
            const response = err.response;
            if(response && response.status === 422){
                console.log(response.data.errors);
                setErrors(response.data.errors);
            }
        })
  }
  
    return (
      <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create an account
        </h2>
        {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))} 
              </div>
            }
        <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                ref={emailRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
             Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="email"
                ref={nameRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                ref={passwordRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="current-password"
                ref={confirmPasswordRef}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
             
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
         Already logged in?{' '}
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
           Login
          </a>
        </p>
        </>
    )
  }
  