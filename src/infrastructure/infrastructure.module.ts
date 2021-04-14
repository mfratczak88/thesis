import { Global, Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';

@Global()
@Module({
  imports:[PersistenceModule.register()],
  exports: [PersistenceModule],
})
export class InfrastructureModule {
}