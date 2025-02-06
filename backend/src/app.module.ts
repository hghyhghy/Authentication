import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module'; // Import the BlogsModule
import { Blog } from './blogs/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'subham0902003@#',
      database: 'testdb',
      entities: [User,Blog], // If Blog entity isn't included globally, it should be inside BlogsModule
      synchronize: true,
    }),
    UsersModule,
    BlogsModule, // Add BlogsModule here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
