# Currency Converter

[![License][license-badge]][license-url]

> Currency converter app using external exchange rate API

## Installing / Getting started

See [Setting up Dev](#setting-up-dev) section.

## Developing

### Built With

[Create-React-App](https://facebook.github.io/create-react-app/)

### Prerequisites

It's required to have [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/) installed locally to follow the instructions in documentation.

### Setting up Dev

```shell
git clone https://github.com/julykaz/currency-converter.git
cd currency-converter
npm install
npm start
```

### Building

#### On local machine:

```shell
npm run build
```

#### In docker container:

```shell
$ docker-compose up --build
```

### Deploying / Publishing

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/julykaz/currency-converter)

## Configuration

* Set `REACT_APP_API_URL` environment variable to specify location of an external API.

## Running tests

```shell
npm test
```

## Code style guide

Using [Prettier](https://prettier.io/) to simplify code formatting. [See why.](https://prettier.io/docs/en/why-prettier.html)

## Api Reference

[TransferGo API](https://my.transfergo.com/api)

## Licensing

MIT License

[license-badge]: https://img.shields.io/github/license/robertoachar/docker-express-mongodb.svg
[license-url]: https://opensource.org/licenses/MIT
