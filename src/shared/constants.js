export const ENDPOINTS = {
  BASE: 'http://localhost:3001/api',
  LOGIN: '/v0/login',
  USER: '/user/user-info'
}
export const REGEX_PATTERNS = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
export const TOKEN_NAME = 'drixit-JWT'