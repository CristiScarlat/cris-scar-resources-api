import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

require('dotenv').config()

const configObj: admin.ServiceAccount = {
  //@ts-ignore
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
}

const config = {
  credential: admin.credential.cert(configObj as admin.ServiceAccount),
  databaseURL: 'https://xxxxxx.firebaseio.com'
};

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp(config);

export const auth = getAuth(app);
