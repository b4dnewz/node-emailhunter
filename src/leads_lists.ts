import EmailHunter from "./index";

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
   * @example
   * hunter.leadsList.list({
   *  offset: 0,
   *  limit: 20
   * }, (err, res) => {
   *  console.log(res);
   * })
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
   * @example
   * hunter.leadsList.retrieve(1, (err, res) => {
   *  console.log(res);
   * })
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
   * @example
   * hunter.leadsList.create({
   *  name: 'New leads list'
   * }, (err, res) => {
   *  console.log(res);
   * })
   */
  public async create(options: ICreateOptions, callback?: CallbackFunction) {
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
   * @example
   * hunter.leadsList.update({
   *  name: 'New leads list name'
   * }, (err, res) => {
   *  console.log(res);
   * })
   */
  public async update(id: number, options: ICreateOptions, callback?: CallbackFunction) {
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
   * @example
   * hunter.leadsList.delete(1, (err, res) => {
   *  console.log(res);
   * })
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
