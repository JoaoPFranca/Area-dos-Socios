import { Module } from '@nestjs/common';
import { UsersService } from './Service/user.service';
import { UserController } from './Controller/user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./Model/user.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UserModule {}
