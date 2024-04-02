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
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { Student } from './Student';
import {
    StudentFromJSON,
    StudentFromJSONTyped,
    StudentToJSON,
} from './Student';

/**
 * 
 * @export
 * @interface StudentListServiceResponse
 */
export interface StudentListServiceResponse {
    /**
     * 
     * @type {ErrorMessage}
     * @memberof StudentListServiceResponse
     */
    error?: ErrorMessage;
    /**
     * 
     * @type {boolean}
     * @memberof StudentListServiceResponse
     */
    readonly isOk?: boolean;
    /**
     * 
     * @type {Array<Student>}
     * @memberof StudentListServiceResponse
     */
    result?: Array<Student> | null;
}

/**
 * Check if a given object implements the StudentListServiceResponse interface.
 */
export function instanceOfStudentListServiceResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StudentListServiceResponseFromJSON(json: any): StudentListServiceResponse {
    return StudentListServiceResponseFromJSONTyped(json, false);
}

export function StudentListServiceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): StudentListServiceResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'error') ? undefined : ErrorMessageFromJSON(json['error']),
        'isOk': !exists(json, 'isOk') ? undefined : json['isOk'],
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(StudentFromJSON)),
    };
}

export function StudentListServiceResponseToJSON(value?: StudentListServiceResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error': ErrorMessageToJSON(value.error),
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(StudentToJSON)),
    };
}

