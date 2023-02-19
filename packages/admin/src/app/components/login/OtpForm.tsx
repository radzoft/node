import { Button } from 'flowbite-react'
import {forwardRef, Ref, useImperativeHandle, useRef, useState} from 'react'
import { MdArrowBack } from 'react-icons/md'
import OtpInput, { OtpInputRef } from '../OtpInput'

export type OtpFormRef = {
  focus:()=>void
}

export interface OtpFormProps {
  disabled?:boolean,
  onBack?:()=>void,
  onVerify:(code:string)=>Promise<void>,
  className?:string,
}

function OtpForm({disabled,onBack,onVerify,className}:OtpFormProps,ref:Ref<OtpFormRef>){
  const [otp,setOtp] = useState('')
  const [submitting,setSubmitting] = useState(false)
  const inputRef = useRef<OtpInputRef>(null)

  function focus(){
    inputRef.current?.focus()
  }

  useImperativeHandle(ref, () => ({ focus }));

  const onSubmit:React.FormEventHandler = async (e)=>{
    e.preventDefault();
    if(submitting) return;
    setSubmitting(true)
    await onVerify(otp)
    setSubmitting(false)
  }

  return (
    <div className={className}>
    <form className='max-w-md flex flex-col items-center' onSubmit={onSubmit}>
      <button type="button"
        className="absolute top-4 left-4 bg-gray-200 p-3 border-gray-300 border-[1px] hover:bg-gray-400/30 focus:bg-gray-400/50 rounded-md" title="Back"
        onClick={e=>{
          if(onBack) onBack()
        }}>
        <MdArrowBack size="24px"/>
      </button>
      <p></p>
      <OtpInput length={7} className="" onCompleted={setOtp} ref={inputRef}/>

      <Button typeof="button" onMouseDown={e=>e.stopPropagation()} className="uppercase mt-11" disabled={disabled || otp.length!==7 || submitting} type="submit" color="dark">Verify Access Code</Button>
    </form>
    </div>
  )

}

export default forwardRef(OtpForm)
