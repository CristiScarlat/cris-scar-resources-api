"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const auth_1 = require("firebase-admin/auth");
require('dotenv').config();
const configObj = {
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
};
const config = {
    credential: firebase_admin_1.default.credential.cert(configObj),
    databaseURL: 'https://xxxxxx.firebaseio.com'
};
const app = firebase_admin_1.default.apps.length
    ? firebase_admin_1.default.app()
    : firebase_admin_1.default.initializeApp(config);
exports.auth = (0, auth_1.getAuth)(app);
//# sourceMappingURL=fb.js.map