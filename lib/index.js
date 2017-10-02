'use strict';

// Script dependencies
import axios from 'axios';
import qs from 'querystring';

// Hunter.io API Endopoint V2
const API_ENDPOINT = 'https://api.hunter.io/v2';

// Clear object from properties with empty values
const clean = object => {
  return Object.keys(object).reduce((r, e) => {
    if (typeof object[e] !== 'undefined' && object[e] !== null && object[e] !== '') {
      r[e] = object[e];
    }
    return r;
  }, {});
};

export class EmailHunter {
  constructor(key) {
    // Exit if key is empty
    if (!key || key === '') {
      throw new Error('You must enter the Hunter.io API key.');
    }

    // Set the api key
    this.apiKey = key;
  }

  // Do the http call
  run({ action = 'GET', type, id = '', options = {}, callback = () => {} }) {
    // Build the request url
    let query = qs.stringify(options);
    let apiKey = qs.stringify({ api_key: this.apiKey });

    // The xhr request object
    let req = null;

    // Basic url
    let url = `${API_ENDPOINT}/${type}/${id}?${apiKey}`;

    // Clean null values and empty strings
    options = clean(options);

    // Switch request types
    switch (action) {
      case 'POST':
        req = axios.post(url, options);
        break;
      case 'PUT':
        req = axios.put(url, options);
        break;
      case 'DELETE':
        req = axios.delete(url);
        break;
      default:
        if (query) {
          url += '&' + query;
        }
        req = axios.get(url);
        break;
    }

    // Perform the request
    return req.then(res => callback(null, res.data)).catch(err => {
      err = err.response ? err.response.data : err;
      callback(err);
    });
  }

  /**
   * The object which contains all the leads methods
   * @see https://hunter.io/api/v2/docs#leads
   * @return {Object} The leads API methods
   */
  get leads() {
    const self = this;
    return {
      /**
       * Returns all the leads already saved in your account.
       * The leads are returned in sorted order, with the most recent leads appearing first.
       * The optional parameters can be combined to filter the results.
       * @see https://hunter.io/api/v2/docs#list-leads
       * @param  {object}   options  The leads list optional arguments
       * @param  {Function} callback The callback to run when operation is over
       */
      list: function(options, callback) {
        return self.run({
          type: 'leads',
          options,
          callback
        });
      },

      /**
       * Retrieves all the fields of a lead.
       * @see https://hunter.io/api/v2/docs#get-lead
       * @param  {number}   id       The lead id number
       * @param  {Function} callback The callback to run when operation is over
       */
      retrieve: function(id, callback) {
        return self.run({
          type: 'leads',
          id,
          callback
        });
      },

      /**
       * Creates a new lead. The parameters must be passed as a JSON hash.
       * @see https://hunter.io/api/v2/docs#create-lead
       * @param  {Object}   options  The leads create arguments
       * @param  {Function} callback The callback to run when operation is over
       */
      create: function(options, callback) {
        return self.run({
          action: 'POST',
          type: 'leads',
          options,
          callback
        });
      },

      /**
       * Updates an existing lead. The updated values must be passed as a JSON hash.
       * The fields you can update are the same params you can give when you create a lead.
       * @see https://hunter.io/api/v2/docs#update-lead
       * @param  {number}   id       The lead id number
       * @param  {Object}   options  The fields to update
       * @param  {Function} callback The callback to run when operation is over
       */
      update: function(id, options, callback) {
        return self.run({
          action: 'PUT',
          type: 'leads',
          id,
          options,
          callback
        });
      },

      /**
       * Deletes an existing lead.
       * @see https://hunter.io/api/v2/docs#delete-lead
       * @param  {number}   id       The lead id number
       * @param  {Function} callback The callback to run when operation is over
       */
      delete: function(id, callback) {
        return self.run({
          action: 'DELETE',
          type: 'leads',
          id,
          callback
        });
      }
    };
  }

  /**
   * The object which contains all the leads_list methods
   * @return {Object} The leads_list API methods
   */
  get leadsList() {}

  /**
   * This API endpoint generates the most likely email address from a domain name, a first name and a last name.
   * @see https://hunter.io/api/v2/docs#email-finder
   */
  emailFinder(options, callback) {
    return this.run({
      type: 'email-finder',
      options,
      callback
    });
  }

  /**
   * This API endpoint allows you to verify the deliverability of an email address.
   * @see https://hunter.io/api/v2/docs#email-verifier
   */
  emailVerifier(email, callback) {
    const options = typeof email === 'object' ? email : { email };
    return this.run({
      type: 'email-verifier',
      options,
      callback
    });
  }

  /**
   * This API endpoint allows you to know how many email addresses we have for one domain. It's free and doesn't require authentication.
   * @see https://hunter.io/api/v2/docs#email-count
   */
  emailCount(domain, callback) {
    const options = typeof domain === 'object' ? domain : { domain };
    return this.run({
      type: 'email-count',
      options,
      callback
    });
  }

  /**
   * One key feature of Hunter is to search all the email addresses corresponding to one website.
   * You give one domain name and it returns all the email addresses using this domain name found on the internet.
   * @see https://hunter.io/api/v2/docs#domain-search
   */
  domainSearch(options, callback) {
    return this.run({
      type: 'domain-search',
      options,
      callback
    });
  }

  /**
   * This API endpoint enables you to get information regarding your Hunter account at any time.
   * @see https://hunter.io/api/v2/docs#account
   */
  account(callback) {
    return this.run({
      type: 'account',
      callback
    });
  }
}

// Export the module
module.exports = EmailHunter;
