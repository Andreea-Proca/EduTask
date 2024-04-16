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
import type { SubjectDTO } from './SubjectDTO';
import {
    SubjectDTOFromJSON,
    SubjectDTOFromJSONTyped,
    SubjectDTOToJSON,
} from './SubjectDTO';

/**
 * 
 * @export
 * @interface SubjectDTOListRequestResponse
 */
export interface SubjectDTOListRequestResponse {
    /**
     * 
     * @type {Array<SubjectDTO>}
     * @memberof SubjectDTOListRequestResponse
     */
    readonly response?: Array<SubjectDTO> | null;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof SubjectDTOListRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the SubjectDTOListRequestResponse interface.
 */
export function instanceOfSubjectDTOListRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubjectDTOListRequestResponseFromJSON(json: any): SubjectDTOListRequestResponse {
    return SubjectDTOListRequestResponseFromJSONTyped(json, false);
}

export function SubjectDTOListRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubjectDTOListRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : (json['response'] === null ? null : (json['response'] as Array<any>).map(SubjectDTOFromJSON)),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function SubjectDTOListRequestResponseToJSON(value?: SubjectDTOListRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

