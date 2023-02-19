import { AnyAction, MiddlewareArray, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import LoginPage from "./pages/LoginPage";
import {AuthState,logout,update} from "../store/auth"
import { Store } from "../store";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function App() {
  const [signedIn, setSignedIn] = useState(false)

  const auth = useSelector<Store,AuthState>(state=>state.auth)
  const dispatch = useDispatch()

  return auth.authenticated ? (

     <div >asdf</div>

   ) : <LoginPage onSignIn={(user)=>dispatch(update({email:'asdf',name:'asdf',picture:'asdf',token:'asdf',uid:'asdf'}))}/>
}

export default App;
