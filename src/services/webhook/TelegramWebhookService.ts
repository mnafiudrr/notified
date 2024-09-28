import { decrypt, encrypt } from "@/utils/encryptor";
import { WebhookRequestType } from "@/utils/types/TelegramWebhookTypes"
import { Context } from "hono"

class TelegramWebhookService {
  process = async(data: WebhookRequestType, c: Context): Promise<{data: any, error: boolean}> => {
    const { command, args, error } = this.#getText(data);
    if (error || command !== "/createWebhook")
      return {
        data: null,
        error: false
      }

    const chatId = this.#getChatId(data)
    const encrypted = encrypt(`${chatId.toString()}-${args}`, process.env.KEY);

    this.sendTextChat(`Your chat webhook: https://${c.req.header("host")}/${encrypted}`, chatId.toString());
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

  #getText = (data: WebhookRequestType) => {
    if (!data.message)
      return {
        command: "",
        args: "",
        error: true
      }

    if (!data.message.text)
      return {
        command: "",
        args: "",
        error: true
      }

    const text = data.message.text
    return {
      /**
       * Command is the first word of the message
       * For example, if the message is "/start Hello World", the command is "/start"
       */
      command: text?.split(" ")[0],
      /**
       * Args are the remaining words of the message
       * For example, if the message is "/start Hello World", the args are "Hello World"
       */
      args: text?.split(" ").slice(1).join(" "),
      error: false
    }
  }
}

export default new TelegramWebhookService;