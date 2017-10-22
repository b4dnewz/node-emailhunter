'use strict';

const assert = require('assert');
const axios = require('axios');
const httpAdapter = require('axios/lib/adapters/http');
const nock = require('nock');
const Em = require('../../lib').default;

// Fake api key value
const APIKEY = '000000';

// Mock the API responses
const responses = {
  account: {
    data: {
      first_name: 'Filippo',
      last_name: 'Conti',
      email: 'filippo@codekraft.it'
    }
  },
  domainSearch: {
    data: {
      domain: 'codekraft.it',
      organization: 'Codekraft',
      emails: []
    }
  },

  emails: {
    emailFinder: {
      data: {
        email: 'filippo@codekraft.it',
        score: 100,
        domain: 'codekraft.it'
      }
    },
    emailVerifier: {
      data: {
        result: 'deliverable',
        score: 100,
        sources: []
      }
    },
    emailCount: {
      data: {
        total: 10,
        personal_emails: 4,
        generic_emails: 6
      }
    }
  },

  leads: {
    list: {
      data: {
        leads: [
          {
            id: 1,
            first_name: 'Jeremy',
            last_name: 'Hoon'
          }
        ]
      }
    },
    retrieve: {
      data: {
        leads: [
          {
            id: 1,
            first_name: 'Jeremy',
            last_name: 'Hoon'
          }
        ]
      }
    },
    create: {
      data: {
        id: 3,
        first_name: 'Dustin',
        last_name: 'Moskovitz'
      }
    }
  },

  leads_list: {
    list: {
      data: {
        leads: [
          {
            id: 1,
            first_name: 'Jeremy',
            last_name: 'Hoon'
          }
        ]
      }
    },
    retrieve: {
      data: {
        leads: [
          {
            id: 1,
            first_name: 'Jeremy',
            last_name: 'Hoon'
          }
        ]
      }
    },
    create: {
      data: {
        id: 3,
        first_name: 'Dustin',
        last_name: 'Moskovitz'
      }
    }
  }
};

// Setup axios
axios.defaults.host = 'http://localhost';
axios.defaults.adapter = httpAdapter;

