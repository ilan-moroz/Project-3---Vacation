import express, { NextFunction, Request, Response } from 'express'

const loginRouter = express.Router()

// TEST ROUTE
loginRouter.get(
  '/',
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json('Controller working !!!')
  },
)

export default loginRouter
