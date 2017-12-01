'use strict';

// Script dependencies
import axios from 'axios';
import qs from 'querystring';

// Sub modules
import Leads from './leads.js';
import LeadsList from './leads_list.js';

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

/**
 * The unoffial Hunter.io javascript client
 */
export default class EmailHunter {
  constructor(key) {
    // Exit if key is empty
    if (!key || key === '') {
      throw new Error('You must enter the Hunter.io API key.');
    }

    /**
     * The Hunter.io api key
     * @type {String}
     */
    this.apiKey = key;
  }

  /**
   * Call the Hunter.io api internally with specified options
   * @param  {String} [action='GET'] The http action to call
   * @param  {String} type           The api endpoint name
   * @param  {String} [id='']        An optional id number for emails or leads
   * @param  {Object} [options={}]   The api call params
   * @param  {Function} [callback=()=>{}}] The callback to run once has done
   */
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
   * @return {Leads} The leads API methods
   */
  get leads() {
    return new Leads(this);
  }

  /**
   * The object which contains all the leads_list methods
   * @return {LeadsList} The leads_list API methods
   */
  get leadsList() {
    return new LeadsList(this);
  }

  /**
   * This API endpoint generates the most likely email address from a domain name, a first name and a last name.
   * @param  {Object} options The call options
   * @param  {Function} callback The callback to run when operation is over
   * @see https://hunter.io/api/v2/docs#email-finder
   *
   * @example
   * hunter.emailFinder({
   *  domain: 'google.com',
   *  first_name: 'John',
   *  last_name: 'Doe'
   * }, (err, res) => {
   *  console.log(res);
   * })
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
   * @param  {String|Object} options The email to verify
   * @param  {Function} callback The callback to run when operation is over
   * @see https://hunter.io/api/v2/docs#email-verifier
   *
   * @example
   * hunter.emailVerifier('test@google.com', (err, res) => {
   *  console.log(res);
   * })
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
   * This API endpoint allows you to know how many email addresses we have for one domain.
   * It's free and doesn't require authentication.
   * @param  {String|Object} domain The domain to check
   * @param  {Function} callback The callback to run when operation is over
   * @see https://hunter.io/api/v2/docs#email-count
   *
   * @example
   * hunter.emailCount('google.com', (err, res) => {
   *  console.log(res);
   * })
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
   * @param  {Object} options The call options
   * @param  {Function} callback The callback to run when operation is over
   * @see https://hunter.io/api/v2/docs#domain-search
   *
   * @example
   * hunter.domainSearch({
   *  domain: 'example.com',
   *  company: 'Example Company'
   * }, (err, result) => { });
   *
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
   * @param  {Function} callback The callback to run when operation is over
   * @see https://hunter.io/api/v2/docs#account
   *
   * @example
   * hunter.account((err, res) => {
   *  console.log(res);
   * })
   */
  account(callback) {
    return this.run({
      type: 'account',
      callback
    });
  }
}
