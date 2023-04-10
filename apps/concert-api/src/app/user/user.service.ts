import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Identity } from '../auth/identity.schema';
import { Ticket, TicketDocument } from '../ticket/ticket.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel(Identity.name) private identityModel: Model<Identity>
    ) { }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserInfo(userId: string): Promise<User> {
        return this.userModel
            .findOne({ id: userId })
    }

    async editUserById(id: string, user: User): Promise<User> {
        return this.userModel.findOneAndUpdate({ id: id }, user, {
            new: true,
            runValidators: true,
        });
    }

    async getUserById(userId: string): Promise<User> {
        const user = this.userModel
            .findOne({ id: userId })
        if (user == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async deleteIdentityByIdAndUserById(
        id: string,
    ): Promise<User> {
        let toBeDeletedIdentity = await this.identityModel.findOneAndDelete({
            id: id,
        });

        console.log(id);

        if (toBeDeletedIdentity == null)
            throw new HttpException(
                'Identity not found ',
                HttpStatus.NOT_FOUND,
            );

        let toBeDeletedUser = await this.userModel.findOneAndDelete({ id: id });

        if (toBeDeletedUser == null)
            throw new HttpException('User not found ', HttpStatus.NOT_FOUND);

        return toBeDeletedUser;
    }

}
