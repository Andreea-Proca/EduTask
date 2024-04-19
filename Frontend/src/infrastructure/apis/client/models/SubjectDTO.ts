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
import type { ProfessorDTO } from './ProfessorDTO';
import {
    ProfessorDTOFromJSON,
    ProfessorDTOFromJSONTyped,
    ProfessorDTOToJSON,
} from './ProfessorDTO';

/**
 * 
 * @export
 * @interface SubjectDTO
 */
export interface SubjectDTO {
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SubjectDTO
     */
    description?: string | null;
    /**
     * 
     * @type {ProfessorDTO}
     * @memberof SubjectDTO
     */
    professor?: ProfessorDTO;
    /**
     * 
     * @type {Date}
     * @memberof SubjectDTO
     */
    createdAt?: Date;
}

/**
 * Check if a given object implements the SubjectDTO interface.
 */
export function instanceOfSubjectDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubjectDTOFromJSON(json: any): SubjectDTO {
    return SubjectDTOFromJSONTyped(json, false);
}

export function SubjectDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubjectDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'professor': !exists(json, 'professor') ? undefined : ProfessorDTOFromJSON(json['professor']),
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
    };
}

export function SubjectDTOToJSON(value?: SubjectDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'professor': ProfessorDTOToJSON(value.professor),
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
    };
}

