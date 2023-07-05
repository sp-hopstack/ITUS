import makeCallback from '../utils/express-callback';
import {
  deleteWarehouse,
  getWarehouses,
  postWarehouse,
  updateWarehouse,
  getWarehouse,
  getWarehouseFields,
  postBulkUploadWarehouses,
} from '../controllers/warehouse';
import health from '../healthcheck';

const routes = (app) => {
  app.get('/health', (_req, res) => res.json(health()));
  app.post(`/api/warehouses`, makeCallback(postWarehouse));
  app.delete(`/api/warehouses/:id`, makeCallback(deleteWarehouse));
  app.put(`/api/warehouses/:id`, makeCallback(updateWarehouse));
  app.get(`/api/warehouses`, makeCallback(getWarehouses));
  app.post(`/api/getWarehouses`, makeCallback(getWarehouses));
  app.get(`/api/warehouses/:id`, makeCallback(getWarehouse));
  app.get(`/api/getWarehouseFields`, makeCallback(getWarehouseFields));
  app.post(`/api/bulkUploadWarehouses`, makeCallback(postBulkUploadWarehouses));
};

export default routes;
