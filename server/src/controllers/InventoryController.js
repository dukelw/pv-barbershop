const inventoryService = require("../services/inventory");
const { CREATED, SuccessResponse } = require("../core/success-response");

class InventoryController {
  async addItem(req, res, next) {
    new CREATED({
      message: "Item added successfully",
      metadata: await inventoryService.addInventoryItem(req.body),
    }).send(res);
  }

  async getAll(req, res, next) {
    new SuccessResponse({
      message: "Inventory list",
      metadata: await inventoryService.getInventory(),
    }).send(res);
  }

  async updateItem(req, res, next) {
    new SuccessResponse({
      message: "Item updated successfully",
      metadata: await inventoryService.updateInventoryItem(
        req.params.id,
        req.body
      ),
    }).send(res);
  }

  async deleteItem(req, res, next) {
    new SuccessResponse({
      message: "Item deleted successfully",
      metadata: await inventoryService.deleteInventoryItem(req.params.id),
    }).send(res);
  }
}

module.exports = new InventoryController();
