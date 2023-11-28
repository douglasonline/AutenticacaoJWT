import { Request, Response } from "express"
import util = require("util");
import fs = require("fs");
import ejs = require("ejs");
import { UserController } from "./UserController";
import { userRepository } from "../repositories/userRepository";

export class PagesController{

    async PageHome(req: Request, res: Response){


        /*var obj = JSON.parse(`[{
            "name": "maria",
            "email": "maria@gmail.com"
        }]`)*/


         const user = await userRepository.find();

         //console.log(user);

        return res.render(process.cwd() + "/public/views/pagina_principal/index", {user: user, addUser: ""});


    }

    async PageAddUser(req: Request, res: Response){


        var addUser = JSON.parse(`[{
            "adduser": "true"
        }]`)

        //console.log(addUser)

        return res.render(process.cwd() + "/public/views/pagina_principal/index", {user: "", addUser: addUser});


    }

}

















/*async PageHome(req: Request, res: Response){

    //promisify
    const mkdir = util.promisify(fs.mkdir);
    const readFile = util.promisify(fs.readFile);
    const writeFile = util.promisify(fs.writeFile);

    const pageModel = {
        content: "<p>This is some sample content. Located on the sample page.</p>",
      };

    try {

        //criar diretório de saída
        await mkdir("./public/views/pagina_principal", { recursive: true });
    
        //renderizar modelo ejs para string html
        const html = await ejs
          .renderFile("./public/views/pagina_principal/index.ejs", { model: pageModel })
          .then((output) => output);

        //crie arquivo e escreva html
        await writeFile("./public/views/pagina_principal/index.html", html, "utf8");

        return res.status(200).send(html);

      } 
      
      catch (error) {

        console.log(error);


      } 


}  */