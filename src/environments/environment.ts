// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  origin: 'http://localhost:61258',
    // origin: 'http://192.169.154.97/ICTypificationApi',
  // origin: 'http://192.169.154.97/ICTypificationApi',
  loginUrl: 'http://localhost:4200',
  cookie: 'test_cookie'
};
