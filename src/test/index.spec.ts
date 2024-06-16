import { Test, TestingModule } from "@nestjs/testing";

import { EnvironmentConfigModule } from "../environment-config/environment-config.module";
import { EnvironmentConfigService } from "../environment-config/environment-config.service";
import { DBConfig } from "./db-config";

describe("EnvironmentConfigService", () => {
  let service: EnvironmentConfigService<DBConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvironmentConfigModule.forRoot(DBConfig)],
    }).compile();

    service = module.get<EnvironmentConfigService<DBConfig>>(
      EnvironmentConfigService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should retrieve configuration properties", () => {
    const config = service.config;
    expect(config).toBeDefined();
    expect(config.name).toBe("test_db");
    expect(config.username).toBe("test_user");
    expect(config.password).toBe("test_password");
    expect(config.host).toBe("test_host");
    expect(config.port).toBe(5432);
    expect(config.logging).toBe(false);
  });
});
