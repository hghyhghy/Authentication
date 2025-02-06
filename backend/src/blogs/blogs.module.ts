import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])], // Register Blog entity with TypeORM
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService], // Exporting in case other modules need it
})
export class BlogsModule {}
