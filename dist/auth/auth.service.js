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
        const user = await this.usersService.findByEmail(userDto.email);
        if (!user) {
            throw new common_1.NotFoundException('User with this email not found');
        }
        const isMatch = await this.validatePassword(userDto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateToken(user);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            },
        };
    }
    async registration(userDto) {
        const candidate = await this.usersService.findByEmail(userDto.email);
        if (candidate) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const hashPassword = (await bcrypt.hash(userDto.password, 5));
        const user = await this.usersService.create({
            ...userDto,
            password: hashPassword,
        });
        const token = this.generateToken(user);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        };
    }
    async getMe() {
    }
    generateToken(user) {
        const payload = { email: user.email, id: user.id };
        const token = this.jwtService.sign(payload);
        return token;
    }
    async validatePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    async validateToken(token) {
        const decoded = this.jwtService.verify(token);
        const user = await this.usersService.findById(decoded.id);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map