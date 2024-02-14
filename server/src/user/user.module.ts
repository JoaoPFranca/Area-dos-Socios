import { Module } from '@nestjs/common';
import { UsersService } from './Service/user.service';
import { UserController } from './Controller/user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./Model/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  controllers: [UserController]
})
export class UserModule {}
