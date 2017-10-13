/**
 * The LeadsList class can be instanciated only from the main class
 * it's intended for internal use only and is not exported from the package
 */
export default class LeadsList {
  constructor(parent) {
    this.parent = parent;
  }

  /**
   * Returns all the leads lists already saved in your account.
   * The leads lists are returned in sorted order, with the most recent leads lists appearing first.
   * @see https://hunter.io/api/docs#list-leads-lists
   * @param  {object}   options  The leads_list list optional arguments
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leadsList.list({
   *  offset: 0,
   *  limit: 20
   * }, (err, res) => {
   *  console.log(res);
   * })
   */
  list(options, callback) {
    return this.parent.run({
      type: 'leads_list',
      options,
      callback
    });
  }

  /**
   * Retrieves all the fields of a leads list.
   * @see https://hunter.io/api/docs#get-leads-list
   * @param  {number}   id       Identifier of the leads list.
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leadsList.retrieve(1, (err, res) => {
   *  console.log(res);
   * })
   */
  retrieve(id, callback) {
    return this.parent.run({
      type: 'leads_list',
      id,
      callback
    });
  }

  /**
   * Creates a new leads list. The parameters must be passed as a JSON hash.
   * @see https://hunter.io/api/docs#create-leads-list
   * @param  {Object}   options  The leads_list create arguments
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leadsList.create({
   *  name: 'New leads list'
   * }, (err, res) => {
   *  console.log(res);
   * })
   */
  create(options, callback) {
    return this.parent.run({
      action: 'POST',
      type: 'leads_list',
      options,
      callback
    });
  }

  /**
   * Updates an existing leads list. The updated values must be passed as a JSON hash.
   * @see https://hunter.io/api/v2/docs#update-leads-list
   * @param  {number}   id       The lead id number
   * @param  {Object}   options  The fields to update
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leadsList.update({
   *  name: 'New leads list name'
   * }, (err, res) => {
   *  console.log(res);
   * })
   */
  update(id, options, callback) {
    return this.parent.run({
      action: 'PUT',
      type: 'leads_list',
      id,
      options,
      callback
    });
  }

  /**
   * Deletes an existing leads list.
   * @see https://hunter.io/api/docs#delete-leads-list
   * @param  {number}   id       Identifier of the leads list.
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leadsList.delete(1, (err, res) => {
   *  console.log(res);
   * })
   */
  delete(id, callback) {
    return this.parent.run({
      action: 'DELETE',
      type: 'leads_list',
      id,
      callback
    });
  }
}
