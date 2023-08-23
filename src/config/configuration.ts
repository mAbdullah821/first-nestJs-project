export default () => ({
  port: process.env.PORT || 3030,
  database: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
});
