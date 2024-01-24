"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;
        const userExists = await userRepository_1.userRepository.findOneBy({ email });
        if (userExists) {
            //throw new BadRequestError('Email já existe')
            return res.status(400).send('E-mail já existe');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = userRepository_1.userRepository.create({
            name,
            email,
            password: hashPassword
        });
        await userRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json(user);
    }
    async createPage(req, res) {
        const { name, email, password } = req.body;
        //console.log(req.body)
        const userExists = await userRepository_1.userRepository.findOneBy({ email });
        if (userExists) {
            var addUser = JSON.parse(`[{
                "color": "red",
                "adduser": "true",
                "message": "E-mail já existe"
            }]`);
            return res.render(process.cwd() + "/public/views/pagina_principal/index", { user: "", addUser: addUser });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = userRepository_1.userRepository.create({
            name,
            email,
            password: hashPassword
        });
        await userRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        var addUser = JSON.parse(`[{
            "color": "green",
            "adduser": "true",
            "message": "Usuário cadastrado com sucesso!!!"
        }]`);
        return res.render(process.cwd() + "/public/views/pagina_principal/index", { user: "", addUser: addUser });
    }
    async getProfile(req, res) {
        return res.json(req.user);
    }
    async getAllUser(req, res) {
        const user = await userRepository_1.userRepository.find();
        return res.json(user);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map