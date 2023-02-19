import express, { Router } from "express";
import {routes} from '@radzoft/core'
import generateCode from "./generateCode";
import verifyCode from "./verifyCode";

const router = Router()

router.use(express.json())

router.post(`${routes.AUTH_GENERATE}`, generateCode)

router.post(`${routes.AUTH_VERIFY}`,verifyCode)

export default router;
