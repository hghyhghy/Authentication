import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Validate user during login by comparing passwords
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      return false; // User not found
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    return isPasswordValid;
  }
}
