import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bycrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    // bcrypt
    private readonly saltRounds = 10;
    async hashPassword(password: string): Promise<string> {
        return await bycrypt.hash(password, this.saltRounds);
    }


    async createUser(user: CreateUserDto) {
        const hashedPassword = await this.hashPassword(user.password);

        // check user
        const existingUser = await this.userRepository.findOne({
            where: [
                { email: user.email },
                { username: user.username }
            ]
        });

        if (existingUser) {
            throw new Error('User with same email or username already exists');
        }

        const newUser: User = new User();
        newUser.email = user.email;
        newUser.username = user.username;
        newUser.password = hashedPassword;
        return await this.userRepository.save(newUser);
    }

    async findOne(emailOrUsername: string) {
        // find user by email or username
        return await this.userRepository.findOne({
            where: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });
    }

    async getUsers() {
        const users: User[] = await this.userRepository.find();
        return users;
    }

    async findById(uuid: string) {
        const user = await this.userRepository.findOne({
            where:  { uuid }
        });
        return user;
    }

    

}
