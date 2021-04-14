import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}