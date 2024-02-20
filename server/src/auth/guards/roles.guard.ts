import {CanActivate, ExecutionContext, forwardRef, Inject, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {UsersService} from "../../user/Service/user.service";
import {Observable} from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
                @Inject(forwardRef(() => UsersService))
                private usersService: UsersService) {}

    canActivate(context:ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!roles){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return true;
    }
}