import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../Model/user.entity";
import {from, Observable} from "rxjs";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    create(user: User): Observable<User> {
        return from (this.userRepository.save(user));
    }

    findOne(id: number): Observable<User> {
        return from(this.userRepository.findOne( { where: {id: id} }));
    }

    findAll(): Observable<User[]> {
        return from (this.userRepository.find());
    }

    delete(id: number): Observable<any>{
        return from(this.userRepository.delete(id));
    }

    update(id: number, user: User): Observable<any> {
        return from(this.userRepository.update(id, user));
    }

}
