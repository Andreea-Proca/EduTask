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
import type { ProfessorDTO } from './ProfessorDTO';
import {
    ProfessorDTOFromJSON,
    ProfessorDTOFromJSONTyped,
    ProfessorDTOToJSON,
} from './ProfessorDTO';

/**
 * 
 * @export
 * @interface ProfessorDTORequestResponse
 */
export interface ProfessorDTORequestResponse {
    /**
     * 
     * @type {ProfessorDTO}
     * @memberof ProfessorDTORequestResponse
     */
    response?: ProfessorDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof ProfessorDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the ProfessorDTORequestResponse interface.
 */
export function instanceOfProfessorDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProfessorDTORequestResponseFromJSON(json: any): ProfessorDTORequestResponse {
    return ProfessorDTORequestResponseFromJSONTyped(json, false);
}

export function ProfessorDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfessorDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : ProfessorDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function ProfessorDTORequestResponseToJSON(value?: ProfessorDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': ProfessorDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}

