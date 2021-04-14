import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from './user/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from './authorization/roles/roles.guard';
import { InvitationService } from './invitation/invitation.service';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Global()
@Module({
  imports: [
    InfrastructureModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: await configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '15m',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    InvitationService, {
      provide: 'ROLES_GUARD',
      useClass: RolesGuard,
    },
  ],
  exports: [
    InvitationService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {
}
