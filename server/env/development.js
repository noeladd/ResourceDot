module.exports = {
  DATABASE_URL: 'postgres://localhost:5432/resourcedot',
  SESSION_SECRET: 'Optimus Prime is my real dad',
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
    clientID: '844072712782-ll5vp5bl6fksfh9gb816imh7o1662t2i.apps.googleusercontent.com',
    clientSecret: 'fntVdrzWnN2rlbhvI-kMdqtT',
    callbackURL: '/auth/google/callback'
  },
  GITHUB: {
    clientID: '75d7ceb948cfa1e83418',
    clientSecret: 'c348274e1aaecc2b2058e7a844f285c88240eaa1',
    callbackURL: 'auth/github/callback'
  },
  LOGGING: true,
  NATIVE: true
};
