import { Request, Response } from "express"
import { categoryRepository } from "../repositories/categoryRepository"
import { filmsRepository } from "../repositories/filmsRepository"

export class FilmsController{

    async createFilms(req: Request, res: Response){

        const {name, description, duration, Category} = req.body

        const id = Category.id;

        const idExists = await categoryRepository.findOneBy({id})

        const nameExistsFilms = await filmsRepository.findOneBy({name})

        if(!idExists){

            return res.status(400).send('A categoria não existe');

        }

        else if(nameExistsFilms){

            return res.status(400).send('O Filme já existe');

        }
        
        const newFilms = filmsRepository.create({
            name, 
            description,
            duration,
            Category
        })

        await filmsRepository.save(newFilms)

        return res.status(201).json(newFilms)

    }


    async getAllFilms(req: Request, res: Response){

        const Films = await filmsRepository.find();

        return res.json(Films)    


    }

    async getAllFilmsCategory(req: Request, res: Response){

        const Films = await filmsRepository.find({

            relations: ["Category"]

        });

        return res.json(Films)    


    }


    async updateFilms(req: Request, res: Response){

        const {idString} = req.params

        const id = parseInt(idString)

        const {name, description, duration, Category} = req.body

        const Films = await filmsRepository.findOneBy({id})

        if(!Films){

            return res.status(400).send('O Filme não existe');

        }

        else{


            Films.name         = name ? name : Films.name;
            Films.description  = description ? description : Films.description;
            Films.duration     = duration ? duration : Films.duration;
            Films.Category     = Category ? Category : Films.Category;

            await filmsRepository.save(Films);
            
            return res.status(201).json(Films)


        }

    }


    async deleteFilms(req: Request, res: Response){

        const {idString} = req.params

        const id = parseInt(idString)

        const idExists = await filmsRepository.findOneBy({id})

        if(!idExists){

            return res.status(400).send('O Filme não existe');

        }

        const idExcluded = await filmsRepository.delete({id});

        if(idExcluded){

            return res.status(200).json({
              status: 'sucesso',
              message: `Filme excluída com sucesso ID ${id}`
            })

        }  


    }

}