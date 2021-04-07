import express from 'express'
const routes = express.Router()

//CONTROLLERS
import {AppointmentsController} from './controllers/AppointmentsController'

const appointmentsController = new AppointmentsController()

routes.post('/new-appointment', appointmentsController.create)




export default routes