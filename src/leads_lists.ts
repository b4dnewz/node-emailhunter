import { HunterClient } from "./client";
import { Callback, ICreateLeadsListOptions, IListOptions, LeadListsListResponse, LeadsListResponse } from "./interfaces";

/**
 * The LeadsList class can be instanciated only from the main class
 * it's intended for internal use only and is not exported from the package
 */
export default class LeadsList extends HunterClient {

    private readonly call: string = "leads_lists";

    public list(options: IListOptions): Promise<LeadListsListResponse>;

    public list(options: IListOptions, callback: Callback<LeadListsListResponse>): void;

    /**
     * Returns all the leads lists already saved in your account.
     * The leads lists are returned in sorted order, with the most recent leads lists appearing first.
     * @see https://hunter.io/api/docs#list-leads-lists
     */
    public list(options: IListOptions, callback?: Callback<LeadListsListResponse>): Promise<LeadListsListResponse> | void {
        return this.run({
            callback,
            options,
            type: this.call,
        });
    }

    public retrieve(id: number): Promise<LeadsListResponse>;

    public retrieve(id: number, callback: Callback<LeadsListResponse>): void;

    /**
     * Retrieves all the fields of a leads list.
     * @see https://hunter.io/api/docs#get-leads-list
     */
    public retrieve(id: number, callback?: Callback<LeadsListResponse>): Promise<LeadsListResponse> | void {
        return this.run({
            callback,
            id,
            type: this.call,
        });
    }

    public create(options: ICreateLeadsListOptions): Promise<LeadsListResponse>;

    public create(options: ICreateLeadsListOptions, callback: Callback<LeadsListResponse>): void;

    /**
     * Creates a new leads list. The parameters must be passed as a JSON hash.
     * @see https://hunter.io/api/docs#create-leads-list
     */
    public create(options: ICreateLeadsListOptions, callback?: Callback<LeadsListResponse>): Promise<LeadsListResponse> | void {
        return this.run({
            action: "POST",
            callback,
            options,
            type: this.call,
        });
    }

    public update(id: number, options: ICreateLeadsListOptions): Promise<void>;

    public update(id: number, options: ICreateLeadsListOptions, callback: Callback<void>): void;

    /**
     * Updates an existing leads list. The updated values must be passed as a JSON hash.
     * @see https://hunter.io/api/v2/docs#update-leads-list
     */
    public update(id: number, options: ICreateLeadsListOptions, callback?: Callback<void>): Promise<void> | void {
        return this.run({
            action: "PUT",
            callback,
            id,
            options,
            type: this.call,
        });
    }

    public delete(id: number): Promise<void>;

    public delete(id: number, callback: Callback<void>): void;

    /**
     * Deletes an existing leads list.
     * @see https://hunter.io/api/docs#delete-leads-list
     */
    public delete(id: number, callback?: Callback<void>): Promise<void> | void {
        return this.run({
            action: "DELETE",
            callback,
            id,
            type: this.call,
        });
    }
}
