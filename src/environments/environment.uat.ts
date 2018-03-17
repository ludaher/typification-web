// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  origin: 'http://localhost:61259',
  loginUrl: 'http://localhost/WelcomeSite',
  cookie: 'test_cookie',
  clientSettings: {
    authority: 'http://216.69.181.183/IdentityServer/',
    client_id: 'mvc',
    redirect_uri: 'http://localhost:4201/auth-callback/',
    post_logout_redirect_uri: 'http://localhost:4201/',
    response_type: 'id_token token',
    scope: 'openid profile api1',
    filterProtocolClaims: true,
    loadUserInfo: true
  }

};
