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
import type { AmountEnum } from './AmountEnum';
import {
    AmountEnumFromJSON,
    AmountEnumFromJSONTyped,
    AmountEnumToJSON,
} from './AmountEnum';
import type { Subject } from './Subject';
import {
    SubjectFromJSON,
    SubjectFromJSONTyped,
    SubjectToJSON,
} from './Subject';

/**
 * 
 * @export
 * @interface FeedbackDTO
 */
export interface FeedbackDTO {
    /**
     * 
     * @type {string}
     * @memberof FeedbackDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof FeedbackDTO
     */
    title?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FeedbackDTO
     */
    rating?: number;
    /**
     * 
     * @type {string}
     * @memberof FeedbackDTO
     */
    comment?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FeedbackDTO
     */
    attendance?: number;
    /**
     * 
     * @type {boolean}
     * @memberof FeedbackDTO
     */
    understanding?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof FeedbackDTO
     */
    engagement?: boolean;
    /**
     * 
     * @type {number}
     * @memberof FeedbackDTO
     */
    assignmentCompletion?: number;
    /**
     * 
     * @type {AmountEnum}
     * @memberof FeedbackDTO
     */
    resources?: AmountEnum;
    /**
     * 
     * @type {AmountEnum}
     * @memberof FeedbackDTO
     */
    communication?: AmountEnum;
    /**
     * 
     * @type {Subject}
     * @memberof FeedbackDTO
     */
    subject?: Subject;
    /**
     * 
     * @type {string}
     * @memberof FeedbackDTO
     */
    subjectId?: string;
    /**
     * 
     * @type {Date}
     * @memberof FeedbackDTO
     */
    createdAt?: Date;
}

/**
 * Check if a given object implements the FeedbackDTO interface.
 */
export function instanceOfFeedbackDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeedbackDTOFromJSON(json: any): FeedbackDTO {
    return FeedbackDTOFromJSONTyped(json, false);
}

export function FeedbackDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeedbackDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'title': !exists(json, 'title') ? undefined : json['title'],
        'rating': !exists(json, 'rating') ? undefined : json['rating'],
        'comment': !exists(json, 'comment') ? undefined : json['comment'],
        'attendance': !exists(json, 'attendance') ? undefined : json['attendance'],
        'understanding': !exists(json, 'understanding') ? undefined : json['understanding'],
        'engagement': !exists(json, 'engagement') ? undefined : json['engagement'],
        'assignmentCompletion': !exists(json, 'assignmentCompletion') ? undefined : json['assignmentCompletion'],
        'resources': !exists(json, 'resources') ? undefined : AmountEnumFromJSON(json['resources']),
        'communication': !exists(json, 'communication') ? undefined : AmountEnumFromJSON(json['communication']),
        'subject': !exists(json, 'subject') ? undefined : SubjectFromJSON(json['subject']),
        'subjectId': !exists(json, 'subjectId') ? undefined : json['subjectId'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
    };
}

export function FeedbackDTOToJSON(value?: FeedbackDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'rating': value.rating,
        'comment': value.comment,
        'attendance': value.attendance,
        'understanding': value.understanding,
        'engagement': value.engagement,
        'assignmentCompletion': value.assignmentCompletion,
        'resources': AmountEnumToJSON(value.resources),
        'communication': AmountEnumToJSON(value.communication),
        'subject': SubjectToJSON(value.subject),
        'subjectId': value.subjectId,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
    };
}

