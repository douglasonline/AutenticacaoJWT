import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { authMiddleware } from './middlewares/authMiddleware'
import { CategoryController } from './controllers/CategoryController'
import { FilmsController } from './controllers/FilmsController'
import { PagesController } from './controllers/PagesController'

const routes = Router()

routes.get('/', new PagesController().PageHome)

routes.get('/adduser', new PagesController().PageAddUser)

routes.post('/user', new UserController().create)

routes.post('/userPage', new UserController().createPage)

routes.get('/user', new UserController().getAllUser)

routes.post('/login', new LoginController().login)

routes.use(authMiddleware)

routes.get('/profile',  new UserController().getProfile)

/**
 *  C - CREATE - POST
 *  R - READ   - GET
 *  U - UPDATE - PUT
 *  D - DELETE - DELETE
 */

routes.post('/category', new CategoryController().createCategory)  

routes.get('/category', new CategoryController().getAllCategory)

routes.put('/category/:idString', new CategoryController().updateCategory)

routes.delete('/category/:idString', new CategoryController().deleteCategory)

//----------------------------------------------------------------------------------------

routes.post('/films', new FilmsController().createFilms) 

routes.get('/films', new FilmsController().getAllFilms)

routes.get('/filmsCategory', new FilmsController().getAllFilmsCategory)

routes.put('/films/:idString', new FilmsController().updateFilms)

routes.delete('/films/:idString', new FilmsController().deleteFilms)

export default routes