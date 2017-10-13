export default class Leads {
  constructor(parent) {
    this.parent = parent;
  }

  /**
   * Returns all the leads already saved in your account.
   * The leads are returned in sorted order, with the most recent leads appearing first.
   * The optional parameters can be combined to filter the results.
   * @see https://hunter.io/api/v2/docs#list-leads
   * @param  {object}   options  The leads list optional arguments
   * @param  {Function} callback The callback to run when operation is over
   */
  list(options, callback) {
    return this.parent.run({
      type: 'leads',
      options,
      callback
    });
  }

  /**
   * Retrieves all the fields of a lead.
   * @see https://hunter.io/api/v2/docs#get-lead
   * @param  {number}   id       The lead id number
   * @param  {Function} callback The callback to run when operation is over
   */
  retrieve(id, callback) {
    return this.parent.run({
      type: 'leads',
      id,
      callback
    });
  }

  /**
   * Creates a new lead. The parameters must be passed as a JSON hash.
   * @see https://hunter.io/api/v2/docs#create-lead
   * @param  {Object}   options  The leads create arguments
   * @param  {Function} callback The callback to run when operation is over
   */
  create(options, callback) {
    return this.parent.run({
      action: 'POST',
      type: 'leads',
      options,
      callback
    });
  }

  /**
   * Updates an existing lead. The updated values must be passed as a JSON hash.
   * The fields you can update are the same params you can give when you create a lead.
   * @see https://hunter.io/api/v2/docs#update-lead
   * @param  {number}   id       The lead id number
   * @param  {Object}   options  The fields to update
   * @param  {Function} callback The callback to run when operation is over
   */
  update(id, options, callback) {
    return this.parent.run({
      action: 'PUT',
      type: 'leads',
      id,
      options,
      callback
    });
  }

  /**
   * Deletes an existing lead.
   * @see https://hunter.io/api/v2/docs#delete-lead
   * @param  {number}   id       The lead id number
   * @param  {Function} callback The callback to run when operation is over
   */
  delete(id, callback) {
    return this.parent.run({
      action: 'DELETE',
      type: 'leads',
      id,
      callback
    });
  }
}
