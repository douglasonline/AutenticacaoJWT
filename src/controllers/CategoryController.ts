import { Request, Response } from "express"
import { categoryRepository } from "../repositories/categoryRepository"

export class CategoryController{

    async createCategory(req: Request, res: Response){

        const {name, description} = req.body

        const nameExists = await categoryRepository.findOneBy({name})

        if(nameExists){

            return res.status(400).send('A categoria já existe');

        }
        
        const newcategory = categoryRepository.create({
            name, 
            description
        })

        await categoryRepository.save(newcategory)

        return res.status(201).json(newcategory)

    }


    async getAllCategory(req: Request, res: Response){

        const Category = await categoryRepository.find();

        return res.json(Category)    


    }


    async updateCategory(req: Request, res: Response){

        const {idString} = req.params

        const id = parseInt(idString)

        const {name, description} = req.body

        const category = await categoryRepository.findOneBy({id})

        if(!category){

            return res.status(400).send('A categoria não existe');

        }

        else{


            category.name = name ? name : category.name;
            category.description = description ? description : category.description;

            await categoryRepository.save(category);
            
            return res.status(201).json(category)


        }

    }


    async deleteCategory(req: Request, res: Response){

        const {idString} = req.params

        const id = parseInt(idString)

        const idExists = await categoryRepository.findOneBy({id})

        if(!idExists){

            return res.status(400).send('A categoria não existe');

        }

        const idExcluded = await categoryRepository.delete({id});

        if(idExcluded){

            return res.status(200).json({
              status: 'sucesso',
              message: `Categoria excluída com sucesso ID ${id}`
            })

        }  


    }

}