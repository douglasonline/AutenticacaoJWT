import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { BadRequestError } from "../helpers/api-erros"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { type } from "os"

type JwtPayload = {
    id: number
}

export class UserController{

    async create(req: Request, res: Response){

        const {name, email, password} = req.body

        const userExists = await userRepository.findOneBy({email})

        if(userExists){

            //throw new BadRequestError('Email já existe')
            return res.status(400).send('E-mail já existe');

        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name, 
            email,
            password: hashPassword 
        })

        await userRepository.save(newUser)

        const {password: _, ...user} = newUser

        return res.status(201).json(user)

    }

    async createPage(req: Request, res: Response){

        const {name, email, password} = req.body

        //console.log(req.body)

        const userExists = await userRepository.findOneBy({email})

        if(userExists){

            var addUser = JSON.parse(`[{
                "color": "red",
                "adduser": "true",
                "message": "E-mail já existe"
            }]`)
    
            return res.render(process.cwd() + "/public/views/pagina_principal/index", {user: "", addUser: addUser});

        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name, 
            email,
            password: hashPassword 
        })

        await userRepository.save(newUser)

        const {password: _, ...user} = newUser

        var addUser = JSON.parse(`[{
            "color": "green",
            "adduser": "true",
            "message": "Usuário cadastrado com sucesso!!!"
        }]`)

        return res.render(process.cwd() + "/public/views/pagina_principal/index", {user: "", addUser: addUser});

    }


    async getProfile(req: Request, res: Response){

        return res.json(req.user)    


    }

    async getAllUser(req: Request, res: Response){

        const user = await userRepository.find();

        return res.json(user)    


    }


}