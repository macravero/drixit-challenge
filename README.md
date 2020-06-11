
### TO DO: Proper Readme. Right now it's just pointers:

# Drixit fullstack challenge.

I was requested to create a login page and show the user info on successful login. There were no UX or UI requests, but a sample site to base my design off. Logo is a but iffy because I kind of stole it from their facebook page.

## Backend:

The backend is set up with Express and Node, connected to a mongo cluster. Inside `endpoints` you can find:

### A `model` folder with:

An `User` model as requested by the challenge. Every value in the schema is required except for `Date` as Date was not requested in the original model, and was more of a personal preference.

### A `routes` folder with:

An `auth` file that takes care of endpoints connected to MongoDB. I created an extra `register` endpoint for ease on the Users upload to the DB. It was not requested. It validates a token for the post request, hashes the password with `bcrypt` and checks for already existing emails.

Auth also takes care of the `/login` endpoint, by searching through email, and decrypting (well, comparing) password input with the `bcrypt` version in database. Both Email and Password missmatches return the same `Email or Password is wrong` message, made vague on purpose for security reasons. 

Finally, the login signs a `jwt token` and sends it through headers. This token is signed with the current user ID. it is also **dangerously** set inside LocalStorage instead of using http cookies. I figured it would suffice as the jwt part was an extra challenge and this is not meant for production.

An `user` file that returns the user *once its token is verified*. The user returned is the one found by the signed ID inside the token.

A `verifyToken` file that checks if a token exists and is valid, before returning the user ID for `user`.

### A `validations` file:

It essentially validates that post requests have the required body. I'm using `Joi` from `Hapi` as it comes with some validation handling and elegant error handling. Those validators are passed to the `auth` route for POST requests.

## Frontend:

The front-end was bootstrapped with Create React App, from Facebook, due to time constraints. Ideally, this project should be server-side rendered.

### Routes:

The project is routed with `react-router-dom` and it switchs between components with the following routes:

* `/` will by default redirect you to `/login` as we are using that endpoint as index.
* `/login` will render the `login` component.
* `/user` will render the `user container` with either the `user component` (if the user is logged in and the token is valid) or a `please log in` message with a button that redirects to `/login`.
* `*` routes (any other route not in the first three) will render a `NotFound` component indicating that the page is not found (invalid route) with a button that redirects to `/login`.

### Components:

The `Login` component will handle the `POST` request for login. It takes the route history parameter to allow for a redirection to `/user` on a successful login. It also checks for the email input through `useEffect` and matches its value against a regular expression for valid emails. Once that regex test is truthy, the password field appears. On a successful login, the `response's token` is set in `localStorage` and the user is redirected to `/user`.

This component also handles the type of error message that is pushed on the `ErrorContext's` state. Both axios requests have a timeout of two seconds, and therefore if a timeout occurs, we pass the custom error message of `The request timed out`. If that's not the case, we simply pass the `respose data` of the error.

The `User` container will handle invalid tokens on mount through the use of `useEffect` to simulate the `componentDidMount` lifecycle hook. It also has a `config` object that pulls the `token` from the `localStorage` to allow CORS. This is not the cleanest CORS solution but I don't have much experience in that area. On the case of invalid tokens, the token will be removed from `localStorage` and an error message will render.

 Once mounted with a valid token, it will make a `GET` request to the User endpoint with said token, and retrieve the user information through the user's ID inside the token. That information is passed to the `userData` component that renders it.

The `NotFound` component will mount in case of an invalid route. It simply renders a title and a button to go back to `/login`.

The `Error` component mounts when the `error.isError` status is truthy, which comes from the `ErrorContext`. It simply renders the provided error message(`error.message`) at the top of the page.

The `errorContext` hoc will provide of the `error and setError` states in order to access the `error` state across the wrapped components (in this case `Login` and `User`). It cleans said error status after three seconds in order to unmount the `Error` component. (this was not requested, it just looked nice I guess).

## Tech debt:

I'm not a fan of my current folder structure. i should refactor it in a way that containers and components are two separate layers.

Design is not my strength. I tried to do my best effort with the idea of screens provided.

Connected to a cluster in MongoDB. I'm pushing my .env because this is a dummy project for a challenge. Should be configured on host if project deploys. I could technically indicate the reviewer to create a cluster, connect it and post the users to test the functionality but I don't want to waste their time.

Testing WIP (I have literally never tested backend so I'll probably create simple unit tests on the front to be honest). 

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