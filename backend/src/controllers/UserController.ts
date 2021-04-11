import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import {hash} from 'bcryptjs'

class UserController{

  async create(req,res){
    const {name, email,password} = req.body
    
    const userRepository = await getCustomRepository(UserRepository)

    //Check if User exists
    const checkUser = await userRepository.findByEmail(email)
    if(checkUser){
      return res.status(400).json({
        error: 'User already registered'
      })
    }

    //HASHED PASSWORD
    const hashedPassword = await hash(password,8)

    try{
      //Create new User
      const newUser = userRepository.create({
        name,
        email,
        password:hashedPassword
      })
      delete newUser.password
  
      //Save User to db
      await userRepository.save(newUser)
  
      return res.status(201).json(newUser)
    }
    catch(err){
      return res.status(400).json({error:err})
     
    }
 
  }
}

export {UserController}