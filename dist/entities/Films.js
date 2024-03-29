"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Films = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
let Films = class Films {
};
exports.Films = Films;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Films.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', unique: true }),
    __metadata("design:type", String)
], Films.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Films.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Category_1.Category, { onDelete: "CASCADE", cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Category_1.Category)
], Films.prototype, "Category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric" }),
    __metadata("design:type", Number)
], Films.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "now()" }),
    __metadata("design:type", typeorm_1.Timestamp)
], Films.prototype, "created_at", void 0);
exports.Films = Films = __decorate([
    (0, typeorm_1.Entity)('films')
], Films);
//# sourceMappingURL=Films.js.map