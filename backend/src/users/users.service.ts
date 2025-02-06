
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(username: string, email: string, password: string) {
    try {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create a new user entity
      const user = this.usersRepository.create({ username, email, password:hashedPassword});
      
      // Save the user to the database
      return await this.usersRepository.save(user);
    } catch (error) {
      // Handle error (you could throw an error or return a message depending on your needs)
      throw new Error('Error creating user: ' + error.message);
    }
  }

  // Find a user by their username
  async findByUsername(username: string) {
    try {
      return await this.usersRepository.findOne({ where: { username } });
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
}
