import { Test, TestingModule } from "@nestjs/testing";

import { EnvironmentConfigModule } from "../environment-config/environment-config.module";
import { EnvironmentConfigService } from "../environment-config/environment-config.service";
import { DBConfig } from "./db-config";
import { RabitMqConfig } from "./mq.config";

describe("EnvironmentConfigService", () => {
  let dbservice: EnvironmentConfigService<DBConfig>;
  let mqservice: EnvironmentConfigService<RabitMqConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        EnvironmentConfigModule.forRoot({
          configClass: DBConfig,
          serviceName: "DBConfigService",
        }),
        EnvironmentConfigModule.forRoot({ configClass: RabitMqConfig }),
      ],
    }).compile();

    dbservice =
      module.get<EnvironmentConfigService<DBConfig>>("DBConfigService");
    mqservice = module.get<EnvironmentConfigService<RabitMqConfig>>(
      EnvironmentConfigService
    );
  });

  it("dbservice should be defined", () => {
    expect(dbservice).toBeDefined();
  });

  it("mqservice should be defined", () => {
    expect(mqservice).toBeDefined();
  });

  it("should retrieve configuration properties from dbservice", () => {
    const config = dbservice.config;
    expect(config).toBeDefined();
    expect(config.name).toBe("test_db");
    expect(config.username).toBe("test_user");
    expect(config.password).toBe("test_password");
    expect(config.host).toBe("test_host");
    expect(config.port).toBe(5432);
    expect(config.logging).toBe(false);
  });

  it("should retrieve configuration properties from mqservice", () => {
    const config = mqservice.config;
    expect(config).toBeDefined();
    expect(config.uri).toBe("amqp://test:test@localhost:5672");
    expect(config.exchangeName).toBe("test_exchange");
    expect(config.queueExchange).toBe("test_queue_exchange");
  });
});
