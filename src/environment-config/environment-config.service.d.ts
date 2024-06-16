import { ConfigService } from "@nestjs/config";
import { PropClassType } from "./prop.decorator";
/**
 * A service that provides configuration settings by extracting them from
 * the environment variables and mapping them to a specified configuration class.
 *
 * @template T - The type of the configuration class.
 */
export declare class EnvironmentConfigService<T> {
    private readonly configService;
    /**
     * The configuration object containing the mapped environment variables.
     */
    readonly config: T;
    /**
     * Creates an instance of EnvironmentConfigService.
     *
     * @param {ConfigService} configService - The ConfigService instance to access environment variables.
     * @param {PropClassType<T>} configClass - The configuration class type that defines the properties and their default values.
     */
    constructor(configService: ConfigService, configClass: PropClassType<T>);
    /**
     * Maps the environment variables to the configuration class properties.
     *
     * @private
     * @param {T} configClass - The configuration class instance.
     * @returns {T} The configuration object with properties populated from environment variables or their default values.
     */
    private getConfigObject;
}
