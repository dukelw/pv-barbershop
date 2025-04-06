const InventoryModel = require("../models/Inventory");
const { NotFoundError } = require("../core/error-response");

class InventoryService {
  async addInventoryItem({ item_name, item_image, item_category, quantity, unit_price, supplier, }) {
    const newItem = await InventoryModel.create({
      item_name,
      item_image,
      item_category,
      quantity,
      unit_price,
      supplier,
    });

    return newItem;
  }

  async getInventory() {
    return await InventoryModel.find();
  }

  async updateInventoryItem(itemID, updates) {
    const updatedItem = await InventoryModel.findByIdAndUpdate(
      itemID,
      updates,
      { new: true }
    );
    if (!updatedItem) throw new NotFoundError("Item not found");
    return updatedItem;
  }

  async deleteInventoryItem(itemID) {
    const deletedItem = await InventoryModel.findByIdAndDelete(itemID);
    if (!deletedItem) throw new NotFoundError("Item not found");
    return deletedItem;
  }
}

module.exports = new InventoryService();
