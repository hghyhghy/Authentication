import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Blog } from './blogs/blog.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  const blogRepository = dataSource.getRepository(Blog);

  // Check if blogs already exist
  const blogCount = await blogRepository.count();
  if (blogCount === 0) {
    // Insert sample blogs
    await blogRepository.save([
      { title: 'How to Learn TypeScript', content: 'TypeScript is a strongly typed superset of JavaScript...' },
      { title: 'NestJS vs Express.js', content: 'NestJS provides a structured framework, whereas Express is minimalistic...' },
      { title: '10 Tips for Better React Performance', content: 'Optimizing React apps involves memoization, lazy loading, and more...' },
    ]);
    console.log('Sample blogs added to database.');
  }

  app.enableCors(); // Allow frontend to make API requests
  await app.listen(3001);
}
bootstrap();
