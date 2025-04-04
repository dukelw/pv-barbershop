const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const inventorySchema = new Schema(
  {
    item_name: { type: String, required: true },
    item_category: { type: String, required: true }, // Ví dụ: "sáp vuốt tóc", "dầu gội"
    quantity: { type: Number, required: true, default: 0 },
    unit_price: { type: Number, required: true },
    supplier: { type: String },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, inventorySchema);
