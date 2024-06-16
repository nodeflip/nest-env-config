import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { EnvironmentConfigService } from "./environment-config.service";
import { PropClassType } from "./prop.decorator";

@Module({})
export class EnvironmentConfigModule {
  static forRoot<T>(configClass: T): DynamicModule {
    const environmentConfigServiceProvider: Provider = {
      provide: EnvironmentConfigService,
      useFactory: (configService: ConfigService) => {
        return new EnvironmentConfigService<T>(
          configService,
          configClass as PropClassType<T>
        );
      },
      inject: [ConfigService],
    };

    return {
      module: EnvironmentConfigModule,
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [environmentConfigServiceProvider, ConfigService],
      exports: [EnvironmentConfigService],
    };
  }
}
