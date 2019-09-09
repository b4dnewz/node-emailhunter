type EmailType = "personal" | "generic";
type EmailSeniority = "junior" | "senior" | "executive";
type EmailDepartment = "executive" | "it" | "finance" | "management" | "sales" | "legal" | "support";

type CallbackFunction = (err: Error, res: any) => void;

type EmailCommonOptions = {
  domain: string
  company?: string,
} | {
  domain?: string
  company: string,
};

type DomainSearchOptions = EmailCommonOptions & IListOptions & {
  limit?: number
  offset?: number
  type?: EmailType
  seniority?: EmailSeniority
  department?: EmailDepartment,
};

type EmailCountOptions = EmailCommonOptions & {
  type?: EmailType,
};

type EmailFinderOptions = EmailCommonOptions & {
  first_name: string
  last_name: string
  full_name?: string,
} | {
  first_name?: string
  last_name?: string
  full_name: string,
};

interface ICreateLeadOptions {
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

interface IListOptions {
  limit?: number;
  offset?: number;
}

interface ICreateOptions {
  name: string;
  team_id?: number;
}

interface IListOptions {
  limit?: number;
  offset?: number;
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
