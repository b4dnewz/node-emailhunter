import { IErrorResponse, IListOptions } from ".";

export enum EmailType {
    "personal",
    "generic",
}

export enum EmailSeniority {
    "junior",
    "senior",
    "£executive",
}

export enum EmailDepartment {
    "executive",
    "it",
    "finance",
    "management",
    "sales",
    "legal",
    "support",
    "hr",
    "marketing",
    "communication",
}

export type Callback<T> = (err: Error | IErrorResponse, res: T) => void;

export type DomainOrCompany = {
    domain: string
    company?: string,
} | {
    domain?: string
    company: string,
};

/**
 * @see: https://hunter.io/api/docs#domain-search
 */
export type DomainSearchOptions = DomainOrCompany & IListOptions & {
    type?: EmailType
    seniority?: EmailSeniority
    department?: EmailDepartment,
};

/**
 * @see: https://hunter.io/api/docs#email-count
 */
export type EmailCountOptions = DomainOrCompany & {
    type?: EmailType,
};

/**
 * @see: https://hunter.io/api/docs#email-finder
 */
export type EmailFinderOptions = DomainOrCompany & {
    first_name: string
    last_name: string
    full_name?: string,
} | {
    first_name?: string
    last_name?: string
    full_name: string,
};

export type DepartmentScores = {
    [key in keyof typeof EmailDepartment]: number;
};

export type SeniorityScores = {
    [key in keyof typeof EmailSeniority]: number;
};
