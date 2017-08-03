// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  name: 'development',
  production: false,
  public: true,
  backendHost: 'http://localhost:8080',
  //backendHost: 'http://192.168.0.103:8080',

  // delay in milliseconds, to mimic network delay
  backendDelay: 400,

  signupEnabled: false,
  
  /**
   * see shared.py for details
   */
};
