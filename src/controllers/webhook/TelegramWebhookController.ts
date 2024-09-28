import { Context } from "hono"
import TelegramWebhookService from "@/services/webhook/TelegramWebhookService"
import { decrypt } from "@/utils/encryptor";

class TelegramWebhookController {
  webhook = async(c: Context) => {
    const data = await c.req.json();
    console.log(c.req.url);
    console.log(data);
    
    const {data: processedData, error} = await TelegramWebhookService.process(data, c);

    return c.json({data: processedData, error})
  }

  webhookParser = async (c: Context) => {
    const id = c.req.param("id");
    const data = await c.req.json();
    console.log(c.req.url);
    console.log(data);

    try {
      const chatId = decrypt(id, process.env.KEY);
      const isNumber = /^\d+$/.test(chatId);
      if (!isNumber) 
        throw new Error();

      const message = typeof data === "string" ? data : JSON.stringify(data);
      TelegramWebhookService.sendTextChat(message, chatId);

      return c.json({ 
        message: 'success',
      });
    } catch (error) {
        return c.json({ error: "Invalid ID" }, 400);
    }
  }
}

export default new TelegramWebhookController