import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from '../Service/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get('/findAll')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
}
