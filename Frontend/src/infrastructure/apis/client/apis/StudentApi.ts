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
  RequestResponse,
  StudentAddDTO,
  StudentDTOPagedResponseRequestResponse,
  StudentDTORequestResponse,
  StudentUpdateDTO,
} from '../models';
import {
    RequestResponseFromJSON,
    RequestResponseToJSON,
    StudentAddDTOFromJSON,
    StudentAddDTOToJSON,
    StudentDTOPagedResponseRequestResponseFromJSON,
    StudentDTOPagedResponseRequestResponseToJSON,
    StudentDTORequestResponseFromJSON,
    StudentDTORequestResponseToJSON,
    StudentUpdateDTOFromJSON,
    StudentUpdateDTOToJSON,
} from '../models';

export interface ApiStudentAddPostRequest {
    studentAddDTO?: StudentAddDTO;
}

export interface ApiStudentDeleteIdDeleteRequest {
    id: string;
}

export interface ApiStudentGetByIdIdGetRequest {
    id: string;
}

export interface ApiStudentGetPageGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiStudentUpdatePutRequest {
    studentUpdateDTO?: StudentUpdateDTO;
}

/**
 * 
 */
export class StudentApi extends runtime.BaseAPI {

    /**
     */
    async apiStudentAddPostRaw(requestParameters: ApiStudentAddPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Student/Add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: StudentAddDTOToJSON(requestParameters.studentAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiStudentAddPost(requestParameters: ApiStudentAddPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiStudentAddPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiStudentDeleteIdDeleteRaw(requestParameters: ApiStudentDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiStudentDeleteIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Student/Delete/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiStudentDeleteIdDelete(requestParameters: ApiStudentDeleteIdDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiStudentDeleteIdDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiStudentGetByIdIdGetRaw(requestParameters: ApiStudentGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StudentDTORequestResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling apiStudentGetByIdIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Student/GetById/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StudentDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiStudentGetByIdIdGet(requestParameters: ApiStudentGetByIdIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StudentDTORequestResponse> {
        const response = await this.apiStudentGetByIdIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiStudentGetPageGetRaw(requestParameters: ApiStudentGetPageGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<StudentDTOPagedResponseRequestResponse>> {
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
            path: `/api/Student/GetPage`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => StudentDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiStudentGetPageGet(requestParameters: ApiStudentGetPageGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<StudentDTOPagedResponseRequestResponse> {
        const response = await this.apiStudentGetPageGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiStudentUpdatePutRaw(requestParameters: ApiStudentUpdatePutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Student/Update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: StudentUpdateDTOToJSON(requestParameters.studentUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiStudentUpdatePut(requestParameters: ApiStudentUpdatePutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiStudentUpdatePutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}