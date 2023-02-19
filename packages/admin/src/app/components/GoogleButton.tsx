import { FC } from 'react';
import { useEffect, useRef } from 'react'

declare global {
    const google: typeof import('google-one-tap');
}

export interface GoogleButtonProps {
  clientId: string,
  onResult?: (token:string)=>void,
  disabled?:boolean
}

const GoogleButton:FC<GoogleButtonProps> = ({clientId, onResult, disabled}) => {

  const googleButton = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const src='https://accounts.google.com/gsi/client'

    new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve()
      const script = document.createElement('script')
      script.src = src
      script.onload = () => resolve()
      script.onerror = (err) => reject(err)
      document.body.appendChild(script)
    })
      .then(() => {
        google.accounts.id.initialize({
          client_id: clientId,
          ux_mode:'popup',
          cancel_on_tap_outside:false,
          callback: (res) => {
            if(onResult) onResult(res.credential);
          },
        })
        if(googleButton.current)
          google.accounts.id.renderButton(
            googleButton.current,
            { theme: 'outline', size: 'large', width:232 }
          )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId])

  return (
    <div className={`${disabled && 'cursor-not-allowed'}`}>
      <div ref={googleButton} className={`${disabled && 'pointer-events-none opacity-50'}`}></div>
    </div>
  )
}

export default GoogleButton
