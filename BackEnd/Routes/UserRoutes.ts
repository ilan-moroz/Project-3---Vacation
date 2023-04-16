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

// TEST ROUTE
userRouter.get(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json('Controller working !!!')
  },
)

export default userRouter
