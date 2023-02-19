import { Request, Response } from "express";
import { z } from "zod";
import { auth } from "lib/firebase";
import { getUserData } from "models/users";

export default async (req:Request, res:Response)=>{
  const ParamSchema = z.object({
    code: z.string().length(7),
    email: z.string().email()
  }).required().strict()
  const param = ParamSchema.safeParse(req.body)
  if(!param.success) return res.json({success:false,error:'Invalid access code!'});

  const {code,email} = param.data;

  if(code==null) return res.sendStatus(403);

  try {
    const user = await auth.getUserByEmail(email)
    const data = await getUserData(user.uid)
    
    if(!data || data.login?.code!==code) 
      return res.json({success:false,error:'Invalid access code!'})

    const token = await auth.createCustomToken(user.uid)

    res.json({success:true,token})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.json({success:false,error:error?.message})
  }
}