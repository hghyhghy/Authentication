import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: 'subham0902003', signOptions: { expiresIn: '1h' } })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
