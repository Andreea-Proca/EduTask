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
 * @interface StudentAddDTO
 */
export interface StudentAddDTO {
    /**
     * 
     * @type {string}
     * @memberof StudentAddDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StudentAddDTO
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof StudentAddDTO
     */
    password?: string | null;
    /**
     * 
     * @type {UserRoleEnum}
     * @memberof StudentAddDTO
     */
    role?: UserRoleEnum;
}

/**
 * Check if a given object implements the StudentAddDTO interface.
 */
export function instanceOfStudentAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StudentAddDTOFromJSON(json: any): StudentAddDTO {
    return StudentAddDTOFromJSONTyped(json, false);
}

export function StudentAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): StudentAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'role': !exists(json, 'role') ? undefined : UserRoleEnumFromJSON(json['role']),
    };
}

export function StudentAddDTOToJSON(value?: StudentAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'email': value.email,
        'password': value.password,
        'role': UserRoleEnumToJSON(value.role),
    };
}
