import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { AuthService } from './service/auth.service';
import {UserModule} from "../user/user.module";
import {RolesGuard} from "./guards/roles.guard";
import {JwtAuthGuard} from "./guards/jwt-guard";
import {JwtStrategy} from "./guards/jwt-strategy";
import {PostsModule} from "../posts/posts.module";

@Module({
    imports: [
        forwardRef(() => UserModule), //Solving circular dependency
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService)=> ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '10000s'}
            })
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
