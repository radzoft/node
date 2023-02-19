import { FormEvent } from "react"

export const setupRequiredInput = (invalidText:string,onInput:React.Dispatch<React.SetStateAction<string>>)=>{
  return {
    onInvalid:(e:FormEvent<HTMLInputElement>)=>e.currentTarget?.setCustomValidity(invalidText),
    onInput:(e:FormEvent<HTMLInputElement>)=>{
      e.currentTarget?.setCustomValidity('')
      if(onInput) onInput(e.currentTarget.value)
    },
    required:true
  }
}
