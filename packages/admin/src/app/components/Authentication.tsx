import { FC, PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../lib/firebase";
import {actions} from '../../store/auth'

export const Authentication:FC<PropsWithChildren> = ({children})=>{
  const dispatch = useDispatch()

  useEffect(()=>{
    return auth.onAuthStateChanged(user=>{
      console.log(user)
      dispatch(actions.init())
      document.getElementById('loader')?.remove()
    })
    console.log(auth.currentUser)
  },[])

  return (
    <>
    {children}
    </>
  )
}