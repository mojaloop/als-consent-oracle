# ALS Consent Oracle (Work in Progress)
[![Git Commit](https://img.shields.io/github/last-commit/mojaloop/als-consent-oracle.svg?style=flat)](https://github.com/mojaloop/als-consent-oracle/commits/main)
[![Git Releases](https://img.shields.io/github/release/mojaloop/als-consent-oracle.svg?style=flat)](https://github.com/mojaloop/als-consent-oracle/releases)
[![Npm Version](https://img.shields.io/npm/v/@mojaloop/als-consent-oracle.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/als-consent-oracle)
[![NPM Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@mojaloop/als-consent-oracle.svg?style=flat)](https://www.npmjs.com/package/@mojaloop/als-consent-oracle)
[![CircleCI](https://circleci.com/gh/mojaloop/als-consent-oracle.svg?style=svg)](https://circleci.com/gh/mojaloop/als-consent-oracle)

## Overview

- [Documentation](./docs/README.md)

## Setup

### Clone repo
```bash
git clone git@github.com:mojaloop/als-consent-oracle.git
```

### Improve local DNS resolver
Add the `127.0.0.1   als-consent-oracle.local` entry in your `/etc/hosts` so the _als-consent-oracle_ is reachable on `http://als-consent-oracle.local:3000`. Elsewhere use `http://localhost:3000`

### Install service dependencies
```bash
cd als-consent-oracle
npm ci
```

### Run local dockerized _als-consent-oracle_
```bash
npm run docker:build
npm run docker:run
```

To check the als-consent-oracle health visit [http://als-consent-oracle.local:3000/health](http://als-consent-oracle.local:3000/health)

### File structure of docker image
```
dist
│
└───config (Mount your default.json config file here)
└───migrations
└───seeds
└───src
└───package.json
logs
node_modules
package-lock.json
package.json (Run package commands with root package.json)
```

### Run locally with database in `docker-compose`

```bash
docker-compose up -d mysql
npm run migrate
npm run start
```


### Updating the OpenApi (Swagger) Spec

We use `multi-file-swagger` to make our swagger files more manageable.

After making changes to the `.yaml` files in `./src/interface/`, update the `swagger.json` file like so:

```bash
    npm run build:openapi
```

> Note: We will likely want to move to swagger 3.0 at some point, and once we do, we will be able to use the [common api snippets](https://github.com/mojaloop/api-snippets) library to factor out common Mojaloop snippets.
> Keep track of [#352 - Update to OpenAPI v3](https://app.zenhub.com/workspaces/pisp-5e8457b05580fb04a7fd4878/issues/mojaloop/mojaloop/352)


