"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmsRepository = void 0;
const data_source_1 = require("../data-source");
const Films_1 = require("../entities/Films");
exports.filmsRepository = data_source_1.AppDataSource.getRepository(Films_1.Films);
//# sourceMappingURL=filmsRepository.js.map