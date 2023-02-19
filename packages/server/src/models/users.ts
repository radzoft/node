import { UserRecord } from 'firebase-admin/auth';
import { auth, app } from '../lib/firebase'
import { getFirestore } from 'firebase-admin/firestore'

const db = getFirestore(app);

export const initializeUser = async (user:UserRecord,data:FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>)=>{
  return db.doc(`users/${user.uid}`).create(data)
}

export const setUserData = async(uid:string,data:FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>)=>{
  return db.doc(`users/${uid}`).set(data,{merge:true})
}

export const getOrCreateUser = async (email:string)=>{
   try {
    return auth.getUserByEmail(email)
    .catch(async e=>{
      if(e.errorInfo?.code!=='auth/user-not-found') {
        return Promise.reject(e);
      }
      return await auth.createUser({email,displayName:email.split('@')[0]})
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    return Promise.reject(error)
  }
}

export interface LoginInfo {
  code:string
  created:number
  sent:number
  attempts:number
  verified:boolean
  lastSent:number
}

export interface UserData {
  login: LoginInfo
}

export const getUserData = async(uid:string)=>{
  try {
    const data = await db.doc(`users/${uid}`).get();
    if(data.exists) return data.data() as UserData ?? null;
    return null; 
  } catch (error) {
    console.log(error)
  } 
  return null;
}

const generateCode = ()=>{
  let code = Math.ceil(Math.random()*7777777)
  while(code<1111111) code = Math.ceil(Math.random()*7777777)
  const i = Math.floor(Math.random()*7);
  const acode = code.toString(10).split("")
  acode.splice(i,1,'7');
  return acode.join('')
}

export const getLoginInfo = async(uid:string,forceRegenerate=false):Promise<LoginInfo>=>{
  const login:LoginInfo = (await getUserData(uid))?.login ?? {
    code:generateCode(),
    created: Date.now(),
    sent: 0,
    attempts:0,
    verified: false,
    lastSent: 0
  }

  if(forceRegenerate || login.verified || Date.now() - login.created > 4777777) {
    login.code = generateCode()
    login.created = Date.now()
    login.sent=0
    login.attempts=0
    login.verified=false
  }
  return login
}
