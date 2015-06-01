# ap-work-copilot-flow -- The "Copilot Flow"

## Prerequisites

1. [Node.js](http://nodejs.org)

2. OSX: [nvm](https://github.com/creationix/nvm)
 - In your `.nvmrc` (which should be at the root of your local version of this repo), list the version number `0.10.25`.
 - While inside the repo, run `nvm use`
 - Then run `npm install` and `bower install`.

3. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon`
    ```

    * [how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

## Gulp tasks

### Linting
 - Run code analysis using `gulp analyze`. This runs jshint, jscs, and plato.

### Tests
 - Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode
 - Run the project with `gulp serve-dev`

### Building the project
 - Build the optimized project using `gulp build`
 - This create the optimized code for the project and puts it in the build folder

### Running the optimized code
 - Run the optimize project from the build folder with `gulp serve-build`

## Using Environment Configuration during build.


```javascript
config = require('./config');

// To access environment variables use config.getVal('name', 'default value')
var value = config.getVal('baseURL', 'http://topcoder.com');

```

### Env variables

```shell
AWS_BUCKET=
AWS_KEY=
AWS_REGION=
AWS_SECRET=
BASE_URL=/
AWS_CDN_URL=
BASE_API_URL=
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
RET_URL=
CALLBACK_URL=
NODE_ENV=
```

## Global Variables:

- baseUrl: The base url.  in prod it's /work/.  Uses BASE_URL
- apiUrl: The base url for the API.  Defaults to /v3/.  Uses BASE_API_URL.
- auth0ClientId: The Auth0 Client ID.  
- auth0Domain: The Auth0 domain.  Defaults to topcoder-dev.auth0.com. Uses AUTH0_DOMAIN.
- retUrl: The URL which the Authorization service sends the after login.  Uses RET_URL
- callbackUrl: The callback url for auth0.  Defaults to http://api.topcoder-dev.com/pub/callback.html.  Uses CALLBACK_URL.

## Base API

This is a factory for creating resources. It would be used like this:

First, the individual services would register themselves with the API:

api.add('work');

// OR

api.add({
  resource: 'work',
  url: '/work'
});

// OR

api.add({
  resource: 'work',
  url: '/users/:user_id/work',
  params: {
    user_id: '@user_id'
  }
});
Then api service would be used like this in a controller:

api.work.get.$promise.then(function () {});

Original concept came from http://www.objectpartners.com/2014/06/03/extending-angulars-resource-service-for-a-consistent-api/.

## See also

* Bootstrapped by: https://github.com/appirio-tech/ap-work-client
* At commit: 4e091258e48fab2b079a72489e0897116ff81970
* The esteemed 888th commit to said repostory.

The readme there might be useful.
