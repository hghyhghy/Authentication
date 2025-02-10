
import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Query } from '@nestjs/common';
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

    @Get('pagnated')
    async getBlogs(@Query('page') page:number=1 , @Query('limit') limit:number=5){

        return this.blogsService.getPaginatedBlogs(page,limit)
    }

    @Delete(':id')
    async deleteBlog(@Param('id') id:string){
          
        const deleted = this.blogsService.deleteBlog(Number(id))

        if (!deleted){

            throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);

        }

        else{

            return { message: 'Blog deleted successfully' };

        }

    }
}