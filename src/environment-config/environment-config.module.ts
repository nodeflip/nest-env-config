import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { EnvironmentConfigService } from "./environment-config.service";
import { PropClassType } from "./prop.decorator";

export interface EnvironmentConfigModuleOptions<T> {
  serviceName?: string;
  configClass: T;
}

@Module({})
export class EnvironmentConfigModule {
  static forRoot<T>(
    options:
      | EnvironmentConfigModuleOptions<T>
      | EnvironmentConfigModuleOptions<T>[]
  ): DynamicModule {
    const providers: Provider[] = [];
    if (Array.isArray(options)) {
      options.forEach((option) => {
        providers.push({
          provide: option.serviceName
            ? option.serviceName
            : EnvironmentConfigService,
          useFactory: (configService: ConfigService) => {
            return new EnvironmentConfigService<T>(
              configService,
              option.configClass as PropClassType<T>
            );
          },
          inject: [ConfigService],
        });
      });
    } else {
      providers.push({
        provide: options.serviceName
          ? options.serviceName
          : EnvironmentConfigService,
        useFactory: (configService: ConfigService) => {
          return new EnvironmentConfigService<T>(
            configService,
            options.configClass as PropClassType<T>
          );
        },
        inject: [ConfigService],
      });
    }

    return {
      module: EnvironmentConfigModule,
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [...providers, ConfigService],
      exports: [...providers, ConfigService],
    };
  }
}
