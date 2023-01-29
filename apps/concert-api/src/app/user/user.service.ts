import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Identity } from '../auth/identity.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel(Identity.name) private identityModel: Model<Identity>,
    ) { }

    async getUserInfo(userId: string): Promise<User> {
        return this.userModel
            .findOne({ id: userId })
    }
}
