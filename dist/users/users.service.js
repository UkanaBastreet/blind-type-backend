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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const role_enum_type_1 = require("./types/role-enum.type");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }
    async findAll() {
        const res = await this.usersRepository.find({
            select: {
                id: true,
                email: true,
                games: true,
            },
        });
        return res;
    }
    async findById(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.preload({
            id,
            ...updateUserDto,
            role: role_enum_type_1.RoleEnum.USER,
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return this.usersRepository.save(user);
    }
    async remove(id) {
        const userExists = await this.usersRepository.findOneBy({ id });
        if (!userExists) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const user = await this.usersRepository.delete({ id });
        return user;
    }
    async getShortById(id) {
        const user = await this.findById(id);
        return {
            id: user.id,
            username: user.username,
            email: user.email,
        };
    }
    async findByEmail(email) {
        const user = await this.usersRepository.findOneBy({ email });
        return user;
    }
    async checkEmailExists(email) {
        return await this.usersRepository.exists({ where: { email } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map