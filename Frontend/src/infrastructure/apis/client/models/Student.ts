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
import type { StudentSubject } from './StudentSubject';
import {
    StudentSubjectFromJSON,
    StudentSubjectFromJSONTyped,
    StudentSubjectToJSON,
} from './StudentSubject';
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
import type { UserRoleEnum } from './UserRoleEnum';
import {
    UserRoleEnumFromJSON,
    UserRoleEnumFromJSONTyped,
    UserRoleEnumToJSON,
} from './UserRoleEnum';

/**
 * 
 * @export
 * @interface Student
 */
export interface Student {
    /**
     * 
     * @type {string}
     * @memberof Student
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Student
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Student
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof Student
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Student
     */
    email?: string | null;
    /**
     * 
     * @type {string}
     * @memberof Student
     */
    password?: string | null;
    /**
     * 
     * @type {UserRoleEnum}
     * @memberof Student
     */
    role?: UserRoleEnum;
    /**
     * 
     * @type {Array<UserFile>}
     * @memberof Student
     */
    userFiles?: Array<UserFile> | null;
    /**
     * 
     * @type {Array<Subject>}
     * @memberof Student
     */
    subjects?: Array<Subject> | null;
    /**
     * 
     * @type {Array<StudentSubject>}
     * @memberof Student
     */
    studentSubjects?: Array<StudentSubject> | null;
}

/**
 * Check if a given object implements the Student interface.
 */
export function instanceOfStudent(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StudentFromJSON(json: any): Student {
    return StudentFromJSONTyped(json, false);
}

export function StudentFromJSONTyped(json: any, ignoreDiscriminator: boolean): Student {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'password': !exists(json, 'password') ? undefined : json['password'],
        'role': !exists(json, 'role') ? undefined : UserRoleEnumFromJSON(json['role']),
        'userFiles': !exists(json, 'userFiles') ? undefined : (json['userFiles'] === null ? null : (json['userFiles'] as Array<any>).map(UserFileFromJSON)),
        'subjects': !exists(json, 'subjects') ? undefined : (json['subjects'] === null ? null : (json['subjects'] as Array<any>).map(SubjectFromJSON)),
        'studentSubjects': !exists(json, 'studentSubjects') ? undefined : (json['studentSubjects'] === null ? null : (json['studentSubjects'] as Array<any>).map(StudentSubjectFromJSON)),
    };
}

export function StudentToJSON(value?: Student | null): any {
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
        'name': value.name,
        'email': value.email,
        'password': value.password,
        'role': UserRoleEnumToJSON(value.role),
        'userFiles': value.userFiles === undefined ? undefined : (value.userFiles === null ? null : (value.userFiles as Array<any>).map(UserFileToJSON)),
        'subjects': value.subjects === undefined ? undefined : (value.subjects === null ? null : (value.subjects as Array<any>).map(SubjectToJSON)),
        'studentSubjects': value.studentSubjects === undefined ? undefined : (value.studentSubjects === null ? null : (value.studentSubjects as Array<any>).map(StudentSubjectToJSON)),
    };
}

