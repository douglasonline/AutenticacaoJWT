"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisConfig_1 = require("../redisConfig");
const authMiddleware = async (req, res, next) => {
    var _a;
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send('Não autorizado');
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
        const userRedis = await (0, redisConfig_1.getRedis)(`user-${id}`);
        const userOfRedis = JSON.parse(userRedis ? userRedis : "");
        if (userOfRedis) {
            if (!userOfRedis.id) {
                return res.status(401).send('Não autorizado');
            }
            const { password: _, ...loggedUser } = userOfRedis;
            req.user = loggedUser;
        }
        else {
            const user = await userRepository_1.userRepository.findOneBy({ id });
            if (!user) {
                return res.status(401).send('Não autorizado');
            }
            const { password: _, ...loggedUser } = user;
            req.user = loggedUser;
        }
        next();
    }
    catch (err) {
        res.status(400).send('Token inválido !');
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map