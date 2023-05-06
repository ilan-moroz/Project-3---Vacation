import express, { NextFunction, Request, Response } from 'express'
import logic from '../Logic/usersLogicMYSQL'

const userRouter = express.Router()

// ADD NEW USER
userRouter.post(
  '/newUser',
  async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body
    console.log(newUser)
    response.status(201).json(await logic.addUser(newUser))
  },
)

// CHECK IF EMAIL EXISTS IN DATABASE FOR REGISTER
userRouter.post(
  '/checkEmail',
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email
    console.log(email)
    response.status(200).json(await logic.checkEmail(email))
  }
)

// CHECK IF EMAIL AND PASSWORD EXISTS IN DATABASE FOR LOGIN
userRouter.post(
  '/checkUser',
  async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email
    const password = request.body.password
    response.status(200).json(await logic.checkUser(email,password))
  })

// TEST ROUTE
userRouter.get(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json('Controller working !!!')
  },
)

export default userRouter
