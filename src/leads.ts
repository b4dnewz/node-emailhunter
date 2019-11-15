import { HunterClient } from "./client";
import { Callback, ICreateLeadsOptions, IListLeadsOptions, LeadResponse, ListLeadsResponse } from "./interfaces";

/**
 * The Leads class can be instanciated only from the main class
 * it's intended for internal use only and is not exported from the package
 */
export default class Leads extends HunterClient {

    private readonly call: string = "leads";

    public list(options: IListLeadsOptions): Promise<ListLeadsResponse>;

    public list(options: IListLeadsOptions, callback: Callback<ListLeadsResponse>): void;

    /**
     * Returns all the leads already saved in your account.
     * The leads are returned in sorted order, with the most recent leads appearing first.
     * The optional parameters can be combined to filter the results.
     *
     * @see https://hunter.io/api/v2/docs#list-leads
     *
     * @example
     * hunter.leads.list({}, (err, res) => {
     *  console.log(res.data.leads);
     * });
     *
     * const res = await hunter.leads.list({});
     * console.log(res.data.leads);
     */
    public list(options: IListLeadsOptions, callback?: Callback<ListLeadsResponse>): Promise<ListLeadsResponse> | void {
        return this.run({
            callback,
            options,
            type: this.call,
        });
    }

    public retrieve(id: number): Promise<LeadResponse>;

    public retrieve(id: number, callback: Callback<LeadResponse>): void;

    /**
     * Retrieves all the fields of a lead.
     *
     * @see https://hunter.io/api/v2/docs#get-lead
     *
     * @example
     * hunter.leads.retrieve(1, (err, res) => {
     *  console.log(res);
     * });
     *
     * const res = await hunter.leads.retrieve(1);
     * console.log(res);
     */
    public retrieve(id: number, callback?: Callback<LeadResponse>): Promise<LeadResponse> | void {
        return this.run({
            callback,
            id,
            type: this.call,
        });
    }

    public create(options: ICreateLeadsOptions): Promise<LeadResponse>;

    public create(options: ICreateLeadsOptions, callback: Callback<LeadResponse>): void;

    /**
     * Creates a new lead. The parameters must be passed as a JSON hash.
     *
     * @see https://hunter.io/api/v2/docs#create-lead
     *
     * @example
     * hunter.leads.create({ email }, (err, res) => {
     *  console.log(res);
     * });
     *
     * const res = await hunter.leads.create({ email });
     * console.log(res);
     */
    public create(options: ICreateLeadsOptions, callback?: Callback<LeadResponse>): Promise<LeadResponse> | void {
        return this.run({
            action: "POST",
            callback,
            options,
            type: this.call,
        });
    }

    public update(id: number, options: any): Promise<void>;

    public update(id: number, options: any, callback: Callback<void>): void;

    /**
     * Updates an existing lead. The updated values must be passed as a JSON hash.
     * The fields you can update are the same params you can give when you create a lead.
     *
     * @see https://hunter.io/api/v2/docs#update-lead
     *
     * @example
     * hunter.leads.update(1, {
     *  company: 'New company name'
     * }, (err, res) => {});
     *
     * await hunter.leads.update(1, {
     *  company: 'New company name'
     * });
     */
    public update(id: number, options: ICreateLeadsOptions, callback?: Callback<void>): Promise<void> | void {
        return this.run({
            action: "PUT",
            callback,
            id,
            options,
            type: this.call,
        });
    }

    public delete(id: number, callback?: Callback<void>): Promise<void>;

    public delete(id: number, callback?: Callback<void>): void;

    /**
     * Deletes an existing lead.
     *
     * @see https://hunter.io/api/v2/docs#delete-lead
     *
     * @example
     * hunter.leads.delete(1, (err, res) => {});
     *
     * await hunter.leads.delete(1);
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
