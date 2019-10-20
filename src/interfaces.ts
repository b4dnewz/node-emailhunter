export type EmailType = "personal" | "generic";
export type EmailSeniority = "junior" | "senior" | "executive";
export type EmailDepartment = "executive" | "it" | "finance" | "management"
  | "sales" | "legal" | "support"
  | "hr" | "marketing" | "communication";

export type CallbackFunction = (err: Error, res: any) => void;

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

export interface IListOptions {
  limit?: number;
  offset?: number;
}

/**
 * @see: https://hunter.io/api/v2/docs#create-leads-list
 */
export interface ICreateLeadsOptions {
  email: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  company?: string;
  company_industry?: string;
  company_size?: string;
  confidence_score?: string;
  website?: string;
  country_code?: string;
  linkedin_url?: string;
  phone_number?: string;
  twitter?: string;
  notes?: string;
  source?: string;
  leads_list_id?: number;
}

/**
 * @see: https://hunter.io/api/docs#list-leads
 */
export interface IListLeadsOptions extends IListOptions {
  lead_list_id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  company?: string;
  industry?: string;
  website?: string;
  twitter?: string;
}

/**
 * @see: https://hunter.io/api/v2/docs#create-leads-list
 */
export interface ICreateLeadsListOptions {
  name: string;
  team_id?: number;
}
