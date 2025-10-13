

 const STATUS_CODE = {
  //=========== Success ============//
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  //=========== Client Errors ============//
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  //=========== Authentication / Token issues ============//
  TOKEN_EXPIRED: 498,
  TOKEN_INVALID: 499,

  //===========  Server Errors ============//
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  //=========== Custom codes (if you use custom logic) ============//
  VALIDATION_ERROR: 1001,
  DATABASE_ERROR: 1002,
  UNKNOWN_ERROR: 1003,
}
export default STATUS_CODE;

