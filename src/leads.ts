import EmailHunter from "./index";
import { CallbackFunction, ICreateLeadsOptions, IListLeadsOptions } from "./interfaces";

/**
 * The Leads class can be instanciated only from the main class
 * it's intended for internal use only and is not exported from the package
 */
export default class Leads {

  public readonly parent: EmailHunter;

  constructor(parent: EmailHunter) {
    this.parent = parent;
  }

  /**
   * Returns all the leads already saved in your account.
   * The leads are returned in sorted order, with the most recent leads appearing first.
   * The optional parameters can be combined to filter the results.
   *
   * @see https://hunter.io/api/v2/docs#list-leads
   *
   * @example
   * hunter.leads.list({}, (err, res) => {
   *  console.log(res);
   * })
   */
  public async list(options: IListLeadsOptions, callback?: CallbackFunction) {
    return this.parent.run({
      callback,
      options,
      type: "leads",
    });
  }

  /**
   * Retrieves all the fields of a lead.
   *
   * @see https://hunter.io/api/v2/docs#get-lead
   *
   * @example
   * hunter.leads.retrieve(1, (err, res) => {
   *  console.log(res);
   * })
   */
  public async retrieve(id: number, callback?: CallbackFunction) {
    return this.parent.run({
      callback,
      id,
      type: "leads",
    });
  }

  /**
   * Creates a new lead. The parameters must be passed as a JSON hash.
   *
   * @see https://hunter.io/api/v2/docs#create-lead
   *
   * @example
   * hunter.leads.create({}, (err, res) => {
   *  console.log(res);
   * })
   */
  public async create(options: ICreateLeadsOptions, callback?: CallbackFunction) {
    return this.parent.run({
      action: "POST",
      callback,
      options,
      type: "leads",
    });
  }

  /**
   * Updates an existing lead. The updated values must be passed as a JSON hash.
   * The fields you can update are the same params you can give when you create a lead.
   *
   * @see https://hunter.io/api/v2/docs#update-lead
   *
   * @example
   * hunter.leads.update(1, {
   *  company: 'New company name'
   * }, (err, res) => {
   *  console.log(res);
   * })
   */
  public async update(id: number, options: any, callback?: CallbackFunction) {
    return this.parent.run({
      action: "PUT",
      callback,
      id,
      options,
      type: "leads",
    });
  }

  /**
   * Deletes an existing lead.
   *
   * @see https://hunter.io/api/v2/docs#delete-lead
   *
   * @example
   * hunter.leads.delete(1, (err, res) => {
   *  console.log(res);
   * })
   */
  public async delete(id: number, callback?: CallbackFunction) {
    return this.parent.run({
      action: "DELETE",
      callback,
      id,
      type: "leads",
    });
  }
}
