class Message {
  constructor(user, message) {
    this.user = user;
    this.message = message;
    this.id;
    this.created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    this.updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  getUser() {
    return this.user;
  }

  getMessage() {
    return this.message;
  }

  getDate() {
    return this.date;
  }

  getId() {
    return this.id;
  }

  setUser(user) {
    this.user = user;
  }

  setMessage(message) {
    this.message = message;
  }

  setDate(date) {
    this.date = date;
  }

  setId(id) {
    this.id = id;
  }
}

export default Message;
