import * as process from "process";

export default () => ({
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallBackURL: process.env.GOOGLE_CALLBACK_URL,
  secretJwt: process.env.SECRET_JWT,
  expiresIn: process.env.EXPIRE_IN
})