import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PropClassType } from "./prop.decorator";

@Injectable()
export class EnvironmentConfigService<T> {
  public readonly config: T;
  constructor(
    private readonly configService: ConfigService,
    configClass: PropClassType<T> | PropClassType<T>[]
  ) {
    if (Array.isArray(configClass)) {
      this.config = configClass.reduce((acc, cls) => {
        acc = {
          ...acc,
          ...this.getConfigObject(cls),
        };
        return acc;
      }, {} as T);
    } else {
      this.config = this.getConfigObject(configClass);
    }
  }

  private getConfigObject(configClass: T): T {
    const configObject: any = {};
    const cls = configClass as PropClassType<T>;

    if (cls["__configProps"]) {
      cls["__configProps"].forEach((prop) => {
        configObject[prop.propertyKey] =
          this.configService.get<any>(prop.envName) || prop.defaultValue;
      });
    }
    return configObject as T;
  }
}
