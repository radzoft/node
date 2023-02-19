import express, { Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp'
import router from 'api/router'
import cors from 'cors'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createServer = (mids:{top?:any[],bottom?:any[]})=>{
  const app = express();

  app.disable('x-powered-by')
  app.use(helmet())
  app.use(hpp())
  app.use(cors())

  if(mids.top) app.use(mids.top)

  app.use(router)

  if(mids.bottom) app.use(mids.bottom)

  // custom 404
  app.use((req:Request, res:Response) => {
    res.status(404).send("Page not found")
  })

  // custom error handler
  app.use((err:Error, req:Request, res:Response) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  return app
}

export default createServer;
