import {CanActivate, ExecutionContext, forwardRef, Inject, Injectable} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {User} from "../../user/Model/user.interface";
import {UsersService} from "../../user/Service/user.service";

@Injectable()
export class UserIsUserGuard implements CanActivate{

    constructor(
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService
    ) {

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const user: User = request.user;

        return this.userService.findOne(user.id).pipe(
            map((user: User) => {
                let hasPermission = false;

                if(user.id === Number(params.id)) {
                    hasPermission = true;
                }

                return user && hasPermission;
            })
        )
    }


}