import { AxiosRequestConfig } from "axios";

import { HunterClient } from "./client";
import {
    AccountResponse,
    Callback,
    DomainSearchOptions,
    DomainSearchResponse,
    EmailCountOptions,
    EmailCountResponse,
    EmailFinderOptions,
    EmailFinderResponse,
    EmailVerifierResponse,
} from "./interfaces";
import Leads from "./leads";
import LeadsList from "./leads_lists";

export * from "./interfaces";

/**
 * A unofficial Hunter.io nodejs client
 */
export default class EmailHunter extends HunterClient {

    /**
     * Child class used to manage account leads
     */
    public readonly leads: Leads;

    /**
     * Child class used to manage account leads lists
     */
    public readonly leadsList: LeadsList;

    constructor(key: string, opts?: AxiosRequestConfig) {
        if (!key || key === "") {
            throw new Error("You must enter the Hunter.io API key.");
        }

        super({
            apiKey: key,
            ...opts,
        });

        this.leads = new Leads({
            apiKey: key,
            ...this,
        });

        this.leadsList = new LeadsList({
            apiKey: key,
            ...this,
        });
    }

    public emailFinder(options: EmailFinderOptions): Promise<EmailFinderResponse>;

    public emailFinder(options: EmailFinderOptions, callback: Callback<EmailFinderResponse>): void;

    /**
     * This API endpoint generates the most likely email address from a domain name, a first name and a last name.
     *
     * @see https://hunter.io/api/v2/docs#email-finder
     *
     * @example
     * hunter.emailFinder({
     *  domain: "example.com",
     *  full_name: "John Doe"
     * }, (err, res) => {});
     *
     * await hunter.emailFinder({
     *  domain: "example.com",
     *  first_name: "John",
     *  last_name: "Doe",
     * });
     */
    public emailFinder(options: EmailFinderOptions, callback?: Callback<EmailFinderResponse>): Promise<EmailFinderResponse> | void {
        return this.run({
            callback,
            options,
            type: "email-finder",
        });
    }

    public emailVerifier(email: string): Promise<EmailVerifierResponse>;

    public emailVerifier(email: string, callback: Callback<EmailVerifierResponse>): void;

    /**
     * This API endpoint allows you to verify the deliverability of an email address.
     *
     * @see https://hunter.io/api/v2/docs#email-verifier
     *
     * @example
     * hunter.emailVerifier("john.doe@example.com"; (err, res) => {});
     *
     * await hunter.emailVerifier("john.doe@example.com");
     */
    public emailVerifier(email: string, callback?: Callback<EmailVerifierResponse>): Promise<EmailVerifierResponse> | void {
        return this.run({
            callback,
            options: { email },
            type: "email-verifier",
        });
    }

    public emailCount(domain: string | EmailCountOptions): Promise<EmailCountResponse>;

    public emailCount(domain: string | EmailCountOptions, callback: Callback<EmailCountResponse>): void;

    /**
     * This API endpoint allows you to know how many email addresses we have for one domain.
     * It's free and doesn't require authentication.
     *
     * @see https://hunter.io/api/v2/docs#email-count
     *
     * @example
     * hunter.emailCount("example.com", (err, res) => {});
     * hunter.emailCount({
     *   domain: "example.com",
     *   type: "personal"
     * }, (err, res) => {});
     *
     * await hunter.emailCount("example.com");
     * await hunter.emailCount({
     *   domain: "example.com",
     *   type: "personal"
     * });
     */
    public emailCount(domain: string | EmailCountOptions, callback?: Callback<EmailCountResponse>): Promise<EmailCountResponse> | void {
        const options = typeof domain === "string"
            ? { domain }
            : domain;
        return this.run({
            callback,
            options,
            type: "email-count",
        });
    }

    public domainSearch(options: DomainSearchOptions): Promise<DomainSearchResponse>;

    public domainSearch(options: DomainSearchOptions, callback: Callback<DomainSearchResponse>): void;

    /**
     * One key feature of Hunter is to search all the email addresses corresponding to one website.
     * You give one domain name and it returns all the email addresses using this domain name found on the internet.
     *
     * @see https://hunter.io/api/v2/docs#domain-search
     *
     * @example
     * hunter.domainSearch({
     *    domain: "example.com"
     * }, (err, res) => {});
     *
     * await hunter.domainSearch({
     *    domain: "example.com"
     * });
     */
    public domainSearch(options: DomainSearchOptions, callback?: Callback<DomainSearchResponse>): Promise<DomainSearchResponse> | void {
        return this.run({
            callback,
            options,
            type: "domain-search",
        });
    }

    public account(): Promise<AccountResponse>;

    public account(callback: Callback<AccountResponse>): void;

    /**
     * This API endpoint enables you to get information regarding your Hunter account at any time.
     *
     * @see https://hunter.io/api/v2/docs#account
     *
     * @example
     * hunter.account((err, res) => {});
     *
     * await hunter.account();
     */
    public account(callback?: Callback<AccountResponse>): Promise<AccountResponse> | void {
        return this.run({
            callback,
            type: "account",
        });
    }
}
