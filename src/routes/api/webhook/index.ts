
import { Hono } from 'hono';
import TelegramWebhookController from "@/controllers/webhook/TelegramWebhookController";

export const app = new Hono();

app.get('/', (c) => {
  const sampleJson = {
    name: 'Hono',
    message: 'Hello API Webhook Hononafiu~!'
  }
  
  return c.json(sampleJson)
});

app.post(`telegram`, TelegramWebhookController.webhook);
app.post('telegram/:id', TelegramWebhookController.webhookParser);


export default app