/**
 * @module helpers/httpResponse
 * @description Normalize response with pattern other API's
 */

export const response = (status, params, pagination = {}) => {
  if (status >= 400) {
    return {
      statusCode: status,
      errors: params
    }
  } else {
    return {
      statusCode: status,
      errors: [],
      data: params,
      ...pagination
    }
  }
}
