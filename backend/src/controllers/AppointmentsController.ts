import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import {parseISO, startOfHour,} from 'date-fns'

class AppointmentsController{

  async create(req:Request, res:Response){
    //Accessing the methods to save and edit in DB
    const appointmentsRepository = await getCustomRepository(AppointmentsRepository)

    const {provider, date} = req.body

    const parsedDate = parseISO(date)
    const appointmentHour = startOfHour(parsedDate)
   
    try{
      const checkHour = await appointmentsRepository.findByDate(appointmentHour)
      if(checkHour){
        return res.status(400).json({
         error:"Hour already booked."
        })
      }
     const newAppointment = appointmentsRepository.create({
       provider,
       date:appointmentHour
     })
  
      //Saving to DB
      await appointmentsRepository.save(newAppointment)
      return res.status(201).json(newAppointment)
    }
    catch(err){
      console.log(err)
    }
   
  }

}

export {AppointmentsController}