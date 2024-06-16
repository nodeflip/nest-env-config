"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EnvironmentConfigService = void 0;
var common_1 = require("@nestjs/common");
/**
 * A service that provides configuration settings by extracting them from
 * the environment variables and mapping them to a specified configuration class.
 *
 * @template T - The type of the configuration class.
 */
var EnvironmentConfigService = /** @class */ (function () {
    /**
     * Creates an instance of EnvironmentConfigService.
     *
     * @param {ConfigService} configService - The ConfigService instance to access environment variables.
     * @param {PropClassType<T>} configClass - The configuration class type that defines the properties and their default values.
     */
    function EnvironmentConfigService(configService, configClass) {
        this.configService = configService;
        this.config = this.getConfigObject(configClass);
    }
    /**
     * Maps the environment variables to the configuration class properties.
     *
     * @private
     * @param {T} configClass - The configuration class instance.
     * @returns {T} The configuration object with properties populated from environment variables or their default values.
     */
    EnvironmentConfigService.prototype.getConfigObject = function (configClass) {
        var _this = this;
        var configObject = {};
        var cls = configClass;
        if (cls["__configProps"]) {
            cls["__configProps"].forEach(function (prop) {
                configObject[prop.propertyKey] =
                    _this.configService.get(prop.envName) || prop.defaultValue;
            });
        }
        return configObject;
    };
    EnvironmentConfigService = __decorate([
        (0, common_1.Injectable)()
    ], EnvironmentConfigService);
    return EnvironmentConfigService;
}());
exports.EnvironmentConfigService = EnvironmentConfigService;
