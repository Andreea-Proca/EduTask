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
import type { UserRoleEnum } from './UserRoleEnum';
import {
    UserRoleEnumFromJSON,
    UserRoleEnumFromJSONTyped,
    UserRoleEnumToJSON,
} from './UserRoleEnum';

/**
 * 
 * @export
 * @interface StudentDTO
 */
export interface StudentDTO {
    /**
     * 
     * @type {string}
     * @memberof StudentDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof StudentDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StudentDTO
     */
    email?: string | null;
    /**
     * 
     * @type {UserRoleEnum}
     * @memberof StudentDTO
     */
    role?: UserRoleEnum;
}

/**
 * Check if a given object implements the StudentDTO interface.
 */
export function instanceOfStudentDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StudentDTOFromJSON(json: any): StudentDTO {
    return StudentDTOFromJSONTyped(json, false);
}

export function StudentDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StudentDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'role': !exists(json, 'role') ? undefined : UserRoleEnumFromJSON(json['role']),
    };
}

export function StudentDTOToJSON(value?: StudentDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'email': value.email,
        'role': UserRoleEnumToJSON(value.role),
    };
}

