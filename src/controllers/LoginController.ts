import { Request, Response } from "express"
import { userRepository } from "../repositories/userRepository"
import { BadRequestError } from "../helpers/api-erros"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setRedis } from "../redisConfig"

export class LoginController{

    async login(req: Request, res: Response){

          const { email, password } = req.body

          const user = await userRepository.findOneBy({email})

          if(!user){

            return res.status(400).send('E-mail ou senha inválidos');

           }

           else{

            const verifyPass = await  bcrypt.compare(password, user.password)

            if(!verifyPass){

             
                return res.status(400).send('E-mail ou senha inválidos');

            }
 
            const token = jwt.sign({ id: user.id}, process.env.JWT_PASS ?? '', {expiresIn: '8h'})

            const {password: _, ...userLogin} = user

            // user-${idUser} 
            await setRedis(`user-${user.id}`, JSON.stringify(user))

            return res.json({

                user: userLogin,
                token: token,

            })


           }

    }



}