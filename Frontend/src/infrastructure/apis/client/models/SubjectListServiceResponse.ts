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
import type { Subject } from './Subject';
import {
    SubjectFromJSON,
    SubjectFromJSONTyped,
    SubjectToJSON,
} from './Subject';

/**
 * 
 * @export
 * @interface SubjectListServiceResponse
 */
export interface SubjectListServiceResponse {
    /**
     * 
     * @type {ErrorMessage}
     * @memberof SubjectListServiceResponse
     */
    error?: ErrorMessage;
    /**
     * 
     * @type {boolean}
     * @memberof SubjectListServiceResponse
     */
    readonly isOk?: boolean;
    /**
     * 
     * @type {Array<Subject>}
     * @memberof SubjectListServiceResponse
     */
    result?: Array<Subject> | null;
}

/**
 * Check if a given object implements the SubjectListServiceResponse interface.
 */
export function instanceOfSubjectListServiceResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubjectListServiceResponseFromJSON(json: any): SubjectListServiceResponse {
    return SubjectListServiceResponseFromJSONTyped(json, false);
}

export function SubjectListServiceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubjectListServiceResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'error') ? undefined : ErrorMessageFromJSON(json['error']),
        'isOk': !exists(json, 'isOk') ? undefined : json['isOk'],
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(SubjectFromJSON)),
    };
}

export function SubjectListServiceResponseToJSON(value?: SubjectListServiceResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error': ErrorMessageToJSON(value.error),
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(SubjectToJSON)),
    };
}

