
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import * as request from 'supertest';

@Injectable()
export class BlogsService{

    constructor (

        @InjectRepository(Blog)
        private blogsRepository:Repository<Blog>

    ){}


    findAll():Promise <Blog[]>{

        return this.blogsRepository.find()
    }

    findOne(id:number):Promise<Blog|null>{

        return  this.blogsRepository.findOne({where:{id}})
    }

    async create(title:string,content:string):Promise<Blog>{

        const newBlog = this.blogsRepository.create({title,content})
        return this.blogsRepository.save(newBlog)
    }

    async getBlogById(id:number):Promise<Blog|null>{

        return await this.blogsRepository.findOne({where:{id}})
    }

    async getPaginatedBlogs(page:number,limit:number){

        const[blogs,totalblogs] =  await this.blogsRepository.findAndCount({

            skip:(page - 1) * limit,
            take:limit,

        });

        return {

              blogs,
              totalPages:Math.ceil(totalblogs/limit),
              currentPage:page,
              totalblogs
        }
        
    }

    async deleteBlog(id:number):Promise<Boolean>{

        const result =  await this.blogsRepository.delete(id)
        return (result.affected ?? 0) > 0
    }

    async getBlogCount(){

        const totalBlogs= this.blogsRepository.count()
        return {availableBlogs:totalBlogs}
    }

    async bookBlogs(userId:number,blogIds:number[]){

        if (blogIds.length > 5){
            throw new BadRequestException("You can only book upto 5 blogs")
        }
        const blogsToBook =  await this.blogsRepository.findByIds(blogIds)
        if (blogsToBook.length  != blogIds.length){

            throw new NotFoundException('One or more blogs do not exist.')
        }

        await this.blogsRepository.remove(blogsToBook)
        const  remainingBlogs = await this.blogsRepository.count()

        return {

            message:"Blogs booked successfully",
            remainingBlogs
        }
    }

    
}