import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { PropClassType } from "./prop.decorator";

/**
 * A service that provides configuration settings by extracting them from
 * the environment variables and mapping them to a specified configuration class.
 *
 * @template T - The type of the configuration class.
 */
@Injectable()
export class EnvironmentConfigService<T> {
  /**
   * The configuration object containing the mapped environment variables.
   */
  public readonly config: T;

  /**
   * Creates an instance of EnvironmentConfigService.
   *
   * @param {ConfigService} configService - The ConfigService instance to access environment variables.
   * @param {PropClassType<T>} configClass - The configuration class type that defines the properties and their default values.
   */
  constructor(
    private readonly configService: ConfigService,
    configClass: PropClassType<T>
  ) {
    this.config = this.getConfigObject(configClass);
  }

  /**
   * Maps the environment variables to the configuration class properties.
   *
   * @private
   * @param {T} configClass - The configuration class instance.
   * @returns {T} The configuration object with properties populated from environment variables or their default values.
   */
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
