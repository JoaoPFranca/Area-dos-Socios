import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from '../Service/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('/findAll/:postId')
  findAllByPost(@Param('postId') postId: string) {
    return this.commentsService.findAllByPost(+postId);
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.delete(+id);
  }
}
