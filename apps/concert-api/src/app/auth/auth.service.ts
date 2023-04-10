import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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

    async createUser(
        identityId: string,
        name: string,
        email: string,
        city: string,
        birthday: Date,
    ): Promise<string> {

        const user = new this.userModel({
            id: identityId,
            name,
            email,
            city,
            birthday,
        });

        console.log(user);

        await user.save().catch((err) => {
            if (err.code == 11000) {
                throw new HttpException(
                    'Email `' + email + '` already exists',
                    HttpStatus.BAD_REQUEST,
                );
            }
        });

        return user.id;
    }

    async registerUser(email: string, password: string) {
        const generatedHash = await this.hashPassword(password);


        const identity = new this.identityModel({
            email,
            password: generatedHash,
        });


        return await identity.save().catch((err) => {
            if (err.code == 11000) {
                throw new HttpException(
                    'Email `' + email + '` already exists',
                    HttpStatus.BAD_REQUEST,
                );
            }
        });
    }

    async deleteIdentity(id: string) {
        const identity = await this.identityModel.findOne({ _id: id });
        if (identity != null) {
            return await identity.remove();
        }
    }

    async hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            hash(
                password,
                parseInt(process.env.SALT_ROUNDS, 10),
                (err, hash) => {
                    if (err) reject(err);
                    else resolve(hash);
                },
            );
        });
    }


    async generateToken(email: string, password: string): Promise<string> {
        const identity = await this.identityModel.findOne({ email });
        if (!identity || !(await compare(password, identity.password))) {
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