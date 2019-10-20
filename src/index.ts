import axios, { AxiosInstance, AxiosResponse } from "axios";
import qs from "querystring";

import { CallbackFunction, DomainSearchOptions, EmailCountOptions, EmailFinderOptions } from "./interfaces";
import Leads from "./leads";
import LeadsList from "./leads_lists";

/**
 * A unofficial Hunter.io nodejs client
 */
export default class EmailHunter {

  public readonly endpoint: string = "https://api.hunter.io/v2";

  public readonly leads: Leads;
  public readonly leadsList: LeadsList;

  private readonly apiKey: string;
  private readonly instance: AxiosInstance;

  constructor(key: string) {
    if (!key || key === "") {
      throw new Error("You must enter the Hunter.io API key.");
    }

    this.apiKey = key;

    this.leads = new Leads(this);
    this.leadsList = new LeadsList(this);

    this.instance = axios.create({
      baseURL: this.endpoint,
      validateStatus(status) {
        return status >= 200 && status < 300;
      },
    });
  }

  /**
   * This API endpoint generates the most likely email address from a domain name, a first name and a last name.
   *
   * @see https://hunter.io/api/v2/docs#email-finder
   * @example
   * ```typescript
   *  await hunter.emailFinder({
   *    domain: "example.com",
   *    first_name: "John",
   *    last_name: "Doe",
   *  })
   * ```
   */
  public emailFinder(options: EmailFinderOptions, callback?: CallbackFunction) {
    return this.run({
      callback,
      options,
      type: "email-finder",
    });
  }

  /**
   * This API endpoint allows you to verify the deliverability of an email address.
   *
   * @see https://hunter.io/api/v2/docs#email-verifier
   * @example
   * ```typescript
   *  await hunter.emailVerifier("john.doe@example.com")
   * ```
   *
   */
  public emailVerifier(email: string, callback?: CallbackFunction) {
    return this.run({
      callback,
      options: { email },
      type: "email-verifier",
    });
  }

  /**
   * This API endpoint allows you to know how many email addresses we have for one domain.
   * It's free and doesn't require authentication.
   *
   * @see https://hunter.io/api/v2/docs#email-count
   * @example
   * ```typescript
   *  await hunter.emailCount("example.com")
   *  await hunter.emailCount({
   *    domain: "example.com",
   *    type: "personal"
   *  })
   * ```
   *
   */
  public emailCount(domain: string | EmailCountOptions, callback?: CallbackFunction) {
    const options = typeof domain === "object" ? domain : { domain };
    return this.run({
      callback,
      options,
      type: "email-count",
    });
  }

  /**
   * One key feature of Hunter is to search all the email addresses corresponding to one website.
   * You give one domain name and it returns all the email addresses using this domain name found on the internet.
   *
   * @see https://hunter.io/api/v2/docs#domain-search
   * @example
   * ```typescript
   *  await hunter.domainSearch({
   *    domain: "example.com"
   *  })
   * ```
   *
   */
  public domainSearch(options: DomainSearchOptions, callback?: CallbackFunction) {
    return this.run({
      callback,
      options,
      type: "domain-search",
    });
  }

  /**
   * This API endpoint enables you to get information regarding your Hunter account at any time.
   *
   * @see https://hunter.io/api/v2/docs#account
   * @example
   * ```typescript
   *  await hunter.account()
   * ```
   *
   */
  public account(callback?: CallbackFunction) {
    return this.run({
      callback,
      type: "account",
    });
  }

  /**
   * Call the Hunter.io api internally with specified options.
   * This method is not supposed to use directly.
   */
  public async run({
    action = "GET",
    type,
    id = null,
    options = {},
    callback = null,
  }) {
    const query = qs.stringify(options);
    const apiKey = qs.stringify({ api_key: this.apiKey });

    let req: Promise<AxiosResponse<any>>;
    let url = `${type}`;

    if (id) {
      url += `/${id}`;
    }

    url += `?${apiKey}`;

    // Switch request types
    switch (action) {
      case "POST":
        req = this.instance.post(url, options);
        break;
      case "PUT":
        req = this.instance.put(url, options);
        break;
      case "DELETE":
        req = this.instance.delete(url);
        break;
      case "GET":
      default:
        if (query) {
          url += "&" + query;
        }
        req = this.instance.get(url);
        break;
    }

    // Perform the request
    return req.then((res) => {
      if (callback) {
        callback(null, res.data);
      }
      return res.data;
    }).catch((err) => {
      err = err.response ? err.response.data : err;
      if (callback) {
        callback(err, null);
      }
      return Promise.reject(err);
    });
  }
}
