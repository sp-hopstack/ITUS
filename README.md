# Platform Backend Service

Platform backend is the consolidated backend serving most our warehouse operations. We are consolidating existing backend services into this repo. As we consolidate the service, we will keep adding details

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) LTS 14
- [npm](https://www.npmjs.com/)
- [nvm](https://github.com/nvm-sh/nvm) (Optional, but recommended)

## Installation

Clone the repo to your local machine:

```bash
git clone git@github.com:hopstack-inc/platform-backend-svc.git
```

Navigate into the directory:

```bash
cd platform-backend-svc
```

If using `nvm`, ensure the correct Node version is in use:

```bash
nvm use
```

Install the necessary npm packages:

```bash
npm install
```

## Configuration

Create your own configuration files in the `config` directory, based on the example given in `default.json`. For sensitive values like passwords, it's recommended to use environment variables. Remember to set these variables in your deployment and development environments.

## Health Check

Health check has been configured at `/health`. The status code should be 200
If the service is healthy,the message returned is:

```json
{
  "status": "OK"
}
```

The message is indicative, we should only use the status code.

## Running the Application

Start the server:

```bash
npm start
```

Or to start the server with `nodemon` (automatic restart on file changes):

```bash
npm run dev
```

## Development

This project uses ESLint for linting, Prettier for code formatting, and Husky for managing git hooks. These help enforce a consistent coding style and prevent problematic patterns in your code.

Before making a commit, ensure your code passes linting:

```bash
npm run lint
```

Your commit will be rejected if it doesn't pass linting.

### Logging

We are using Winston logger to log. However, it is tricky to get the file from which a log statement originates. Doing this automatically requires creating an error stack trace and parsing it which might have a performance penalty. We will instead adopt a convention of initializing a logger at the top of the module in which we need to log. We can pass the current filename to it.

```javascript
const logger = require('./logging.js')(__filename);
```

### Git hooks

This repository uses git hooks, handled by Husky. The `pre-commit` hook will run linting and formatting checks. If these checks fail, the commit will be aborted.

### VSCode Configuration

For VSCode users, there is a `.editorconfig` file for basic editor configuration and a `.vscode` folder containing specific settings and recommended extensions. These will help you maintain a consistent coding style.

## Contributing

Instructions for contributing.

## License

Licensed to Hopstack Inc.
