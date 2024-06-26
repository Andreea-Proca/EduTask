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
import type { FeedbackDTO } from './FeedbackDTO';
import {
    FeedbackDTOFromJSON,
    FeedbackDTOFromJSONTyped,
    FeedbackDTOToJSON,
} from './FeedbackDTO';

/**
 * 
 * @export
 * @interface FeedbackDTOListRequestResponse
 */
export interface FeedbackDTOListRequestResponse {
    /**
     * 
     * @type {Array<FeedbackDTO>}
     * @memberof FeedbackDTOListRequestResponse
     */
    readonly response?: Array<FeedbackDTO> | null;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof FeedbackDTOListRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the FeedbackDTOListRequestResponse interface.
 */
export function instanceOfFeedbackDTOListRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeedbackDTOListRequestResponseFromJSON(json: any): FeedbackDTOListRequestResponse {
    return FeedbackDTOListRequestResponseFromJSONTyped(json, false);
}

export function FeedbackDTOListRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackDTOListRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : (json['response'] === null ? null : (json['response'] as Array<any>).map(FeedbackDTOFromJSON)),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function FeedbackDTOListRequestResponseToJSON(value?: FeedbackDTOListRequestResponse | null): any {
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

