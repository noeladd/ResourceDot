module.exports = {
  DATABASE_URL: 'postgres://localhost:5432/testing-fsg',
  SESSION_SECRET: 'The hero of Canton is a man named Jayne',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  FACEBOOK: {
    clientID: 'INSERT_FACEBOOK_CLIENTID_HERE',
    clientSecret: 'INSERT_FACEBOOK_CLIENT_SECRET_HERE',
    callbackURL: 'INSERT_FACEBOOK_CALLBACK_HERE'
  },
  GOOGLE: {
    clientID: 'INSERT_GOOGLE_CLIENTID_HERE',
    clientSecret: 'INSERT_GOOGLE_CLIENT_SECRET_HERE',
    callbackURL: 'INSERT_GOOGLE_CALLBACK_HERE'
  },
  GITHUB: {
    clientID: 'INSERT_GITHUB_CLIENTID_HERE',
    clientSecret: 'INSERT_GITHUB_CLIENT_SECRET_HERE',
    callbackURL: 'INSERT_GITHUB_CALLBACK_HERE'
  },
  LOGGING: false,
  NATIVE: true
};
