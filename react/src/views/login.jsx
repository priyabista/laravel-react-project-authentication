import { useRef, useState} from "react"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"
export default function Login() {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const [errors,setErrors]= useState(null);
  const { setUser, setToken }= useStateContext()

  const onSubmit= (ev)=>{
    ev.preventDefault();
    const payload = {
      email:emailRef.current.value, 
      password:passwordRef.current.value,
     

    }

    console.log(payload)

    axiosClient.post('/login',payload)
        .then(({data})=>{
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
          console.log(err);
          const response = err.response;
          if(response && response.status === 422){
              console.log(response.data.errors);
              if(response.data.errors){
                  setErrors(response.data.errors);
              }else{
                  setErrors({
                      email: [response.data.message]
                  })
              }
          }
        })
  }
  
  return (
   <>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))} 
              </div>
            }
            <div className="flex justify-center items-center h-screen">
          <form style={{ margin: 'auto', maxWidth: '400px', width: '100%' }} action="#" method="POST" onSubmit={onSubmit}>
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
                  ref={passwordRef}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register
            </a>
          </p>
          </>
  )
}
