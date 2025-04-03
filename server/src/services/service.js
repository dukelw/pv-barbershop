const { ServiceModel } = require("../models/Service");
const { NotFoundError, BadRequestError } = require("../core/error-response");

class ServiceService {
  async createService({ name, price, duration, description, image }) {
    const newService = await ServiceModel.create({
      service_name: name,
      service_price: price,
      service_duration: duration,
      service_description: description,
      service_image: image,
    });

    return newService;
  }

  async getAllServices() {
    return await ServiceModel.find({ isActive: true });
  }

  async getServiceById(serviceID) {
    const service = await ServiceModel.findById(serviceID);
    if (!service) throw new NotFoundError("Service not found");
    return service;
  }

  async updateService(serviceID, updates) {
    const updatedService = await ServiceModel.findByIdAndUpdate(
      serviceID,
      updates,
      { new: true }
    );
    if (!updatedService) throw new NotFoundError("Service not found");
    return updatedService;
  }

  async deleteService(serviceID) {
    const deletedService = await ServiceModel.findByIdAndDelete(serviceID);
    if (!deletedService) throw new NotFoundError("Service not found");
    return deletedService;
  }
}

module.exports = new ServiceService();
