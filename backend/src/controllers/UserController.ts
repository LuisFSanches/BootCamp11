import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

class UserController{

  async create(req,res){
    const {name, email} = req.body
    
    const userRepository = await getCustomRepository(UserRepository)

    //Check if User exists
    const checkUser = await userRepository.findByEmail(email)
    if(checkUser){
      return res.status(400).json({
        error: 'User already registered'
      })
    }

    //Create new User
    const newUser = userRepository.create({
      name,
      email
    })

    //Save User to db
    await userRepository.save(newUser)

    return res.status(201).json(newUser)
  }
}

export {UserController}