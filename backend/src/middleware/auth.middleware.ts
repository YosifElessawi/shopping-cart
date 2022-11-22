import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const unauthorizedUser = (next: NextFunction) => {
  const error: Error = new Error('Unauthorized User')
  next(error)
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string
    const token = authorizationHeader.split(' ')[1]
    if (jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)) {
      next()
    } else {
      unauthorizedUser(next)
    }
  } catch (error) {
    res.status(401)
  }
}
export default verifyAuthToken
