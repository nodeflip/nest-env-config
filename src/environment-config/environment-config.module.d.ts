import { DynamicModule } from "@nestjs/common";
export declare class EnvironmentConfigModule {
    static forRoot<T>(configClass: T): DynamicModule;
}
