
### TO DO: Proper Readme. Right know it's just pointers:

Bootstraped with CRA, challenge for Drixit.

backend express + node. Endpoints from localhost:3001. Really poor CORS.

Generating and validating JWT, still not storing it (deciding for either localstorage or httpcookies).

Created extra post endpoint for making new users and simplify the loading of them to mongoDB. Not requested. Not even protected.

Using Hapi for schema validations, and npm run all to run parallel scripts.

Using bcrypr for salt-based password hashing. Salt level generated is hardcoded and probably bad.

NEED TO ATTACH A FRONT END. Just picking up data from hardcoded jwt in app to validate everything works correctly. WIP.

Connected to a cluster in MongoDB. I'm pushing my .env because this is a dummy project for a challenge. Should be configured on host if project deploys.

Testing WIP (I have literally never tested backend so I'll probably create simple unit tests on the front to be honest). Nothing to test because there's no front yet.

I should split package json into two probably. No point on installing all dependencies if I want to maybe split starting of server and front end. Will also be easier to deploy. I'm pretty sure Docker would be a great solution here but I have no idea what docker does.

## Available Scripts

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn server`

Runs the server in development mode <br />
You can make get and post requests to `http://localhost:3001` endpoint routes, declared in the routes folder files.

### `yarn boot`

runs both `yarn start` and `yarn server` in parallel with npm-run-all.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
No tests yet.

### `yarn build`

Builds the app for production to the `build` folder.<br />
Essentially CRA build script. I was not requested to deploy this app but will leave it in case anyone prefers to do so.

### `yarn eject`

Leaving eject as a command just in case I decide to config css modules in the future, or modify webpack for some reason.

Literal CRA eject command. Description below:

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.