import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from './Login.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Login)
        private userRepository: Repository<Login>,
    ) { }

    async findByEmail(email: string): Promise<Login | undefined> {
        return this.userRepository.findOne({ where: { email } });
    }

    async createUser(email: string, password: string, username: string): Promise<Login> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            username,
        });
        return this.userRepository.save(user);
    }

}
