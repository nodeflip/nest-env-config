![example workflow](https://github.com/nodeflip/nest-env-config/actions/workflows/test.yml/badge.svg)
[![npm version](https://badge.fury.io/js/%40nodeflip%2Fnest-env-config.svg)](https://badge.fury.io/js/%40nodeflip%2Fnestjs-env-config)
[![downloads](https://img.shields.io/npm/dm/@nodeflip/nest-env-config.svg)](https://www.npmjs.com/package/@nodeflip/nestjs-env-config)

# 🚀 Nest Environment Configuration Module

## Overview

The `@nodeflip/nest-env-config` module provides a convenient way to manage environment configuration in your NestJS applications. By using decorators, you can define configuration properties that are automatically populated from environment variables with optional default values. This module ensures that your configuration is strongly typed and easily accessible throughout your application.

## Installation

To install the module, run the following command:

```bash
npm install @nodeflip/nest-env-config
```

## How to use it ?
### Setting Up the Module
First, import the EnvironmentConfigModule in your application's module and call the forRoot method with your configuration class.

```typescript
import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '@nodeflip/nest-env-config';
import { AppConfig } from './app-config';
import { DBConfig } from './db-config';

@Module({
  imports: [
    EnvironmentConfigModule.forRoot({configClass: AppConfig}),
    EnvironmentConfigModule.forRoot({configClass: DBConfig, serviceName: 'DB_CONFIG_SERVICE'})
  ],
})
export class AppModule {}
```

### Creating a Configuration Class
Define a configuration class and use the @Prop decorator to specify the environment variables and their default values.
```typescript
import { Prop } from '@nodeflip/nest-env-config';

export class AppConfig {
  @Prop('APP_PORT', 3000)
  public port: number;

  @Prop('APP_ENV', 'development')
  public env: string;

  @Prop('DATABASE_URL')
  public databaseUrl: string;
}
```
## Injecting the Configuration Service
Inject the EnvironmentConfigService into your services to access the configuration properties.

```typescript
import { Injectable } from '@nestjs/common';
import { EnvironmentConfigService } from '@nodeflip/nest-env-config';
import { AppConfig } from './app-config';
import { DBConfig } from './db-config';

@Injectable()
export class AppService {
  constructor(
    private readonly appConfigService: EnvironmentConfigService<AppConfig>,
    @Inject('DB_CONFIG_SERVICE') private readonly dbConfigService: EnvironmentConfigService<DBConfig>
  ) {
    console.log(this.appConfigService.config);
    console.log(this.dbConfigService.config);
  }

  getPort(): number {
    return this.dbConfigService.config.port;
  }
}
```

## Testing
The EnvironmentConfigModule can be easily tested using the NestJS testing utilities. Below is an example of how to set up and test the configuration service.

##### Example Test Configuration Class
```typescript
import { Prop } from '@nodeflip/nest-env-config';

export class DBConfig {
  @Prop('DB_NAME', 'test_db')
  name: string;

  @Prop('DB_USERNAME', 'test_user')
  username: string;

  @Prop('DB_PASSWORD', 'test_password')
  password: string;

  @Prop('DB_HOST', 'test_host')
  host: string;

  @Prop('DB_PORT', 5432)
  port: number;

  @Prop('ENABLE_LOGGING', false)
  logging: boolean;
}
```
##### Example Test Suite
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfigModule } from '@nodeflip/nest-env-config';
import { EnvironmentConfigService } from '@nodeflip/nest-env-config';
import { DBConfig } from './db-config';

describe('EnvironmentConfigService', () => {
  let service: EnvironmentConfigService<DBConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentConfigModule.forRoot({configClass: DBConfig})],
    }).compile();

    service = module.get<EnvironmentConfigService<DBConfig>>(EnvironmentConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve configuration properties', () => {
    const config = service.config;
    expect(config).toBeDefined();
    expect(config.name).toBe('test_db');
    expect(config.username).toBe('test_user');
    expect(config.password).toBe('test_password');
    expect(config.host).toBe('test_host');
    expect(config.port).toBe(5432);
    expect(config.logging).toBe(false);
  });
});
```

## Package Contents

The module includes the following main components:

- **EnvironmentConfigModule**: The module to be imported into your application module.
- **EnvironmentConfigService**: A service that provides access to the configuration properties.
- **Prop Decorator**: A decorator for defining configuration properties.

### EnvironmentConfigModule

The `EnvironmentConfigModule` is a dynamic module that registers the `EnvironmentConfigService` with the specified configuration class.

### EnvironmentConfigService

The `EnvironmentConfigService` retrieves the configuration values from the environment variables and maps them to the properties defined in the configuration class.

### Prop Decorator

The `Prop` decorator is used to define class properties that will be populated with values from the environment variables.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow to contribute to this project.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Open a pull request.

## License

This project is licensed under the MIT License.

## Dependencies

- `@nestjs/common`
- `@nestjs/config`
- `@nestjs/core`
- `reflect-metadata`

Enjoy using `@nodeflip/nest-env-config`!
