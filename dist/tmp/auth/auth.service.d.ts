import { UserStatusDTO } from './../user/dto/user-status.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { UserService } from '@user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(loginUserDto: LoginUserDto): Promise<UserStatusDTO>;
    login(userInfo: UserStatusDTO): Promise<{
        token: any;
        expires: string;
        userInfo: UserStatusDTO;
    }>;
    createToken({ username, id: userId }: UserStatusDTO): {
        token: any;
        expires: string;
    };
}
