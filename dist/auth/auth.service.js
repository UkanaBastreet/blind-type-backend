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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(userDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }
    async registration(req, userDto) {
        const candidate = await this.usersService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('User with this email is already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = (await bcrypt.hash(userDto.password, 5));
        const user = await this.usersService
            .create({
            ...userDto,
            password: hashPassword,
        })
            .then((res) => res.raw);
        return this.saveSession(req, user);
    }
    generateToken(user) {
        const payload = { email: user.email, id: user.id };
        const token = this.jwtService.sign(payload);
        return JSON.stringify({
            token,
        });
    }
    async validateUser(userDto) {
        const user = await this.usersService.getUserByEmail(userDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User with that email is not found');
        }
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new common_1.UnauthorizedException({
            message: 'Invalid email or password',
        });
    }
    async saveSession(req, user) {
        return new Promise((res, rej) => {
            req.session.userId = user.id;
            req.session.save((err) => {
                if (err) {
                    rej(err);
                }
                res(user);
            });
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map