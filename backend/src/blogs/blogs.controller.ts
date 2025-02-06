
import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Blog } from './blog.entity';

@Controller('blogs')
export class BlogsController{

    constructor (private readonly blogsService:BlogsService){}

    @Get()
    async findAll(){

        return this.blogsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id:number){

        return this.blogsService.findOne(id)
    }

    @Post()
    async create(@Body() body:{title:string,content:string}){

        const newBLog = await this.blogsService.create(body.title,body.content)
        return newBLog
    }

    @Get(':id')
    async getBlogByID(@Param('id') id:number):Promise<Blog>{

        const blog  = await this.blogsService.getBlogById(id)
        if(!blog){
            throw new NotFoundException('Blog not found')
        }

        else{

            return blog
        }
    }

}