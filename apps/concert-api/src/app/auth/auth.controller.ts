import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { TokenString, UserCredentials } from "./auth.model";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() credentials: UserCredentials): Promise<TokenString> {
        try {
            return {
                token: await this.authService.generateToken(
                    credentials.email,
                    credentials.password,
                ),
            };
        } catch (e) {
            console.log(e);
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}