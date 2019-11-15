import { IListOptions } from "./requests";

export * from "./resources";
export * from "./requests";
export * from "./responses";

export type EmailType = "personal" | "generic";
export type EmailSeniority = "junior" | "senior" | "executive";
export type EmailDepartment = "executive" | "it" | "finance" | "management"
  | "sales" | "legal" | "support"
  | "hr" | "marketing" | "communication";

export type Callback<T> = (err: Error, res: T) => void;

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
