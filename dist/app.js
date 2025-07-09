"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fb_js_1 = require("./lib/fb.js");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 30,
    // max 30 requests per IP per minute
    message: 'Too many requests, slow down.',
});
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/', limiter);
//Block simple bots and non-browser requests:
// app.use((req, res, next) => {
//   if(req.path === "/health-check")next();
//   const userAgent = req.get('User-Agent');
//   if (!userAgent || !userAgent.includes('Mozilla')) {
//     return res.status(403).json({ error: 'Bots not allowed' });
//   }
//   next();
// });
const mealsWithDrinksRoutes = require('./routes/mealswithdrinks');
app.use('/mealswithdrinks', (0, cors_1.default)(), mealsWithDrinksRoutes);
app.get('/', (req, res) => {
    res.send('My api and file storage with firebase auth check!');
});
app.get('/health-check', (req, res) => {
    res.send('ok');
});
app.get('/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fb_js_1.auth.verifyIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmZDA3MmRmYTM4MDU2NzlmMTZmZTQxNzM4YzJhM2FkM2Y5MGIyMTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ3Jpc3RpYW4gU2NhcmxhdCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSFBHZWwxb00tdFhndGNSQzlINzloclIxRldYMDduQzlLeFlhTktkZ1NMQjQ5eFN5Vj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jcmlzLXdlYi1hcHBzIiwiYXVkIjoiY3Jpcy13ZWItYXBwcyIsImF1dGhfdGltZSI6MTczMjkwMTY1NCwidXNlcl9pZCI6IjcwTmE0YkZadjRXN1NKRlJsNzU0R3RqalFMNDIiLCJzdWIiOiI3ME5hNGJGWnY0VzdTSkZSbDc1NEd0ampRTDQyIiwiaWF0IjoxNzMyOTAxNjU0LCJleHAiOjE3MzI5MDUyNTQsImVtYWlsIjoiNzguY3Jpc3RpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwMTU3NTgwODEyMjEyNzgyNDA2Il0sImVtYWlsIjpbIjc4LmNyaXN0aUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mr0EK7ddf6NfEM-mlkT0Qh4NgNgSBxU1PFKzs-7d1eNw-cS5MIsnjS7TDM2asLvCgTTofKIw5djmAaRcQix3whrQgZJyHmmdrGaBWAREP8Ul0XCiIN5LpvNXBgsKs4WqrN6U1XKaEjPRFNoJ_vvnO3oT02WMf9BRnWLx8Vb3NLPChWDjfIOdptE9do63qACvnpZ8QDNkQvwZrSu0agVN1ceEMHwR3j5bwuixXzB31fpVrXSaRyWbZ7NDu2p70Q-VXUbBWiYU-rmPsY03lmDBlMCeVZV7qfpmtOXF7vPluExp_0w4kauWmLgxwthebbBSpTWzKz74j18SEuLppHOVmw");
        res.json({ data });
    }
    catch (error) {
        console.log('Error listing users:', error);
        res.json({ error });
    }
}));
app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map