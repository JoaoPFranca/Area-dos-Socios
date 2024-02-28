import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './Service/user.service';
import { UserController } from './Controller/user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./Model/user.entity";
import {AuthModule} from "../auth/auth.module";
import {PostsService} from "../posts/Service/posts.service";
import {Post} from "../posts/Model/post.entity";
import {PostsModule} from "../posts/posts.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    TypeOrmModule.forFeature([Post])
  ],
  providers: [UsersService, PostsService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UserModule {}
