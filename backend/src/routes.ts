import express from 'express'
const routes = express.Router()

//CONTROLLERS
import {AppointmentsController} from './controllers/AppointmentsController'
import {UserController} from './controllers/UserController'
import {SessionController} from './controllers/SessionController'

const appointmentsController = new AppointmentsController()
const userController = new UserController()
const sessionController = new SessionController()

//MIDDLEWARES
import ensureAuthentication from './middlewares/ensureAuthenticated'


//-------APPOINTMENTS------
routes.post('/new-appointment',ensureAuthentication, appointmentsController.create)
routes.get('/appointments',ensureAuthentication, appointmentsController.index)

//-------USER------//
routes.post('/new-user', userController.create)

//-----SESSION-------//
routes.post('/login', sessionController.session)

export default routes