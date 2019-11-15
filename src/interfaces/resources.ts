export interface ILead {
  id: number;
}

export interface ILeadsList {
  id: number;
  name: string;
  leads_count: number;
  team_id: number;
  leads?: ILead[];
}
