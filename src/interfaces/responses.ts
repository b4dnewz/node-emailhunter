import {
    DepartmentScores,
    DomainSearchOptions,
    EmailCountOptions,
    IEmailVerifierOptions,
    IListOptions,
    SeniorityScores,
} from ".";

import { IEmail, ILead, ILeadsList, ISource } from "./resources";

/**
 * The standard Hunter.io API successfull response interface
 * @see https://hunter.io/api/docs#structure
 */
export interface IResponse<T, M = null> {
    data: T;
    meta?: M;
}

/**
 * The standard Hunter.io API error response interface
 * @see https://hunter.io/api/docs#structure
 */
export interface IErrorResponse {
    errors: any;
}

/**
 * The response object for email-finder call
 * @see https://hunter.io/api/v2/docs#email-finder
 */
export type EmailFinderResponse = IResponse<IEmailFinderResult, IEmailFinderResultMeta>;

/**
 * The response object for email-verifier call
 * @see https://hunter.io/api/v2/docs#email-verifier
 */
export type EmailVerifierResponse = IResponse<IEmailFinderResult, IEmailFinderResultMeta>;

/**
 * The response object for email-count call
 * @see https://hunter.io/api/v2/docs#email-count
 */
export type EmailCountResponse = IResponse<IEmailCountResult, IEmailCountResultMeta>;

/**
 * The response object for domain-search call
 * @see https://hunter.io/api/v2/docs#domain-search
 */
export type DomainSearchResponse = IResponse<IDomainSearchResult, IDomainSearchResultMeta>;

/**
 * The response object for account call
 * @see https://hunter.io/api/v2/docs#account
 */
export type AccountResponse = IResponse<IAccount>;

export type ListLeadsResponse = IResponse<IListLeadsResult, IListLeadsResultMeta>;

export type LeadResponse = IResponse<ILead>;

export type LeadsListResponse = IResponse<ILeadsList>;

export type LeadListsListResponse = IResponse<IListLeadsListsResult, IListLeadsListsResultMeta>;

export interface IListLeadsListsResult {
    leads_lists: ILeadsList[];
}

export interface IListLeadsListsResultMeta {
    total: number;
}

export interface IListLeadsResult {
    leads: ILead[];
}

export interface IListLeadsResultMeta {
    count: number;
    total: number;
    params: IListOptions;
}

export interface IEmailCountResult {
    total: number;
    personal_emails: number;
    generic_emails: number;
    department: DepartmentScores;
    seniority: SeniorityScores;
}

export interface IEmailCountResultMeta {
    params: EmailCountOptions;
}

export interface IEmailVerifierResult {
    result: string;
    score: number;
    email: number;
    regexp: boolean;
    gibberish: boolean;
    disposable: boolean;
    webmail: boolean;
    mx_records: boolean;
    smtp_server: boolean;
    smtp_check: boolean;
    accept_all: boolean;
    block: boolean;
    sources: ISource[];
}

export interface IEmailVerifierResultMeta {
    params: IEmailVerifierOptions;
}

export interface IEmailFinderResult {
    first_name: string;
    last_name: string;
    email: string;
    score: number;
    domain: string;
    position: string;
    twitter: string;
    linkedin_url: string;
    phone_number: string;
    company: string;
    sources: ISource[];
}

export interface IEmailFinderResultMeta {
    params: {
        first_name: string;
        last_name: string;
        full_name: string;
        domain: string;
        company: string;
    };
}

export interface IDomainSearchResult {
    domain: string;
    disposable: boolean;
    webmail: boolean;
    pattern: string;
    organization: string;
    emails: IEmail[];
}

export interface IDomainSearchResultMeta {
    results: number;
    limit: number;
    offset: number;
    params: DomainSearchOptions;
}

export interface IAccount {
    first_name: string;
    last_name: string;
    email: string;
    plan_name: string;
    plan_level: number;
    reset_date: string;
    team_id: number;
    calls: {
        user: number;
        available: number;
    };

}
