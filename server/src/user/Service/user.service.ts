import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../Model/user.interface";
import {UserEntity} from "../Model/user.entity";
import {catchError, from, map, Observable, switchMap, throwError} from "rxjs";
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<User>,
        private authService: AuthService
    ) {}

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name
                newUser.username = user.username
                newUser.email = user.email
                newUser.password = passwordHash;
                newUser.role = user.role;
                return from (this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const{password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne( { where: {id: id} })).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            })
        )
    }

    findAll(): Observable<User[]> {
        return from (this.userRepository.find()).pipe(
            map((users) => {
                users.forEach(function (v) {delete v.password});
                return users;
            })
        );
    }

    delete(id: number): Observable<any>{
        return from(this.userRepository.delete(id));
    }

    update(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        return from(this.userRepository.update(id, user));
    }


    login(user: User): Observable<string> {
        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return this.findByEmail(email).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
                map((match: boolean) => {
                    if(match) {
                        const {password, ...result} = user;
                        return result
                    } else {
                        throw Error;
                    }
                })
            ))
        )
    }

    findByEmail(email: string): Observable<User> {
        return from(this.userRepository.findOne({ where: {email: email}}));
    }
}
