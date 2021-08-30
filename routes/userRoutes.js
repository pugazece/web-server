import { Router } from 'express'

import { register, login, logout } from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.delete('/logout', logout)

export default userRouter
