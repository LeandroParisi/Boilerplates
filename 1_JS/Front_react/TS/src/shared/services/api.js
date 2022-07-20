/* eslint-disable max-len */
const axios = require('axios')

const withCredentials = process.env.REACT_APP_ENV === 'dev'

/**
 * Default fetcher for entire application
 * @param {string} method HTTP method to be used on request
 * @param {string} url Complet URL for the request: server + endpoint
 * @param {object} body Request body
 * @param {object} headers Request headers
 * @returns Object { ...responsePayload } Any relevant information returned by the API. It will always include a key message (even on errors)
 */
const api = async ({
  method, url, body = null, headers = null, ...otherOptions
}) => {
  const options = {
    method,
    headers: headers && { ...headers },
    url,
    data: body && { ...body },
    withCredentials,
    ...otherOptions,
  }

  const response = await axios(options)
  return response
}

export default api

// teste
