import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "../Service/user.service";
import {User} from "../Model/user.entity";
import {Observable} from "rxjs";

@Controller('user')
export class UserController {

    constructor(private usersService: UsersService) { }

    @Post('/create')
    create(@Body() user: User): Observable<User>{
        return this.usersService.create(user);
    }

    @Get('/getAll')
    findAll(): Observable<User[]> {
        return this.usersService.findAll();
    }

    @Get(':username')
    findOne(@Param() params): Observable<User> {
        return this.usersService.findOne(params.id);
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() user: User): Observable<any> {
        return this.usersService.update(Number(id), user)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.usersService.delete(Number(id));
    }
}
