import { User } from "firebase/auth";
import { Button, Modal, Spinner, TextInput, Toast } from "flowbite-react";
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import {AiOutlineUser, } from 'react-icons/ai'
import {BsKey} from 'react-icons/bs'
import GoogleButton from "../components/GoogleButton";
import { login } from "../../lib/firebase";
import {sendAccessCode, verifyAccessCode} from "../../lib/api"
import { setupRequiredInput } from "../../lib/setupRequiredInput";
import { HiX, HiOutlineMail } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import {BiError} from 'react-icons/bi'
import EmailForm from "../components/login/EmailForm";
import OtpForm,{ OtpFormRef } from "../components/login/OtpForm";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import "./LoginPage.module.scss"
import CountdownTimer from "../components/Countdown";

/* eslint-disable-next-line */
export interface LoginPageProps {
  onSignIn?:(user?:User)=>void
}

export function LoginPage(props: LoginPageProps) {
  const [processing,setProcessing] = useState(false);
  const [showError,setShowError] = useState(false);
  const [loginError,setLoginError] = useState("")
  const [emailVerified,setEmailVerified] = useState(false);
  const [email,setEmail] = useState('')
  const retryTimeout = 7777
  const [resendOn,setResendOn] = useState(0)
  const [emailSent,setEmailSent] = useState(false)

  const onGoogleLogin = (token:string)=>{
    setProcessing(true)
    login(token).then(r=>{
      if(props.onSignIn) props.onSignIn(r.user)
    })
  }
  useLayoutEffect(()=>{
    otpRef.current?.focus()
  },[processing,emailSent])
  const resendCode:React.MouseEventHandler<HTMLButtonElement> = async (e)=>{
    if(resendOn>Date.now()) return;
    await sendCode(email)
    otpRef.current?.focus()
  }
  const sendCode = (email:string)=>{
    setEmail(email)
    setEmailSent(false)
    setProcessing(true)
    setResendOn(resendOn+retryTimeout)
    setTimeout(() => {
      setProcessing(false)
      setEmailVerified(true)
    }, 777);
    return sendAccessCode(email).then(r=>{
      setProcessing(false)
      if(!r.success) {
        setLoginError(r.error??'')
        setShowError(true)
      } else {

        setEmailSent(true)
        console.log(r,emailSent)
        setResendOn((r.sent??Date.now())+retryTimeout)
        setEmailVerified(true)
      }
    }).catch(e=>{
      console.log(typeof e, e)
      setProcessing(false)
      setLoginError(e.message)
      setShowError(true)
      setEmailVerified(false)
    })
  }

  const verifyOtp = async (code:string)=>{
    verifyAccessCode(code,email)
    if(props.onSignIn) props.onSignIn()
  }

  const nodeRef = useRef(null)
  const otpRef = useRef<OtpFormRef>(null)

  return (
    <div className="absolute flex flex-col items-center w-screen h-screen bg-stone-200 sm:pt-[20vh] pt-0" onMouseUp={e=>{otpRef.current?.focus();}}>
      {
        <SwitchTransition mode="out-in">
          <CSSTransition nodeRef={nodeRef} key={emailVerified?'otp-form':'email-form'} in={emailVerified} timeout={300} classNames="fade" unmountOnExit>
            {
              <div ref={nodeRef} className="flex flex-col items-center">
                {
                  emailVerified
                  ? <>
                      <h1 className='text-2xl text-center font-bold text-slate-800 mb-11 '>Verify Email</h1>
                      <p className="text-center mb-7 text-muted text-gray-500">We have sent the access code to <i>{email}</i></p>
                      <OtpForm ref={otpRef} className="my-7" disabled={processing} onVerify={verifyOtp} onBack={()=>setEmailVerified(false)} />
                      {
                        emailSent ?
                        <p className="text-center mt-11 text-muted text-gray-700">Did not receive the code? <button onClick={resendCode} type="button"><CountdownTimer endDate={resendOn}/></button></p>
                        : <p></p>
                      }
                    </>
                  : <>
                      <h1 className='text-2xl text-center font-bold text-slate-800 mb-11'>Welcome to {import.meta.env.VITE_SITE_NAME}</h1>
                      <EmailForm disabled={processing} onGoogleLogin={onGoogleLogin} email={email} setEmail={setEmail} onSendCode={sendCode}/>
                  </>
                }
              </div>
            }
          </CSSTransition>
        </SwitchTransition>
      }

  {
    showError &&
  <Modal size="lg"
    show={true} dismissible
    onClose={()=>setShowError(false)}>
    <Modal.Body>
      <div>
      <div className="flex flex-row items-center">
        <BiError size="47px" className="text-red-700 mr-3"/>
        <span className="text-xl font-bold">{loginError}</span>
      </div>
      <p className="m-2 text-md font-normal text-gray-700">An error occured while signing in. Please try again!</p>
      <div className="flex justify-end pt-7">
        <Button onClick={()=>setShowError(false)} outline color="dark">
          Okay
        </Button>
      </div>
      </div>
    </Modal.Body>
  </Modal>
  }

      {
        processing &&
        <div className="absolute top-0 left-0 w-screen h-screen bg-stone-900/50 flex justify-center items-center backdrop-blur-sm">
          <Toast>
            {
              (<>
                <Spinner size="md"/>
                <div className="ml-4 text-md font-normal self-center">Sending access code...</div>
              </>)
            }

          </Toast>
        </div>
      }
    </div>
  );
}

export default LoginPage;
