import nodemailer from 'nodemailer'

export const sendCode = async (email:string, code:string)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.SMTP_FROM, 
    to: email,
    subject: `Access Code: ${code}`,
    text: `Your access code to Radzoft PMS: ${code}`,
    html: `Your access code to Radzoft PMS:<br/><h1 style="font-family:monospace;font-weight:900;font-size:27pt;letter-spacing:0.4em;">${code}</h1>`,
  })
}

export const generateCode = ()=>{
  let code = Math.ceil(Math.random()*7777777)
  while(code<1111111) code = Math.ceil(Math.random()*7777777)
  const i = Math.floor(Math.random()*7);
  const acode = code.toString(10).split("")
  acode.splice(i,1,'7');
  return acode.join('')
}
