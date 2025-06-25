import express, {Request, Response} from 'express';
import { auth } from './lib/fb.js';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  // max 30 requests per IP per minute
  message: 'Too many requests, slow down.',
  });

require('dotenv').config()
const app = express();
const PORT: number = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', limiter);

//Block simple bots and non-browser requests:
app.use((req, res, next) => {
  const userAgent = req.get('User-Agent');
  if (!userAgent || !userAgent.includes('Mozilla')) {
    return res.status(403).json({ error: 'Bots not allowed' });
  }
  next();
});

const mealsWithDrinksRoutes = require('./routes/mealswithdrinks');

app.use('/mealswithdrinks', mealsWithDrinksRoutes);

app.get('/', (req, res) => {
  res.send('My api and file storage with firebase auth check!');
});

app.get('/check', async (req: Request, res: Response) => {
  try {
    const data = await auth.verifyIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmZDA3MmRmYTM4MDU2NzlmMTZmZTQxNzM4YzJhM2FkM2Y5MGIyMTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ3Jpc3RpYW4gU2NhcmxhdCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJSFBHZWwxb00tdFhndGNSQzlINzloclIxRldYMDduQzlLeFlhTktkZ1NMQjQ5eFN5Vj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jcmlzLXdlYi1hcHBzIiwiYXVkIjoiY3Jpcy13ZWItYXBwcyIsImF1dGhfdGltZSI6MTczMjkwMTY1NCwidXNlcl9pZCI6IjcwTmE0YkZadjRXN1NKRlJsNzU0R3RqalFMNDIiLCJzdWIiOiI3ME5hNGJGWnY0VzdTSkZSbDc1NEd0ampRTDQyIiwiaWF0IjoxNzMyOTAxNjU0LCJleHAiOjE3MzI5MDUyNTQsImVtYWlsIjoiNzguY3Jpc3RpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAwMTU3NTgwODEyMjEyNzgyNDA2Il0sImVtYWlsIjpbIjc4LmNyaXN0aUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mr0EK7ddf6NfEM-mlkT0Qh4NgNgSBxU1PFKzs-7d1eNw-cS5MIsnjS7TDM2asLvCgTTofKIw5djmAaRcQix3whrQgZJyHmmdrGaBWAREP8Ul0XCiIN5LpvNXBgsKs4WqrN6U1XKaEjPRFNoJ_vvnO3oT02WMf9BRnWLx8Vb3NLPChWDjfIOdptE9do63qACvnpZ8QDNkQvwZrSu0agVN1ceEMHwR3j5bwuixXzB31fpVrXSaRyWbZ7NDu2p70Q-VXUbBWiYU-rmPsY03lmDBlMCeVZV7qfpmtOXF7vPluExp_0w4kauWmLgxwthebbBSpTWzKz74j18SEuLppHOVmw")
    res.json({data})
  }
  catch(error){
    console.log('Error listing users:', error);
    res.json({error})
  }
})


app.listen(PORT, '0.0.0.0', () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});