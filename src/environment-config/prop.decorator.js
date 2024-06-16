"use strict";
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
exports.__esModule = true;
exports.Prop = void 0;
var Prop = function (envName, defaultValue) {
    return function (target, propertyKey) {
        if (!target.constructor["__configProps"]) {
            target.constructor["__configProps"] = [];
        }
        target.constructor["__configProps"].push({
            propertyKey: propertyKey,
            envName: envName,
            defaultValue: defaultValue
        });
    };
};
exports.Prop = Prop;
