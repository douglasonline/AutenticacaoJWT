"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisConfig_1 = require("../redisConfig");
class LoginController {
    async login(req, res) {
        var _a;
        const { email, password } = req.body;
        const user = await userRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            return res.status(400).send('E-mail ou senha inválidos');
        }
        else {
            const verifyPass = await bcrypt_1.default.compare(password, user.password);
            if (!verifyPass) {
                return res.status(400).send('E-mail ou senha inválidos');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: '8h' });
            const { password: _, ...userLogin } = user;
            // user-${idUser} 
            await (0, redisConfig_1.setRedis)(`user-${user.id}`, JSON.stringify(user));
            return res.json({
                user: userLogin,
                token: token,
            });
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map