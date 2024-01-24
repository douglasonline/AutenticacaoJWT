"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmsController = void 0;
const categoryRepository_1 = require("../repositories/categoryRepository");
const filmsRepository_1 = require("../repositories/filmsRepository");
class FilmsController {
    async createFilms(req, res) {
        const { name, description, duration, Category } = req.body;
        const id = Category.id;
        const idExists = await categoryRepository_1.categoryRepository.findOneBy({ id });
        const nameExistsFilms = await filmsRepository_1.filmsRepository.findOneBy({ name });
        if (!idExists) {
            return res.status(400).send('A categoria não existe');
        }
        else if (nameExistsFilms) {
            return res.status(400).send('O Filme já existe');
        }
        const newFilms = filmsRepository_1.filmsRepository.create({
            name,
            description,
            duration,
            Category
        });
        await filmsRepository_1.filmsRepository.save(newFilms);
        return res.status(201).json(newFilms);
    }
    async getAllFilms(req, res) {
        const Films = await filmsRepository_1.filmsRepository.find();
        return res.json(Films);
    }
    async getAllFilmsCategory(req, res) {
        const Films = await filmsRepository_1.filmsRepository.find({
            relations: ["Category"]
        });
        return res.json(Films);
    }
    async updateFilms(req, res) {
        const { idString } = req.params;
        const id = parseInt(idString);
        const { name, description, duration, Category } = req.body;
        const Films = await filmsRepository_1.filmsRepository.findOneBy({ id });
        if (!Films) {
            return res.status(400).send('O Filme não existe');
        }
        else {
            Films.name = name ? name : Films.name;
            Films.description = description ? description : Films.description;
            Films.duration = duration ? duration : Films.duration;
            Films.Category = Category ? Category : Films.Category;
            await filmsRepository_1.filmsRepository.save(Films);
            return res.status(201).json(Films);
        }
    }
    async deleteFilms(req, res) {
        const { idString } = req.params;
        const id = parseInt(idString);
        const idExists = await filmsRepository_1.filmsRepository.findOneBy({ id });
        if (!idExists) {
            return res.status(400).send('O Filme não existe');
        }
        const idExcluded = await filmsRepository_1.filmsRepository.delete({ id });
        if (idExcluded) {
            return res.status(200).json({
                status: 'sucesso',
                message: `Filme excluída com sucesso ID ${id}`
            });
        }
    }
}
exports.FilmsController = FilmsController;
//# sourceMappingURL=FilmsController.js.map