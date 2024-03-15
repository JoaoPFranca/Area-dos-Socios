import {forwardRef, Module} from '@nestjs/common';
import { PostsService } from './Service/posts.service';
import { PostsController } from './Controller/posts.controller';
import {UsersService} from "../user/Service/user.service";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./Model/post.entity";
import {UserEntity} from "../user/Model/user.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [PostsController],
  imports: [AuthModule, TypeOrmModule.forFeature([Post]), TypeOrmModule.forFeature([UserEntity])],
  providers: [PostsService, UsersService],
  exports: [PostsService]
})
export class PostsModule {}
