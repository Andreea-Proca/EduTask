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
import type { Subject } from './Subject';
import {
    SubjectFromJSON,
    SubjectFromJSONTyped,
    SubjectToJSON,
} from './Subject';
import type { UserFile } from './UserFile';
import {
    UserFileFromJSON,
    UserFileFromJSONTyped,
    UserFileToJSON,
} from './UserFile';

/**
 * 
 * @export
 * @interface Assignment
 */
export interface Assignment {
    /**
     * 
     * @type {string}
     * @memberof Assignment
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof Assignment
     */
    title?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Assignment
     */
    description?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof Assignment
     */
    dueDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof Assignment
     */
    subjectId?: string;
    /**
     * 
     * @type {Subject}
     * @memberof Assignment
     */
    subject?: Subject;
    /**
     * 
     * @type {Array<UserFile>}
     * @memberof Assignment
     */
    userFiles?: Array<UserFile> | null;
}

/**
 * Check if a given object implements the Assignment interface.
 */
export function instanceOfAssignment(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AssignmentFromJSON(json: any): Assignment {
    return AssignmentFromJSONTyped(json, false);
}

export function AssignmentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Assignment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'title': !exists(json, 'title') ? undefined : json['title'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'dueDate': !exists(json, 'dueDate') ? undefined : (new Date(json['dueDate'])),
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
        'subject': !exists(json, 'subject') ? undefined : SubjectFromJSON(json['subject']),
        'userFiles': !exists(json, 'userFiles') ? undefined : (json['userFiles'] === null ? null : (json['userFiles'] as Array<any>).map(UserFileFromJSON)),
    };
}

export function AssignmentToJSON(value?: Assignment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
        'title': value.title,
        'description': value.description,
        'dueDate': value.dueDate === undefined ? undefined : (value.dueDate.toISOString()),
        'subjectId': value.subjectId,
        'subject': SubjectToJSON(value.subject),
        'userFiles': value.userFiles === undefined ? undefined : (value.userFiles === null ? null : (value.userFiles as Array<any>).map(UserFileToJSON)),
    };
}

