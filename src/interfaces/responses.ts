/**
 * The standard Hunter.io API successfull response interface
 * @see https://hunter.io/api/docs#structure
 */
export interface IResponse<T> {
  data: T;
  meta?: any;
}

/**
 * The standard Hunter.io API error response interface
 * @see https://hunter.io/api/docs#structure
 */
export interface IErrorResponse {
  errors: any;
}
