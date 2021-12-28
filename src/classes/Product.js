class Product {
  constructor(title, description, code, stock, price, thumbnail) {
    this.title = title;
    this.price = parseFloat(price);
    this.description = description;
    this.code = code;
    this.stock = parseInt(stock);
    this.thumbnail = thumbnail;
    this.created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    this.updated_at = new Date().toISOString().slice(0, 19).replace("T", " ");
    this.id;
  }
  getId() {
    return this.id;
  }
  getCreatedAt() {
    return this.createdAt;
  }
  getUpdatedAt() {
    return this.updatedAt;
  }
  getTitle() {
    return this.title;
  }
  getThumbnail() {
    return this.thumbnail;
  }
  getPrice() {
    return this.price;
  }
  getDescription() {
    return this.description;
  }
  getCode() {
    return this.code;
  }
  getStock() {
    return this.stock;
  }

  setId(id) {
    this.id = id;
  }
  setTitle(title) {
    this.title = title;
  }
  setDescription(description) {
    this.description = description;
  }
  setCode(code) {
    this.code = code;
  }
  setStock(stock) {
    this.stock = parseInt(stock);
  }
  setPrice(price) {
    this.price = parseFloat(price);
  }
}

export default Product;
