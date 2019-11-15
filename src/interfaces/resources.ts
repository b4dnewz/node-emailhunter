export interface ISource {
    domain: string;
    uri: string;
    extracted_on: string;
    last_seen_on: string;
    still_on_page: boolean;
}

export interface IEmail {
    value: string;
    type: string;
    confidence: number;
    sources: ISource[];
    first_name: string;
    last_name: string;
    position: string;
    seniority: string;
    department: string;
    linkedin: string;
    twitter: string;
    phone_number: string;
}

export interface ILead {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    position: string;
    company_industry: string;
    company_size: string;
    confidence_score: number;
    website: string;
    country_code: string;
    source: string;
    linkedin_url: string;
    phone_number: string;
    twitter: string;
    sync_status: string;
    notes: string;
    sending_status: string;
    last_activity_at: string;
    leads_list: Omit<ILeadsList, "leads">;
}

export interface ILeadsList {
    id: number;
    name: string;
    leads_count: number;
    team_id: number;
    leads?: ILead[];
}
