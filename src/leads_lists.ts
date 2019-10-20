import EmailHunter from "./index";
import { CallbackFunction, ICreateLeadsListOptions, IListOptions } from "./interfaces";

/**
 * The LeadsList class can be instanciated only from the main class
 * it's intended for internal use only and is not exported from the package
 */
export default class LeadsList {

  public readonly parent: EmailHunter;

  constructor(parent: EmailHunter) {
    this.parent = parent;
  }

  /**
   * Returns all the leads lists already saved in your account.
   * The leads lists are returned in sorted order, with the most recent leads lists appearing first.
   *
   * @see https://hunter.io/api/docs#list-leads-lists
   *
   */
  public async list(options: IListOptions, callback?: CallbackFunction) {
    return this.parent.run({
      callback,
      options,
      type: "leads_lists",
    });
  }

  /**
   * Retrieves all the fields of a leads list.
   *
   * @see https://hunter.io/api/docs#get-leads-list
   *
   */
  public async retrieve(id: number, callback?: CallbackFunction) {
    return this.parent.run({
      callback,
      id,
      type: "leads_lists",
    });
  }

  /**
   * Creates a new leads list. The parameters must be passed as a JSON hash.
   *
   * @see https://hunter.io/api/docs#create-leads-list
   *
   */
  public async create(options: ICreateLeadsListOptions, callback?: CallbackFunction) {
    return this.parent.run({
      action: "POST",
      callback,
      options,
      type: "leads_lists",
    });
  }

  /**
   * Updates an existing leads list. The updated values must be passed as a JSON hash.
   *
   * @see https://hunter.io/api/v2/docs#update-leads-list
   *
   */
  public async update(id: number, options: ICreateLeadsListOptions, callback?: CallbackFunction) {
    return this.parent.run({
      action: "PUT",
      callback,
      id,
      options,
      type: "leads_lists",
    });
  }

  /**
   * Deletes an existing leads list.
   *
   * @see https://hunter.io/api/docs#delete-leads-list
   *
   */
  public async delete(id: number, callback?: CallbackFunction) {
    return this.parent.run({
      action: "DELETE",
      callback,
      id,
      type: "leads_lists",
    });
  }
}
