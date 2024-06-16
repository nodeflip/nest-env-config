"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EnvironmentConfigModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var environment_config_service_1 = require("./environment-config.service");
var EnvironmentConfigModule = /** @class */ (function () {
    function EnvironmentConfigModule() {
    }
    EnvironmentConfigModule_1 = EnvironmentConfigModule;
    EnvironmentConfigModule.forRoot = function (configClass) {
        var environmentConfigServiceProvider = {
            provide: environment_config_service_1.EnvironmentConfigService,
            useFactory: function (configService) {
                return new environment_config_service_1.EnvironmentConfigService(configService, configClass);
            },
            inject: [config_1.ConfigService]
        };
        return {
            module: EnvironmentConfigModule_1,
            imports: [config_1.ConfigModule.forRoot({ isGlobal: true })],
            providers: [environmentConfigServiceProvider, config_1.ConfigService],
            exports: [environment_config_service_1.EnvironmentConfigService]
        };
    };
    var EnvironmentConfigModule_1;
    EnvironmentConfigModule = EnvironmentConfigModule_1 = __decorate([
        (0, common_1.Module)({})
    ], EnvironmentConfigModule);
    return EnvironmentConfigModule;
}());
exports.EnvironmentConfigModule = EnvironmentConfigModule;
