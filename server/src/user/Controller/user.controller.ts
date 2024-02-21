import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "../Service/user.service";
import {catchError, map, Observable, of} from "rxjs";
import {User, UserRole} from "../Model/user.interface";
import {hasRoles} from "../../auth/decorator/roles.decorator";
import {JwtAuthGuard} from "../../auth/guards/jwt-guard";
import {RolesGuard} from "../../auth/guards/roles.guard";

@Controller('user')
export class UserController {

    constructor(private usersService: UsersService) { }

    @Post('/create')
    create(@Body() user: User): Observable<User | Object> {
        return this.usersService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.usersService.login(user).pipe(
            map((jwt: string) => {
                return { access_token: jwt };
            })
        )
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
