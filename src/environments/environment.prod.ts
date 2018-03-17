export const environment = {
  production: true,
  origin: 'http://192.169.154.97/ICTypificationApi',
  loginUrl: 'http://localhost:4200/login',
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
