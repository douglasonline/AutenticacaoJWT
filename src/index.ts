import Express from "express";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from './middlewares/error'
import routes from "./routes"
import path from "path";

AppDataSource.initialize().then(() => {

    const app = Express()

    app.use(Express.json())

    // Configure o Express para usar EJS
    app.set( "views", path.join( __dirname, "views" ) );
    app.set( "view engine", "ejs" );
    app.use(Express.urlencoded({ extended: true }));

    app.use(routes)

    app.use(errorMiddleware)


    return app.listen(process.env.PORT)

})






