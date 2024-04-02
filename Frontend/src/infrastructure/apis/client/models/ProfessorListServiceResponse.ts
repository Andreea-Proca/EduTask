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
import type { Professor } from './Professor';
import {
    ProfessorFromJSON,
    ProfessorFromJSONTyped,
    ProfessorToJSON,
} from './Professor';

/**
 * 
 * @export
 * @interface ProfessorListServiceResponse
 */
export interface ProfessorListServiceResponse {
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ProfessorListServiceResponse
     */
    error?: ErrorMessage;
    /**
     * 
     * @type {boolean}
     * @memberof ProfessorListServiceResponse
     */
    readonly isOk?: boolean;
    /**
     * 
     * @type {Array<Professor>}
     * @memberof ProfessorListServiceResponse
     */
    result?: Array<Professor> | null;
}

/**
 * Check if a given object implements the ProfessorListServiceResponse interface.
 */
export function instanceOfProfessorListServiceResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProfessorListServiceResponseFromJSON(json: any): ProfessorListServiceResponse {
    return ProfessorListServiceResponseFromJSONTyped(json, false);
}

export function ProfessorListServiceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfessorListServiceResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'error': !exists(json, 'error') ? undefined : ErrorMessageFromJSON(json['error']),
        'isOk': !exists(json, 'isOk') ? undefined : json['isOk'],
        'result': !exists(json, 'result') ? undefined : (json['result'] === null ? null : (json['result'] as Array<any>).map(ProfessorFromJSON)),
    };
}

export function ProfessorListServiceResponseToJSON(value?: ProfessorListServiceResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'error': ErrorMessageToJSON(value.error),
        'result': value.result === undefined ? undefined : (value.result === null ? null : (value.result as Array<any>).map(ProfessorToJSON)),
    };
}
