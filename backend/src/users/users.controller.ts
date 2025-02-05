import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Response } from 'express'; // Ensure this import is correct

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() body, @Res() res: Response) {
    try {
      // Call user creation service
      await this.usersService.create(body.username, body.email, body.password);

      // Send success response with status 200
      return res.status(200).json({ message: 'Signup successful' });
    } catch (error) {
      // Send error response with status 400
      return res.status(400).json({ message: 'Signup failed. Try again.' });
    }
  }

  @Post('login')
  async login(@Body() body, @Res() res: Response) {
    try {
      const isValid = await this.authService.validateUser(body.username, body.password);

      if (isValid) {
        return res.status(200).json({ message: 'Login successful' }); // Successfully logged in
      } else {
        return res.status(400).json({ message: 'Invalid credentials' }); // Invalid credentials
      }
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred. Try again.' });
    }
  }
}
