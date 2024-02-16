import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {from, Observable, of} from "rxjs";
import {UserEntity} from "../../user/Model/user.entity";
import {User} from "../../user/Model/user.interface";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: User): Observable<String> {
        return from<string>(this.jwtService.sign({user}));
    }


    hashPassword(password: string): Observable<String> {
        return from<string>(bcrypt.hash(password,12));
    }


    comparePasswords(newPassword: string, passwordHash: string): Observable<any | boolean> { //any OR boolean
        return from<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    }
}
