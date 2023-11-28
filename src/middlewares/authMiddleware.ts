import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-erros'
import { userRepository } from '../repositories/userRepository'
import jwt from 'jsonwebtoken'
import { getRedis } from '../redisConfig'

type JwtPayload = {
	id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	
	const { authorization } = req.headers

    if(!authorization){

        return res.status(401).send('Não autorizado');

    }

    const token = authorization.split(' ')[1]


    try {
            

    const { id } = jwt.verify(token,  process.env.JWT_PASS ?? '') as JwtPayload

    const userRedis = await getRedis(`user-${id}`)
    const userOfRedis = JSON.parse(userRedis ? userRedis : "");

    if(userOfRedis){

    if(!userOfRedis.id){

        return res.status(401).send('Não autorizado');
    
    }
    
    const {password: _, ...loggedUser} = userOfRedis
    
    req.user = loggedUser


    }

    else{


    const user = await userRepository.findOneBy({ id })

    if(!user){

        return res.status(401).send('Não autorizado');

    }

    const {password: _, ...loggedUser} = user

	req.user = loggedUser


    }

    next()

    } catch (err) {

        res.status(400).send('Token inválido !');

    }


}
