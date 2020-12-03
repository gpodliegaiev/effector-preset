// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`CLI Should generate accesso api: code 1`] = `
"// Accesso App Public API. 0.4.0
// ---
// This file is automatically generated by openapi with preset effector-openapi-preset
// Do not edit this file directly. Instead open openapi config file and follow the link in \\"file\\"
import { createEffect } from 'effector';
import * as typed from 'typed-contracts';
import { requestFx } from './request';

//#region prebuilt code
const custom = { any: (valueName: string, value: unknown): any => value }

export type GenericErrors =
  | {
      status: 'unexpected';
      error: Error;
    }
  | {
      status: 'unknown_status';
      error: { status: number; body: unknown };
    }
  | {
      status: 'validation_error';
      error: typed.ValidationError;
    };

function parseWith<T>(
  name: string,
  contract: typed.Contract<T>,
  value: unknown,
): T {
  const parsed = contract(name, value);
  if (parsed instanceof typed.ValidationError) {
    throw { status: 'validation_error', error: parsed };
  }
  return parsed;
}

//#endregion prebuilt code/* --- */
//#region oauthToken
type OauthToken = {
  body: {
    grant_type: \\"authorization_code\\";

    /* This parameter is for the authorization code received from the authorization server which will be in the query string parameter “code” in this request. */
    code: string;

    /* If the redirect URL was included in the initial authorization request,
     * it must be included in the token request as well, and must be identical.
     * Some services support registering multiple redirect URLs, and some require the redirect URL to be specified on each request. */
    redirect_uri: string;
    client_id: string;
    client_secret: string;
  };
};

/* The auth services validated the request and responds with an access token [OAuth2 Example Flow](https://www.oauth.com/oauth2-servers/server-side-apps/example-flow/) */
export const oauthTokenCreated = typed.object({
  access_token: typed.string,
  token_type: typed.union(\\"bearer\\"),

  /* UTC Unix TimeStamp when the access token expires */
  expires_in: typed.number.optional
});
export type OauthTokenDone = {
  status: \\"created\\";
  answer: typed.Get<typeof oauthTokenCreated>;
};

/* When you can't exchange authorization code to access token */
export const oauthTokenBadRequest = typed.object({
  error: typed.union(\\"invalid_request\\", \\"invalid_client\\", \\"invalid_grant\\", \\"invalid_scope\\", \\"unauthorized_client\\", \\"unsupported_grant_type\\")
});

/* Something goes wrong */
export const oauthTokenInternalServerError = typed.nul;
export type OauthTokenFail = {
  status: \\"bad_request\\";
  error: typed.Get<typeof oauthTokenBadRequest>;
} | {
  status: \\"internal_server_error\\";
  error: typed.Get<typeof oauthTokenInternalServerError>;
} | GenericErrors;

/* Exchange the authorization code for an access token */
export const oauthToken = createEffect<OauthToken, OauthTokenDone, OauthTokenFail>({
  async handler({
    body
  }) {
    const name = \\"oauthToken.body\\";
    const answer = await requestFx({
      path: \\"/oauth/token\\",
      method: \\"POST\\",
      body
    });

    switch (answer.status) {
      case 201:
        return {
          status: \\"created\\",
          answer: parseWith(name, oauthTokenCreated, answer.body)
        };

      case 400:
        throw {
          status: \\"bad_request\\",
          error: parseWith(name, oauthTokenBadRequest, answer.body)
        };

      case 500:
        throw {
          status: \\"internal_server_error\\",
          error: parseWith(name, oauthTokenInternalServerError, answer.body)
        };

      default:
        throw {
          status: 'unknown_status',
          error: {
            status: answer.status,
            body: answer.body
          }
        };
    }
  }

});
//#endregion oauthToken

"
`;

exports[`CLI Should generate accesso api: files 1`] = `
"accesso-app-public-api.ts
"
`;
