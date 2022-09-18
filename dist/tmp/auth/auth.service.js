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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("@user/user.service");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(loginUserDto) {
        const username = loginUserDto.username;
        const password = loginUserDto.password;
        if (_.isEmpty(username) || _.isEmpty(password)) {
            throw new common_1.BadRequestException('user is required!');
        }
        const user = await this.userService.findLoginUser(username);
        if (_.isEmpty(user)) {
            throw new common_1.BadRequestException('user not found!');
        }
        const isValidPwd = await bcrypt.compare(password, user.password);
        if (!isValidPwd) {
            throw new common_1.BadRequestException('password is not valid!');
        }
        const sanitizedUser = {
            id: user.id,
            username: user.username,
            memo_count: user.memo_count,
            day_count: user.day_count,
            tag_count: user.tag_count,
            month_sign_id: user.month_sign_id,
            last_login: user.last_login,
        };
        return sanitizedUser;
    }
    async login(userInfo) {
        const token = this.createToken(userInfo);
        return Object.assign({ userInfo }, token);
    }
    createToken({ username, id: userId }) {
        const token = this.jwtService.sign({ username, userId });
        const expires = process.env.expiresTime;
        return {
            token,
            expires,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map