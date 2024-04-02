/* tslint:disable */
/* eslint-disable */
/**
 * MobyLab Web App
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface StudentUpdateDTO
 */
export interface StudentUpdateDTO {
    /**
     * 
     * @type {string}
     * @memberof StudentUpdateDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof StudentUpdateDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StudentUpdateDTO
     */
    password?: string | null;
}

/**
 * Check if a given object implements the StudentUpdateDTO interface.
 */
export function instanceOfStudentUpdateDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StudentUpdateDTOFromJSON(json: any): StudentUpdateDTO {
    return StudentUpdateDTOFromJSONTyped(json, false);
}

export function StudentUpdateDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StudentUpdateDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'password': !exists(json, 'password') ? undefined : json['password'],
    };
}

export function StudentUpdateDTOToJSON(value?: StudentUpdateDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'password': value.password,
    };
}
