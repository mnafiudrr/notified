
import { Hono } from 'hono';
import webhook from './webhook';

const app = new Hono();

app.route('/webhook', webhook);

app.get('/', (c) => {
  const sampleJson = {
    name: 'Hono',
    message: 'Hello API Hononafiu~!'
  }
  
  return c.json(sampleJson)
});

export default app