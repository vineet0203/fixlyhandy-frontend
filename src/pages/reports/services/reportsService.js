import httpClient from '../../../services/api/httpClient';

/**
 * Reports API Service
 * Fetches real analytics data from the backend.
 */
class ReportsService {
  async getOverview() {
    const response = await httpClient.get('/api/v1/vendors/reports/overview');
    return response?.data?.data || response?.data || {};
  }
}

export default new ReportsService();
