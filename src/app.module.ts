import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { EndpointsModule } from './api/endpoints/endpoints.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables:true
    }),
    InfrastructureModule,
    EndpointsModule
  ],
})
export class AppModule {
}
