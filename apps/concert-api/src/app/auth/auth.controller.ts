import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ResourceId, TokenString, UserCredentials, UserRegistration } from "./auth.model";
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

    @Post('register')
    async register(@Body() user: UserRegistration): Promise<ResourceId> {
        console.log("register");
        let identityUser = null;
        try {
            identityUser = await this.authService.registerUser(user.email, user.password);
            return {
                id: await this.authService.createUser(
                    identityUser.id,
                    user.name,
                    user.email,
                    user.city,
                    user.birthday,
                ),
            };

        } catch (e) {
            console.log(e);

            if (identityUser != null) {
                await this.authService.deleteIdentity(identityUser.id);
            }

            if (e.message == 'Email is already in use') {
                throw new HttpException(
                    'Email is already in use',
                    HttpStatus.BAD_REQUEST,
                );
            }

            throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
        }
    }



}