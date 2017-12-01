# hunter.io

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Known Vulnerabilities][snyk-image]][snyk-url]

> A simple javascript wrapper for Hunter.io API

[![NPM](https://nodei.co/npm/hunter.io.png)](https://npmjs.org/package/hunter.io)

This is a __unofficial__ client for Hunter.io.

## Installation

The module is distributed through npm (node package manager) and yast, it can be
installed using:

```
npm install --save hunter.io
yarn add hunter.io
```

## Documentation
You can find an online documentation at the url: https://b4dnewz.github.io/node-emailhunter/

## Looking for the cli?
This package also comes with the __cli-tool__, you simply have to install it globally and you are ready to go.
```
npm install -g hunter.io
yarn global add hunter.io
```
For detailed usage information type `email-hunter --help`, it works also with sub-commands.

## How to use it
Import the module and and create an instance of the hunter:
```js
import EmailHunter from 'hunter.io';
const hunter = new EmailHunter('YOUR API KEY');
```

__Note__: You can get the Hunter.io API key in your dashboard: https://hunter.io/api_keys

## Methods
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

---

### Domain Search
Returns all the email addresses found using one given company name, with our sources.
```js
hunter.domainSearch({
  domain: 'example.com',
  company: 'Example Company'
}, (err, result) => { });
```

### Email Finder
It find the most likely email address from a domain name, a first name and a last.
```js
hunter.emailFinder({
  full_name: 'John Doe',
  domain: 'example.com',
  company: 'Example Company'
}, (err, result) => { });
```

### Email Verifier
Allows you to verify the deliverability of an email address.
```js
hunter.emailVerifier('test@mail.com', (err, result) => { });

hunter.emailVerifier({
  email: 'test@mail.com'
}, (err, result) => { });
```

### Email Count
Allows you to know how many email addresses we have for one domain.
```js
hunter.emailCount('example.com', (err, result) => { });

hunter.emailCount({
  domain: 'example.com'
}, (err, result) => { });
```

### Account information
Allows you to get information regarding your Email Hunter account at any time.
```js
hunter.account((err, result) => { });
```

### List Leads
Returns all the leads already saved in your account. The leads are returned in sorted order, with the most recent leads appearing first. The optional parameters can be combined to filter the results.
```js
hunter.leads.list({
  limit: 20
}, (err, result) => { });
```

### Create a new Lead
Creates a new lead. The parameters must be passed as a JSON hash.
```js
hunter.leads.create({
  first_name: 'Filippo',
  last_name: 'Conti'
}, (err, result) => { });
```

---

## License
The __hunter.io__ is released under the MIT License.

## Contributing

1. Fork it ( https://github.com/b4dnewz/node-emailhunter/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Write some tests and run (`npm run test`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

[npm-image]: https://badge.fury.io/js/hunter.io.svg
[npm-url]: https://npmjs.org/package/hunter.io
[travis-image]: https://travis-ci.org/b4dnewz/node-emailhunter.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/node-emailhunter
[daviddm-image]: https://david-dm.org/b4dnewz/node-emailhunter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/b4dnewz/node-emailhunter
[coveralls-image]: https://coveralls.io/repos/b4dnewz/node-emailhunter/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/node-emailhunter
[snyk-image]: https://snyk.io/test/github/b4dnewz/node-emailhunter/badge.svg
[snyk-url]: https://snyk.io/test/github/b4dnewz/node-emailhunter
