import { UserStatusDTO } from './../user/dto/user-status.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
declare module 'express' {
    interface Request {
        user: UserStatusDTO;
    }
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: Request): Promise<{
        token: any;
        expires: string;
        userInfo: UserStatusDTO;
    }>;
}
