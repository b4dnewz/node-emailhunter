/**
 * The Leads class can be instanciated only from the main class
 * it's intended for internal use only and is not exported from the package
 */
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
   * @example
   * hunter.leads.list({}, (err, res) => {
   *  console.log(res);
   * })
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
   * @param  {number}   id       Identifier of the lead.
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leads.retrieve(1, (err, res) => {
   *  console.log(res);
   * })
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
   * @example
   * hunter.leads.create({}, (err, res) => {
   *  console.log(res);
   * })
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
   * @param  {number}   id       Identifier of the lead.
   * @param  {Object}   options  The fields to update
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leads.update(1, {
   *  company: 'New company name'
   * }, (err, res) => {
   *  console.log(res);
   * })
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
   * @param  {number}   id       Identifier of the lead.
   * @param  {Function} callback The callback to run when operation is over
   * @example
   * hunter.leads.delete(1, (err, res) => {
   *  console.log(res);
   * })
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
