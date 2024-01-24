"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
class CategoryController {
    async createCategory(req, res) {
        const { name, description } = req.body;
        const nameExists = await categoryRepository_1.categoryRepository.findOneBy({ name });
        if (nameExists) {
            return res.status(400).send('A categoria já existe');
        }
        const newcategory = categoryRepository_1.categoryRepository.create({
            name,
            description
        });
        await categoryRepository_1.categoryRepository.save(newcategory);
        return res.status(201).json(newcategory);
    }
    async getAllCategory(req, res) {
        const Category = await categoryRepository_1.categoryRepository.find();
        return res.json(Category);
    }
    async updateCategory(req, res) {
        const { idString } = req.params;
        const id = parseInt(idString);
        const { name, description } = req.body;
        const category = await categoryRepository_1.categoryRepository.findOneBy({ id });
        if (!category) {
            return res.status(400).send('A categoria não existe');
        }
        else {
            category.name = name ? name : category.name;
            category.description = description ? description : category.description;
            await categoryRepository_1.categoryRepository.save(category);
            return res.status(201).json(category);
        }
    }
    async deleteCategory(req, res) {
        const { idString } = req.params;
        const id = parseInt(idString);
        const idExists = await categoryRepository_1.categoryRepository.findOneBy({ id });
        if (!idExists) {
            return res.status(400).send('A categoria não existe');
        }
        const idExcluded = await categoryRepository_1.categoryRepository.delete({ id });
        if (idExcluded) {
            return res.status(200).json({
                status: 'sucesso',
                message: `Categoria excluída com sucesso ID ${id}`
            });
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=CategoryController.js.map