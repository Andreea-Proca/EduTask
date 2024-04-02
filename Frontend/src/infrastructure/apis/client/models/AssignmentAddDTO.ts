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
 * @interface AssignmentAddDTO
 */
export interface AssignmentAddDTO {
    /**
     * 
     * @type {string}
     * @memberof AssignmentAddDTO
     */
    title?: string | null;
    /**
     * 
     * @type {string}
     * @memberof AssignmentAddDTO
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof AssignmentAddDTO
     */
    dueDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof AssignmentAddDTO
     */
    subjectId?: string;
}

/**
 * Check if a given object implements the AssignmentAddDTO interface.
 */
export function instanceOfAssignmentAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AssignmentAddDTOFromJSON(json: any): AssignmentAddDTO {
    return AssignmentAddDTOFromJSONTyped(json, false);
}

export function AssignmentAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): AssignmentAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'dueDate': !exists(json, 'dueDate') ? undefined : (new Date(json['dueDate'])),
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
    };
}

export function AssignmentAddDTOToJSON(value?: AssignmentAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'title': value.title,
        'description': value.description,
        'dueDate': value.dueDate === undefined ? undefined : (value.dueDate.toISOString()),
        'subjectId': value.subjectId,
    };
}

