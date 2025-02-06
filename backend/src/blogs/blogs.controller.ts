
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';

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

}