import { Router } from "express";
import auth from './auth'
import {routes} from '@radzoft/core'

const router = Router()

router.use(routes.AUTH,auth)


export default router;
