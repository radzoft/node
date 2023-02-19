import axios from "axios";
import { routes } from '@radzoft/core'

export const api = axios.create({baseURL:import.meta.env.VITE_API_URL})

export interface ApiResult {
  success:boolean
  error?:string
  [key:string]:any
}

export interface SendAccessCodeResult extends ApiResult {
  sent?:number
  created?:number
}

export const sendAccessCode = (email:string):Promise<SendAccessCodeResult>=>{
  return api.post(routes.AUTH_GENERATE,{email}).then(r=>r.data)
    .catch(e=>({success:false,error:e.message}))
}

export const verifyAccessCode = (code:string,email:string):Promise<ApiResult>=>{
  return api.post(routes.AUTH_VERIFY,{code,email}).then(r=>r.data)
}
