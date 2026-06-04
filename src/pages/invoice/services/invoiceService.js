import BaseApiService from '../../../services/api/baseApiService';
import httpClient from '../../../services/api/httpClient';

class InvoiceService extends BaseApiService {
  constructor() {
    super('invoices');
  }

  async getAll(params = {}) {
    const response = await super.getAll(params);

    const invoices = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

    return {
      data: invoices,
      meta: response?.meta || response?.data?.meta || {},
      links: response?.links || response?.data?.links || {},
    };
  }

  async getById(id) {
    const response = await super.getById(id);
    return response?.data || response;
  }

  async create(data) {
    const response = await super.create(data);
    return response?.data || response;
  }

  async update(id, data) {
    const response = await super.update(id, data);
    return response?.data || response;
  }

  async delete(id) {
    const response = await super.delete(id);
    return response?.data || response;
  }

  async send(id, payload) {
    const response = await httpClient.post(`/api/v1/vendors/invoices/${id}/send`, payload);
    return response?.data?.data || response?.data;
  }
}

export default new InvoiceService();