describe('Email Hunter Test Suite', function() {
  let mock;

  // Init nock resource
  beforeEach(() => {
    mock = nock('https://api.hunter.io/v2');
  });

  // When is started without the API key
  describe('Running without the API key', () => {
    it('throws an error is no API key is found', () => {
      assert.throws(() => new Em(), Error);
    });
  });

  // When is started with the API key
  describe('Running with the API key', () => {
    let hunter;
    beforeEach(() => {
      hunter = new Em(APIKEY);
    });

    // Account details
    it('calls the account api', done => {
      mock
        .get('/account/')
        .query({
          api_key: APIKEY
        })
        .reply(200, responses.account);
      hunter.account((err, res) => {
        assert(!err && res.data, 'It should recive response data');
        done();
      });
    });

    // Domain API tests
    describe('domain API methods:', () => {
      // Domain search
      it('calls the domain search api', done => {
        mock
          .get('/domain-search/')
          .query({
            api_key: APIKEY,
            domain: 'codekraft.it'
          })
          .reply(200, responses.domainSearch);
        hunter.domainSearch(
          {
            domain: 'codekraft.it'
          },
          (err, res) => {
            assert(!err && res.data, 'It should recive response data');
            assert.equal(
              !err && res.data.domain,
              'codekraft.it',
              'It should have the same domain name'
            );
            done();
          }
        );
      });
    });

    // Emails API Tests
    describe('emails API methods:', () => {
      it('calls the email finder api', done => {
        mock
          .get('/email-finder/')
          .query({
            api_key: APIKEY,
            domain: 'codekraft.it',
            fullname: 'Filippo Conti'
          })
          .reply(200, responses.emails.emailFinder);
        hunter.emailFinder(
          {
            domain: 'codekraft.it',
            fullname: 'Filippo Conti'
          },
          (err, res) => {
            assert(!err && res.data, 'It should recive response data');
            done();
          }
        );
      });

      it('calls the email verifier api', done => {
        mock
          .get('/email-verifier/')
          .query({
            api_key: APIKEY,
            email: 'filippo@codekraft.it'
          })
          .reply(200, responses.emails.emailVerifier);
        hunter.emailVerifier(
          {
            email: 'filippo@codekraft.it'
          },
          (err, res) => {
            assert(!err && res.data, 'It should recive response data');
            done();
          }
        );
      });

      it('calls the email count api', done => {
        mock
          .get('/email-count/')
          .query({
            api_key: APIKEY,
            domain: 'codekraft.it'
          })
          .reply(200, responses.emails.emailCount);
        hunter.emailCount(
          {
            domain: 'codekraft.it'
          },
          (err, res) => {
            assert(!err && res.data, 'It should recive response data');
            done();
          }
        );
      });
    });

    // Leads API tests
    describe('leads API methods:', () => {
      it('calls the leads list api', done => {
        mock
          .get('/leads/')
          .query({
            api_key: APIKEY
          })
          .reply(200, responses.leads.list);
        hunter.leads.list({}, (err, res) => {
          assert(!err && res.data, 'It should recive response data');
          done();
        });
      });

      it('calls the leads retrieve api', done => {
        mock
          .get('/leads/1')
          .query({
            api_key: APIKEY
          })
          .reply(200, responses.leads.retrieve);
        hunter.leads.retrieve(1, (err, res) => {
          assert(!err && res.data, 'It should recive response data');
          done();
        });
      });

      it('calls the leads create api', done => {
        let data = {
          first_name: 'Filippo',
          last_name: 'Conti'
        };
        mock
          .post('/leads/', data)
          .query({
            api_key: APIKEY
          })
          .reply(201, responses.leads.create);
        hunter.leads.create(data, (err, res) => {
          assert(!err && res.data, 'It should recive response data');
          done();
        });
      });

      it('calls the leads update api', done => {
        let data = {
          company: 'Codekraft'
        };
        mock
          .put('/leads/1', data)
          .query({
            api_key: APIKEY
          })
          .reply(204);
        hunter.leads.update(1, data, err => {
          assert(!err, 'It should recive response data');
          done();
        });
      });

      it('calls the leads delete api', done => {
        mock
          .delete('/leads/1')
          .query({
            api_key: APIKEY
          })
          .reply(204);
        hunter.leads.delete(1, err => {
          assert(!err, 'It should recive response data');
          done();
        });
      });
    });

    // Leads API tests
    describe('leads_list API methods:', () => {
      it('calls the leads_list list api', done => {
        mock
          .get('/leads_list/')
          .query({
            api_key: APIKEY
          })
          .reply(200, responses.leads_list.list);
        hunter.leadsList.list({}, (err, res) => {
          assert(!err && res.data, 'It should recive response data');
          done();
        });
      });

      it('calls the leads_list retrieve api', done => {
        mock
          .get('/leads_list/1')
          .query({
            api_key: APIKEY
          })
          .reply(200, responses.leads_list.retrieve);
        hunter.leadsList.retrieve(1, (err, res) => {
          assert(!err && res.data, 'It should recive response data');
          done();
        });
      });

      it('calls the leads_list create api', done => {
        let data = {
          first_name: 'Filippo',
          last_name: 'Conti'
        };
        mock
          .post('/leads_list/', data)
          .query({
            api_key: APIKEY
          })
          .reply(201, responses.leads_list.create);
        hunter.leadsList.create(data, (err, res) => {
          assert(!err && res.data, 'It should recive response data');
          done();
        });
      });

      it('calls the leads_list update api', done => {
        let data = {
          company: 'Codekraft'
        };
        mock
          .put('/leads_list/1', data)
          .query({
            api_key: APIKEY
          })
          .reply(204);
        hunter.leadsList.update(1, data, err => {
          assert(!err, 'It should recive response data');
          done();
        });
      });

      it('calls the leads_list delete api', done => {
        mock
          .delete('/leads_list/1')
          .query({
            api_key: APIKEY
          })
          .reply(204);
        hunter.leadsList.delete(1, err => {
          assert(!err, 'It should recive response data');
          done();
        });
      });
    });
  });
});
