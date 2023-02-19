import { FC,  forwardRef,  useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";

export type OtpInputRef = {
  focus:()=>void
}

export interface OtpInputProps {
  length:number,
  className?:string,
  onInput?:(code:string)=>void,
  onCompleted?:(code:string)=>void,
  disabled?:boolean,
  // ref?:React.Ref<OtpInputRef>
}

function OtpInput({length,className,disabled, onInput,onCompleted}:OtpInputProps,ref:React.Ref<OtpInputRef>){
  const [otp, setOTP] = useState<string[]>(new Array(length).fill(''));
  // const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeRef = useRef<HTMLInputElement>(null)

  const innerRef = useRef<HTMLDivElement>(null)

   useImperativeHandle(ref, () => ({ focus }));

  useEffect(() => {
    if (onInput) {
      onInput(otp.join(''));
    }
  }, [otp, onInput]);

  useEffect(()=>{
    activeRef.current?.focus()
  },[])

  function focus(){
    activeRef.current?.focus()
  }

  useLayoutEffect(() => {
    activeRef.current?.focus();
    activeRef.current?.select();
  }, [activeIndex]);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    //   e.preventDefault();
    //   const nextIndex = e.key === "ArrowLeft" ? index - 1 : index + 1;
    //   if (nextIndex >= 0 && nextIndex < length) {
    //     setActiveIndex(nextIndex);
    //   }
    // } else
    if(e.key==='Enter' && otp.join('').length!==length) {
      return e.preventDefault();
    }
    else if(e.key==='Tab') {
      e.preventDefault()
    } else  if (e.key === 'Backspace' || e.key==='Delete') {
      const newOTP = [...otp];
      if(newOTP[index]===""){
        newOTP[index-1] = '';
      }
      newOTP[index] = '';
      setOTP(newOTP);
      if(activeIndex>0)
      setActiveIndex(index-1)
      e.preventDefault()
    } else if (/^\d$/.test(e.key)) {
      const newOTP = [...otp];
      if (/^\d+$/.test(e.key)) {
        newOTP[index] = e.key
        setOTP(newOTP)
        const sNewOtp = newOTP.join("")
        if (onInput) {
          onInput(sNewOtp)
        }
        if (index < length - 1) {
          activeRef.current?.focus()
        } else if(onCompleted && newOTP.join("").length===length) {
          onCompleted(sNewOtp)
        }
      }

      const nextIndex = index + 1;
      if (nextIndex < length) {
        setActiveIndex(nextIndex);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    const clipboardData = e.clipboardData.getData("text/plain");
    const numbersOnly = clipboardData.replace(/\D/g, "").slice(0,length-activeIndex);
    if(numbersOnly.length===0) return;
    const newValues = [...otp];

    let nextIndex=activeIndex
    for (let i = 0; i < numbersOnly.length; i++) {
      newValues[activeIndex + i] = numbersOnly[i];
      nextIndex=activeIndex+i
      if(nextIndex>=length) break;
    }
    nextIndex++;

    if(nextIndex>=length) nextIndex=length-1;

    setOTP(newValues);
    setActiveIndex(nextIndex);

    const sNewOtp = newValues.join('')
    if (onInput) onInput(sNewOtp)
    if (sNewOtp.length===length) {
      if(onCompleted) onCompleted(sNewOtp)
    } else {
      activeRef.current?.focus()
    }
  };

  const getClassname = (index:number)=>{
    const baseStyles = `w-full rounded-md text-4xl font-bold selection:bg-transparent text-center py-3 px-1 focus:ring-0 outline-none border-0 ring-0`
    if(index===activeIndex)
      return `${baseStyles} focus:bg-gray-700 focus:text-white`;

    if(otp[index]!=="") {
      return `${baseStyles} bg-white`
    }

    return `${baseStyles} bg-gray-100 text-gray-400 font-normal px-4`
  }

  const focusActive = (e:React.MouseEvent)=>{
      e.preventDefault();
      setActiveIndex(activeIndex)
      activeRef.current?.focus()
  }

  return (
    <div className={className} ref={innerRef} onMouseDown={focusActive}>
      <div className={`flex flex-row justify-evenly gap-4 w-full`}>
        {otp.map((d, index) => (
          index===activeIndex?
          <input
            key={index}
            type="text"
            inputMode="numeric"
            value={(d.length===1||activeIndex===index)?d:'-'}
            maxLength={1}
            readOnly
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={e=>{
              e.preventDefault();
              setActiveIndex(activeIndex)
            }}

            onPaste={handlePaste}
            disabled={disabled || activeIndex!==index}
            className={getClassname(index)}
            // ref={(el) => (inputs.current[index] = el)}
            ref={activeRef}
          />
          :
          <div key={index} className={getClassname(index)}
              onMouseDown={focusActive}>
            {d.length===1?d:'-'}
          </div>
        ))}
      </div>
    </div>
  )
}

export default forwardRef(OtpInput)
