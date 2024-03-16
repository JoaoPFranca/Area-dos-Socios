import { Module } from '@nestjs/common';
import { CommentsService } from './Service/comments.service';
import { CommentsController } from './Controller/comments.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "../posts/Model/post.entity";
import {Comment} from "./Model/comment.entity";
import {UserEntity} from "../user/Model/user.entity";
import {PostsService} from "../posts/Service/posts.service";
import {UsersService} from "../user/Service/user.service";
import {AuthService} from "../auth/service/auth.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Comment]), TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([UserEntity])],
  controllers: [CommentsController],
  providers: [PostsService, UsersService, CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
