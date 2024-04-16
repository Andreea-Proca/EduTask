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
 * @interface Feedback
 */
export interface Feedback {
    /**
     * 
     * @type {string}
     * @memberof Feedback
     */
    id?: string;
    /**
     * 
     * @type {Date}
     * @memberof Feedback
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof Feedback
     */
    updatedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof Feedback
     */
    title?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Feedback
     */
    rating?: number;
    /**
     * 
     * @type {string}
     * @memberof Feedback
     */
    comment?: string | null;
    /**
     * 
     * @type {number}
     * @memberof Feedback
     */
    attendance?: number;
    /**
     * 
     * @type {boolean}
     * @memberof Feedback
     */
    understanding?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof Feedback
     */
    engagement?: boolean;
    /**
     * 
     * @type {number}
     * @memberof Feedback
     */
    assignmentCompletion?: number;
    /**
     * 
     * @type {AmountEnum}
     * @memberof Feedback
     */
    resources?: AmountEnum;
    /**
     * 
     * @type {AmountEnum}
     * @memberof Feedback
     */
    communication?: AmountEnum;
    /**
     * 
     * @type {Subject}
     * @memberof Feedback
     */
    subject?: Subject;
    /**
     * 
     * @type {string}
     * @memberof Feedback
     */
    subjectId?: string;
}

/**
 * Check if a given object implements the Feedback interface.
 */
export function instanceOfFeedback(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function FeedbackFromJSON(json: any): Feedback {
    return FeedbackFromJSONTyped(json, false);
}

export function FeedbackFromJSONTyped(json: any, ignoreDiscriminator: boolean): Feedback {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
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
    };
}

export function FeedbackToJSON(value?: Feedback | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
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
    };
}

