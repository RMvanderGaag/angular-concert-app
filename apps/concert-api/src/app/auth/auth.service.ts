import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Identity, IdentityDocument } from "./identity.schema";
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt'
import { User, UserDocument } from "../user/user.schema";
import { JwtPayload, verify, sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }


    async generateToken(email: string, password: string): Promise<string> {
        const identity = await this.identityModel.findOne({ email });
        console.log(password);
        console.log(identity.password);
        if (password !== identity.password) {
            throw new Error('user not authorized');
        }

        const user = await this.userModel.findOne({ email });

        return new Promise((resolve, reject) => {
            sign(
                { id: user.id },
                process.env.JWT_SECRET,
                (err: Error, token: string) => {
                    if (err) reject(err);
                    else resolve(token);
                },
            );
        });
    }

    async verifyToken(token: string): Promise<string | JwtPayload> {
        return new Promise((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) reject(err);
                else resolve(payload);
            });
        });
    }
}