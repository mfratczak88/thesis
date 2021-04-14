import { DynamicModule, Module } from '@nestjs/common';
import { providers } from './mongo';

@Module({})
export class PersistenceModule {
  static register(): DynamicModule {
    return {
      module: PersistenceModule,
      providers: providers,
      exports: providers,
    };
  }
}
