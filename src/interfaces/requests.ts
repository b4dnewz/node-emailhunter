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
