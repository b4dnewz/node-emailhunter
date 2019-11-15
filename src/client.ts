import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "querystring";

export interface IHunterClientOptions {
    apiKey: string;
    instance?: AxiosInstance;
    options?: AxiosRequestConfig;
}

export interface IRunOptions {
    action?: string;
    type: string;
    id?: number | string;
    options?: any;
    callback?: any;
}

export class HunterClient {

    public readonly endpoint: string = "https://api.hunter.io/v2";

    protected readonly apiKey: string;

    protected readonly instance: AxiosInstance;

    public constructor(args: IHunterClientOptions) {

        this.apiKey = args.apiKey;

        this.instance = args.instance || axios.create({
            ...args.options,
            baseURL: this.endpoint,
            validateStatus(status) {
                return status >= 200 && status < 300;
            },
        });

    }

    /**
     * Call the Hunter.io api internally with specified options.
     * This method is not supposed to use directly.
     */
    protected run({
        type,
        id,
        action = "GET",
        options = {},
        callback = null,
    }: IRunOptions) {
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
        return req.then(({ data }) => {
            if (callback) {
                callback(null, data);
            }
            return data;
        }).catch((err) => {
            err = err.response ? err.response.data : err;
            if (callback) {
                callback(err, null);
                return;
            }
            return Promise.reject(err);
        });
    }

}
