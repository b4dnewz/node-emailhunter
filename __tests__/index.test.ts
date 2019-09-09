import nock from "nock";

import EmailHunter from "../src/index";

const APIKEY = "000000";

// Mock the API responses
const responses = {
  account: {
    data: {
      email: "filippo@codekraft.it",
      first_name: "Filippo",
      last_name: "Conti",
    },
  },
  domainSearch: {
    data: {
      domain: "codekraft.it",
      emails: [],
      organization: "Codekraft",
    },
  },
  emails: {
    emailCount: {
      data: {
        generic_emails: 6,
        personal_emails: 4,
        total: 10,
      },
    },
    emailFinder: {
      data: {
        domain: "codekraft.it",
        email: "filippo@codekraft.it",
        score: 100,
      },
    },
    emailVerifier: {
      data: {
        result: "deliverable",
        score: 100,
        sources: [],
      },
    },
  },
  leads: {
    create: {
      data: {
        first_name: "Dustin",
        id: 3,
        last_name: "Moskovitz",
      },
    },
    list: {
      data: {
        leads: [
          {
            first_name: "Jeremy",
            id: 1,
            last_name: "Hoon",
          },
        ],
      },
    },
    retrieve: {
      data: {
        leads: [
          {
            first_name: "Jeremy",
            id: 1,
            last_name: "Hoon",
          },
        ],
      },
    },
  },
  leads_lists: {
    create: {
      data: {
        first_name: "Dustin",
        id: 3,
        last_name: "Moskovitz",
      },
    },
    list: {
      data: {
        leads: [
          {
            first_name: "Jeremy",
            id: 1,
            last_name: "Hoon",
          },
        ],
      },
    },
    retrieve: {
      data: {
        leads: [
          {
            first_name: "Jeremy",
            id: 1,
            last_name: "Hoon",
          },
        ],
      },
    },
  },
};

