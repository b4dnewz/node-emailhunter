# hunter.io

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> An unofficial NodeJs client for Hunter.io API

[![NPM](https://nodei.co/npm/hunter.io.png)](https://npmjs.org/package/hunter.io)

This is a __unofficial__ client for Hunter.io.

## Installation

The module is distributed through npm (node package manager) and yast, it can be
installed using:

```
npm install hunter.io
```

## Documentation

This project provides an additional documentation automatically generated with [typedoc](https://github.com/TypeStrong/typedoc) and based on the original documentation, you can find it at https://b4dnewz.github.io/node-emailhunter/

## Looking for the cli tool?

You can install the dedicated [cli version](https://github.com/b4dnewz/node-emailhunter-cli) of this module, you simply have to install it globally and you are ready to go.

```
npm install -g hunter.io-cli
```

The package will register `email-hunter` command, which is built using [commanderjs](https://github.com/tj/commander.js) and provides automatic generated usage documentation for options and sub-commands.

```
$ email-hunter --help
$ email-hunter <command> --help
```

In order to use the cli you __must__ use a valid Hunter.io API key.

You can set it in two ways, one is with command options, another is using environment variables, in particular a variable called `HUNTERIO_KEY` with your private API key, otherwise if not specified, most of the endpoints will fail since requires authentication.

## Getting started

Import the module and and create an instance of the hunter:

```js
import EmailHunter from 'hunter.io';
const hunter = new EmailHunter('YOUR API KEY');
```

__Note__: You can get the Hunter.io API key in your dashboard: https://hunter.io/api_keys

## Methods

The project is TypeScript based and it comes with declaration files, every method signature is well described and can also be found in the [online documentation](https://b4dnewz.github.io/node-emailhunter/).

* __domainSearch__: You give one domain name and it returns all the email addresses using this domain name found on the internet.
* __emailFinder__: This API endpoint generates the most likely email address from a domain name, a first name and a last name.
* __emailVerifier__: This API endpoint allows you to verify the deliverability of an email address.
* __emailCount__: This API endpoint allows you to know how many email addresses we have for one domain.
* __account__: This API endpoint enables you to get information regarding your Hunter account at any time.

* __leads__: The object which contains all the leads methods
  * __list__: Returns all the leads already saved in your account.
  * __retrieve__: Retrieves all the fields of a lead.
  * __create__: Creates a new lead.
  * __update__: Updates an existing lead.
  * __delete__: Deletes an existing lead by ID.


* __leadsList__: The object which contains all the leads methods
  * __list__: Returns all the leads lists already saved in your account.
  * __retrieve__: Retrieves all the fields of a leads list.
  * __create__: Creates a new leads list.
  * __update__: Updates an existing leads list.
  * __delete__: Deletes an existing leads list.

All the methods supports both callback style functions or promises, so for example to get your profile informations you can do:

```js
// with callback
hunter.account((err, result) => { });

// with promises
const data = await hunter.account()

hunter.account().then(data => {
  
})
```

---

## Contributing

1. Fork it ( https://github.com/b4dnewz/node-emailhunter/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Write some tests and run (`npm run test`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

---

## License
The __hunter.io__ is released under the [MIT License](./LICENSE).


[npm-image]: https://badge.fury.io/js/hunter.io.svg
[npm-url]: https://npmjs.org/package/hunter.io

[travis-image]: https://travis-ci.org/b4dnewz/node-emailhunter.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/node-emailhunter

[daviddm-image]: https://david-dm.org/b4dnewz/node-emailhunter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/b4dnewz/node-emailhunter

[coveralls-image]: https://coveralls.io/repos/b4dnewz/node-emailhunter/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/node-emailhunter