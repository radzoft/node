import { Button, TextInput } from "flowbite-react";
import { FC, useRef, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import GoogleButton from "../GoogleButton";

export interface EmailFormProps {
  onSendCode:(email:string)=>void,
  disabled?:boolean,
  onGoogleLogin:(token:string)=>void,
  className?:string,
  email:string,
  setEmail:React.Dispatch<React.SetStateAction<string>>
}

export const EmailForm:FC<EmailFormProps> = ({onSendCode,disabled,onGoogleLogin,className,email,setEmail})=>{

  return (
    <div className={className}>
     <form className='flex flex-col space-y-4 mb-20' onSubmit={e=>{
        e.preventDefault()
        onSendCode(email)
     }}>

      <TextInput icon={HiOutlineMail} placeholder="Email" type="email" value={email} onInput={e=>setEmail(e.currentTarget.value)} id="email" disabled={disabled}/>

      <Button disabled={disabled} type="submit" color="dark">Sign in with email</Button>
      {/* <span className="text-slate-800">Don't have an account? <button className="ml-2 font-bold text-primary">Sign up</button></span> */}
      <div className="flex flex-row space-x-4">
        <div className="grow h-[1px] bg-slate-400 self-center"/>
        <span className="shrink text-slate-800">Or</span>
        <div className="grow h-[1px] bg-slate-400 self-center"/>
      </div>
      <GoogleButton clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`} onResult={onGoogleLogin} disabled={disabled}/>
    </form>
    </div>
  )
}

export default EmailForm
