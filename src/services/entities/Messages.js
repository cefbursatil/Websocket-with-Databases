import Message from "../../classes/Message.js";
import { returnMessage } from "../../utils.js";

class Messages {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  async save(message) {
    if (!message.user) {
      return returnMessage(true, "El usuario es obligatorio", null);
    }

    if (!message.message) {
      return returnMessage(true, "El mensaje es obligatorio", null);
    }
    try {
      const newMessage = new Message(message.user, message.message);
      const insertedId = await this.db.insert(newMessage).into(this.table);
      newMessage.id = insertedId[0].id;
      return returnMessage(false, "Mensaje guardado", newMessage);
    } catch (error) {
      return returnMessage(true, "Error al guardar el mensaje: " + error, null);
    }
  }

  async getAll() {
    try {
      const messages = JSON.parse(
        JSON.stringify(await this.db.select().from(this.table))
      );
      return returnMessage(false, "Mensajes obtenidos", messages);
    } catch (error) {
      return returnMessage(true, "Error al obtener los mensajes", null);
    }
  }
}

export default Messages;
