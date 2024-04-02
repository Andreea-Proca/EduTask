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
import type { ProfessorDTO } from './ProfessorDTO';
import {
    ProfessorDTOFromJSON,
    ProfessorDTOFromJSONTyped,
    ProfessorDTOToJSON,
} from './ProfessorDTO';

/**
 * 
 * @export
 * @interface ProfessorDTOPagedResponse
 */
export interface ProfessorDTOPagedResponse {
    /**
     * 
     * @type {number}
     * @memberof ProfessorDTOPagedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof ProfessorDTOPagedResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof ProfessorDTOPagedResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<ProfessorDTO>}
     * @memberof ProfessorDTOPagedResponse
     */
    data?: Array<ProfessorDTO> | null;
}

/**
 * Check if a given object implements the ProfessorDTOPagedResponse interface.
 */
export function instanceOfProfessorDTOPagedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProfessorDTOPagedResponseFromJSON(json: any): ProfessorDTOPagedResponse {
    return ProfessorDTOPagedResponseFromJSONTyped(json, false);
}

export function ProfessorDTOPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfessorDTOPagedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'data': !exists(json, 'data') ? undefined : (json['data'] === null ? null : (json['data'] as Array<any>).map(ProfessorDTOFromJSON)),
    };
}

export function ProfessorDTOPagedResponseToJSON(value?: ProfessorDTOPagedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'pageSize': value.pageSize,
        'totalCount': value.totalCount,
        'data': value.data === undefined ? undefined : (value.data === null ? null : (value.data as Array<any>).map(ProfessorDTOToJSON)),
    };
}

