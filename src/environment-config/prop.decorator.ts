/**
 * A decorator function for defining class properties based on environment variables.
 *
 * This decorator allows you to define class properties that will be populated
 * with values from environment variables. If the environment variable is not
 * set, an optional default value can be provided.
 *
 * @param envName - The name of the environment variable to use for this property.
 * @param defaultValue - An optional default value to use if the environment variable is not set.
 *
 * @returns A property decorator function.
 */

export interface ConfigProp {
  propertyKey: string;
  envName: string;
  defaultValue: any;
}

export type PropClassType<T> = T & { __configProps: ConfigProp[] };

export const Prop = <T>(envName: string, defaultValue?: T) => {
  return (target: any, propertyKey: string) => {
    if (!target.constructor["__configProps"]) {
      target.constructor["__configProps"] = [];
    }

    target.constructor["__configProps"].push({
      propertyKey,
      envName,
      defaultValue,
    });
  };
};
