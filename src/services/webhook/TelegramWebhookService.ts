import { decrypt, encrypt } from "@/utils/encryptor";
import { WebhookRequestType } from "@/utils/types/TelegramWebhookTypes"
import { Context } from "hono"

class TelegramWebhookService {
  process = async(data: WebhookRequestType): Promise<{data: any, error: boolean}> => {
    const chatId = this.#getChatId(data)
    const encrypted = encrypt(chatId.toString(), process.env.KEY);
    
    return {
      data: encrypted,
      error: false
    }
  }

  sendTextChat = async (message: string, chatId: string, ) => {

    const data = new URLSearchParams();
    data.append("chat_id", chatId);
    data.append('text', message);

    const rawResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
      }
    );

    const content = await rawResponse.json();
    return content;
  }

  #getChatId = (data: WebhookRequestType) => {
    const chatId = data.message.chat.id
    return chatId
  }
}

export default new TelegramWebhookService;