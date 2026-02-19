import express from "express"
import { AuthenticationController } from "./authentication-controller"

const router = express.Router()

router.post("/signup", AuthenticationController.signUp)
router.post("/login", AuthenticationController.login)

export default router