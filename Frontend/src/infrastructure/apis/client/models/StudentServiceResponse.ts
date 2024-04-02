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
 * @interface StudentServiceResponse
 */
export interface StudentServiceResponse {
    /**
     * 
     * @type {ErrorMessage}
     * @memberof StudentServiceResponse
     */
    error?: ErrorMessage;
    /**
     * 
     * @type {boolean}
     * @memberof StudentServiceResponse
     */
    readonly isOk?: boolean;
    /**
     * 
     * @type {Student}
     * @memberof StudentServiceResponse
     */
    result?: Student;
}

/**
 * Check if a given object implements the StudentServiceResponse interface.
 */
export function instanceOfStudentServiceResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function StudentServiceResponseFromJSON(json: any): StudentServiceResponse {
    return StudentServiceResponseFromJSONTyped(json, false);
}

export function StudentServiceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): StudentServiceResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'error') ? undefined : ErrorMessageFromJSON(json['error']),
        'isOk': !exists(json, 'isOk') ? undefined : json['isOk'],
        'result': !exists(json, 'result') ? undefined : StudentFromJSON(json['result']),
    };
}

export function StudentServiceResponseToJSON(value?: StudentServiceResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error': ErrorMessageToJSON(value.error),
        'result': StudentToJSON(value.result),
    };
}

