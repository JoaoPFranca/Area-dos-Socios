import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { from, Observable } from "rxjs";
import { User } from "../../user/Model/user.interface";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }


    hashPassword(password: string): Observable<String> {
        return from<string>(bcrypt.hash(password, 12));
    }


    comparePasswords(newPassword: string, passwordHash: string): Observable<any> {
        return from<any | boolean>(bcrypt.compare(newPassword, passwordHash));
    }
}
