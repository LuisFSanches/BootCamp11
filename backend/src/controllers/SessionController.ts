import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository'
import {sign} from 'jsonwebtoken'
import authConfig from '../config/auth'

class SessionController{
  async session(req:Request,res:Response){
    const {email,password} = req.body

    const userRepository =getCustomRepository(UserRepository)

    //VERYFING USER
    const checkUser = await userRepository.findByEmail(email)

    if(!checkUser){
      res.status(400).json({message:'Email or password incorrect'})
    }

    const passwordMatched = await compare(password, checkUser.password)
    if(!passwordMatched){
      res.status(400).json({message:'Email or password incorrect'})
    }
    delete checkUser.password

    const {secret, expiresIn} = authConfig.jwt

    const token = sign({},secret,{
      subject:checkUser.id,
      expiresIn:expiresIn
    })
    return res.json({checkUser, token})
  }
}
export {SessionController}