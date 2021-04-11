import { Request, Response,NextFunction } from 'express';
import {verify} from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayload{
  iat:number,
  exp:number,
  sub:string
}

export default function ensureAuthentication(req:Request,res:Response,next:NextFunction):void{
  const authHeader = req.headers.authorization

  if(!authHeader){
    res.status(400).json('JWT is missing')
  }
  const token = authHeader.split(' ')

  try{
    const decoded = verify(token[1],authConfig.jwt.secret)
    const {sub} = decoded as TokenPayload
    
    req.user = {
      id:sub
    }
    return next()
  }

  catch{
    throw new Error('Invalid JWT Token')
  }

}