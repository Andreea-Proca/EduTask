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
 * @interface SubjectServiceResponse
 */
export interface SubjectServiceResponse {
    /**
     * 
     * @type {ErrorMessage}
     * @memberof SubjectServiceResponse
     */
    error?: ErrorMessage;
    /**
     * 
     * @type {boolean}
     * @memberof SubjectServiceResponse
     */
    readonly isOk?: boolean;
    /**
     * 
     * @type {Subject}
     * @memberof SubjectServiceResponse
     */
    result?: Subject;
}

/**
 * Check if a given object implements the SubjectServiceResponse interface.
 */
export function instanceOfSubjectServiceResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubjectServiceResponseFromJSON(json: any): SubjectServiceResponse {
    return SubjectServiceResponseFromJSONTyped(json, false);
}

export function SubjectServiceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubjectServiceResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'error') ? undefined : ErrorMessageFromJSON(json['error']),
        'isOk': !exists(json, 'isOk') ? undefined : json['isOk'],
        'result': !exists(json, 'result') ? undefined : SubjectFromJSON(json['result']),
    };
}

export function SubjectServiceResponseToJSON(value?: SubjectServiceResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error': ErrorMessageToJSON(value.error),
        'result': SubjectToJSON(value.result),
    };
}

