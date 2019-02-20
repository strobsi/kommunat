const okta = require("@okta/okta-sdk-nodejs");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;


// Define an Okta client so any user management tasks can be performed
const oktaClient = new okta.Client({
  orgUrl: "https://dev-664243.oktapreview.com",
  token: "00BBR-JpQ-tVhtCjkCtyTg3FHpxDaR54EWGOyKNRUK",
});

// Define the OpenID Connect client
const oidc = new ExpressOIDC({
  issuer: 'https://dev-664243.oktapreview.com/oauth2/default',
  client_id: "0oajfzo7cyPEboxi60h7",
  client_secret: "OuxkkQqw0g8nBKPxSCBmfNaPgAzYqqG9I7kOmsrt",
  redirect_uri: "http://localhost:3000/users/callback",
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});


module.exports = { oidc, oktaClient };
