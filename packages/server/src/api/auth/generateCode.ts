import { Request, Response } from "express";
import { getLoginInfo, getOrCreateUser, setUserData } from "models/users";

export default async (req:Request, res:Response)=>{

  const {email} = req.body;

  if(email==null) return res.sendStatus(403);

  try {
    const user = await getOrCreateUser(email)
    const login = await getLoginInfo(user.uid)
    // await sendCode(email,login.code)
    login.lastSent=Date.now()
    login.sent++;
    await setUserData(user.uid,{login})

    res.json({success:true,created:login.created,sent:login.lastSent})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.json({success:false,error:error?.message})
  }

}