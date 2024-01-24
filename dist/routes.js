"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const LoginController_1 = require("./controllers/LoginController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const CategoryController_1 = require("./controllers/CategoryController");
const FilmsController_1 = require("./controllers/FilmsController");
const PagesController_1 = require("./controllers/PagesController");
const routes = (0, express_1.Router)();
routes.get('/', new PagesController_1.PagesController().PageHome);
routes.get('/adduser', new PagesController_1.PagesController().PageAddUser);
routes.post('/user', new UserController_1.UserController().create);
routes.post('/userPage', new UserController_1.UserController().createPage);
routes.get('/user', new UserController_1.UserController().getAllUser);
routes.post('/login', new LoginController_1.LoginController().login);
routes.use(authMiddleware_1.authMiddleware);
routes.get('/profile', new UserController_1.UserController().getProfile);
/**
 *  C - CREATE - POST
 *  R - READ   - GET
 *  U - UPDATE - PUT
 *  D - DELETE - DELETE
 */
routes.post('/category', new CategoryController_1.CategoryController().createCategory);
routes.get('/category', new CategoryController_1.CategoryController().getAllCategory);
routes.put('/category/:idString', new CategoryController_1.CategoryController().updateCategory);
routes.delete('/category/:idString', new CategoryController_1.CategoryController().deleteCategory);
//----------------------------------------------------------------------------------------
routes.post('/films', new FilmsController_1.FilmsController().createFilms);
routes.get('/films', new FilmsController_1.FilmsController().getAllFilms);
routes.get('/filmsCategory', new FilmsController_1.FilmsController().getAllFilmsCategory);
routes.put('/films/:idString', new FilmsController_1.FilmsController().updateFilms);
routes.delete('/films/:idString', new FilmsController_1.FilmsController().deleteFilms);
exports.default = routes;
//# sourceMappingURL=routes.js.map