import express from 'express'
const routes = express.Router()

//CONTROLLERS
import {AppointmentsController} from './controllers/AppointmentsController'
import {UserController} from './controllers/UserController'


const appointmentsController = new AppointmentsController()
const userController = new UserController()

//-------APPOINTMENTS------
routes.post('/new-appointment', appointmentsController.create)
routes.get('/appointments', appointmentsController.index)

//-------USER------
routes.post('/new-user', userController.create)

export default routes