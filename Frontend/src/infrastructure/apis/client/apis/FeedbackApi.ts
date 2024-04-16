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


import * as runtime from '../runtime';
import type {
  FeedbackAddDTO,
  FeedbackDTOListRequestResponse,
  FeedbackDTOPagedResponseRequestResponse,
  FeedbackDTORequestResponse,
  FeedbackUpdateDTO,
  RequestResponse,
} from '../models';
import {
    FeedbackAddDTOFromJSON,
    FeedbackAddDTOToJSON,
    FeedbackDTOListRequestResponseFromJSON,
    FeedbackDTOListRequestResponseToJSON,
    FeedbackDTOPagedResponseRequestResponseFromJSON,
    FeedbackDTOPagedResponseRequestResponseToJSON,
    FeedbackDTORequestResponseFromJSON,
    FeedbackDTORequestResponseToJSON,
    FeedbackUpdateDTOFromJSON,
    FeedbackUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiFeedbackAddPostRequest {
    feedbackAddDTO?: FeedbackAddDTO;
}

export interface ApiFeedbackDeleteIdDeleteRequest {
    id: string;
}

export interface ApiFeedbackGetByIdIdGetRequest {
    id: string;
}

export interface ApiFeedbackGetFeedbacksBySubjectSubjectSubjectIdGetRequest {
    subjectId: string;
}

export interface ApiFeedbackGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiFeedbackUpdatePutRequest {
    feedbackUpdateDTO?: FeedbackUpdateDTO;
}

/**
 * 
 */
export class FeedbackApi extends runtime.BaseAPI {

    /**
     */
    async apiFeedbackAddPostRaw(requestParameters: ApiFeedbackAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FeedbackAddDTOToJSON(requestParameters.feedbackAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackAddPost(requestParameters: ApiFeedbackAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiFeedbackAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackDeleteIdDeleteRaw(requestParameters: ApiFeedbackDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiFeedbackDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackDeleteIdDelete(requestParameters: ApiFeedbackDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiFeedbackDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackGetByIdIdGetRaw(requestParameters: ApiFeedbackGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FeedbackDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiFeedbackGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeedbackDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackGetByIdIdGet(requestParameters: ApiFeedbackGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FeedbackDTORequestResponse> {
        const response = await this.apiFeedbackGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackGetFeedbacksBySubjectSubjectSubjectIdGetRaw(requestParameters: ApiFeedbackGetFeedbacksBySubjectSubjectSubjectIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FeedbackDTOListRequestResponse>> {
        if (requestParameters.subjectId === null || requestParameters.subjectId === undefined) {
            throw new runtime.RequiredError('subjectId','Required parameter requestParameters.subjectId was null or undefined when calling apiFeedbackGetFeedbacksBySubjectSubjectSubjectIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/GetFeedbacksBySubject/subject/{subjectId}`.replace(`{${"subjectId"}}`, encodeURIComponent(String(requestParameters.subjectId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeedbackDTOListRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackGetFeedbacksBySubjectSubjectSubjectIdGet(requestParameters: ApiFeedbackGetFeedbacksBySubjectSubjectSubjectIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FeedbackDTOListRequestResponse> {
        const response = await this.apiFeedbackGetFeedbacksBySubjectSubjectSubjectIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackGetPageGetRaw(requestParameters: ApiFeedbackGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<FeedbackDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeedbackDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackGetPageGet(requestParameters: ApiFeedbackGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<FeedbackDTOPagedResponseRequestResponse> {
        const response = await this.apiFeedbackGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiFeedbackUpdatePutRaw(requestParameters: ApiFeedbackUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Feedback/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: FeedbackUpdateDTOToJSON(requestParameters.feedbackUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiFeedbackUpdatePut(requestParameters: ApiFeedbackUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiFeedbackUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