describe("Email Hunter", () => {
  let mock: nock.Scope;
  let hunter: EmailHunter;

  // Init nock resource
  beforeAll(() => {
    mock = nock("https://api.hunter.io/v2");
    hunter = new EmailHunter(APIKEY);
  });

  it("throws an error is no API key is found", () => {
    // @ts-ignore
    expect(() => new EmailHunter()).toThrowError();
  });

  it("should run the account endpoint", (done) => {
    mock
      .get("/account")
      .query({
        api_key: APIKEY,
      })
      .reply(200, responses.account);
    hunter.account((err, res) => {
      expect(err).toBeNull();
      expect(res.data).toBeDefined();
      done();
    });
  });

  it("should support promises", async () => {
    mock
      .get("/account")
      .query({
        api_key: APIKEY,
      })
      .reply(200, responses.account);
    const res = await hunter.account();
    expect(res).toBeDefined();
  });

  it("should reject with error", async () => {
    mock
      .get("/account")
      .query({
        api_key: APIKEY,
      })
      .reply(404, {});
    try {
      await hunter.account();
      expect(false);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  // Domain API tests
  describe("domain API methods:", () => {
    it("calls the domain search api", (done) => {
      mock
        .get("/domain-search")
        .query({
          api_key: APIKEY,
          domain: "codekraft.it",
        })
        .reply(200, responses.domainSearch);
      hunter.domainSearch(
        {
          domain: "codekraft.it",
        },
        (err, res) => {
          expect(err).toBeNull();
          expect(res.data).toBeDefined();
          done();
        },
      );
    });
  });

  // Emails API Tests
  describe("emails API methods:", () => {
    it("calls the email finder api", (done) => {
      mock
        .get("/email-finder")
        .query({
          api_key: APIKEY,
          domain: "codekraft.it",
          full_name: "Filippo Conti",
        })
        .reply(200, responses.emails.emailFinder);
      hunter.emailFinder(
        {
          domain: "codekraft.it",
          full_name: "Filippo Conti",
        },
        (err, res) => {
          expect(err).toBeNull();
          expect(res.data).toBeDefined();
          done();
        },
      );
    });

    it("calls the email verifier api", (done) => {
      mock
        .get("/email-verifier")
        .query({
          api_key: APIKEY,
          email: "filippo@codekraft.it",
        })
        .reply(200, responses.emails.emailVerifier);
      hunter.emailVerifier("filippo@codekraft.it",
        (err, res) => {
          expect(err).toBeNull();
          expect(res.data).toBeDefined();
          done();
        },
      );
    });

    it("calls the email count api", (done) => {
      mock
        .get("/email-count")
        .query({
          api_key: APIKEY,
          domain: "codekraft.it",
        })
        .reply(200, responses.emails.emailCount);
      hunter.emailCount(
        {
          domain: "codekraft.it",
        },
        (err, res) => {
          expect(err).toBeNull();
          expect(res.data).toBeDefined();
          done();
        },
      );
    });
  });

  // Leads API tests
  describe("leads API methods:", () => {
    it("calls the leads list api", (done) => {
      mock
        .get("/leads")
        .query({
          api_key: APIKEY,
        })
        .reply(200, responses.leads.list);
      hunter.leads.list({}, (err, res) => {
        expect(err).toBeNull();
        expect(res.data).toBeDefined();
        done();
      });
    });

    it("calls the leads retrieve api", (done) => {
      mock
        .get("/leads/1")
        .query({
          api_key: APIKEY,
        })
        .reply(200, responses.leads.retrieve);
      hunter.leads.retrieve(1, (err, res) => {
        expect(err).toBeNull();
        expect(res.data).toBeDefined();
        done();
      });
    });

    it("calls the leads create api", (done) => {
      const data = {
        email: "filippo@example.com",
        first_name: "Filippo",
        last_name: "Conti",
      };
      mock
        .post("/leads", data)
        .query({
          api_key: APIKEY,
        })
        .reply(201, responses.leads.create);
      hunter.leads.create(data, (err, res) => {
        expect(err).toBeNull();
        expect(res.data).toBeDefined();
        done();
      });
    });

    it("calls the leads update api", (done) => {
      const data = {
        company: "Codekraft",
      };
      mock
        .put("/leads/1", data)
        .query({
          api_key: APIKEY,
        })
        .reply(204);
      hunter.leads.update(1, data, (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it("calls the leads delete api", (done) => {
      mock
        .delete("/leads/1")
        .query({
          api_key: APIKEY,
        })
        .reply(204);
      hunter.leads.delete(1, (err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  // Leads API tests
  describe("leads_lists API methods:", () => {
    it("calls the leads_lists list api", (done) => {
      mock
        .get("/leads_lists")
        .query({
          api_key: APIKEY,
        })
        .reply(200, responses.leads_lists.list);
      hunter.leadsList.list({}, (err, res) => {
        expect(err).toBeNull();
        expect(res.data).toBeDefined();
        done();
      });
    });

    it("calls the leads_lists retrieve api", (done) => {
      mock
        .get("/leads_lists/1")
        .query({
          api_key: APIKEY,
        })
        .reply(200, responses.leads_lists.retrieve);
      hunter.leadsList.retrieve(1, (err, res) => {
        expect(err).toBeNull();
        expect(res.data).toBeDefined();
        done();
      });
    });

    it("calls the leads_lists create api", (done) => {
      const data = {
        name: "New list",
      };
      mock
        .post("/leads_lists", data)
        .query({
          api_key: APIKEY,
        })
        .reply(201, responses.leads_lists.create);
      hunter.leadsList.create(data, (err, res) => {
        expect(err).toBeNull();
        expect(res.data).toBeDefined();
        done();
      });
    });

    it("calls the leads_lists update api", (done) => {
      const data = {
        name: "New list updated",
      };
      mock
        .put("/leads_lists/1", data)
        .query({
          api_key: APIKEY,
        })
        .reply(204);
      hunter.leadsList.update(1, data, (err) => {
        expect(err).toBeNull();
        done();
      });
    });

    it("calls the leads_lists delete api", (done) => {
      mock
        .delete("/leads_lists/1")
        .query({
          api_key: APIKEY,
        })
        .reply(204);
      hunter.leadsList.delete(1, (err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });
});
