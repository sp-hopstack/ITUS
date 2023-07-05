import {
  addWarehouse,
  editWarehouse,
  listWarehouses,
  removeWarehouse,
  findWarehouse,
  fetchWarehouseFields,
  bulkUploadWarehouses,
} from '../../use-cases/warehouse';
import { determineTenant } from '../../use-cases/global';

import makeDeleteWarehouse from './delete-warehouse';
import makeGetWarehouses from './get-warehouses';
import makePostWarehouse from './post-warehouse';
import makeUpdateWarehouse from './update-warehouse';
import makeGetWarehouse from './get-warehouse';
import makeGetWarehouseFields from './get-warehouse-fields';
import makePostBulkUploadWarehouses from './post-bulk-upload-warehouses';

const deleteWarehouse = makeDeleteWarehouse({
  removeWarehouse,
  determineTenant,
});
const getWarehouses = makeGetWarehouses({
  listWarehouses,
  determineTenant,
});
const getWarehouse = makeGetWarehouse({ findWarehouse, determineTenant });
const postWarehouse = makePostWarehouse({ addWarehouse, determineTenant });
const updateWarehouse = makeUpdateWarehouse({ editWarehouse, determineTenant });
const getWarehouseFields = makeGetWarehouseFields({
  fetchWarehouseFields,
  determineTenant,
});
const postBulkUploadWarehouses = makePostBulkUploadWarehouses({
  bulkUploadWarehouses,
  determineTenant,
});

const warehouseController = Object.freeze({
  deleteWarehouse,
  getWarehouses,
  postWarehouse,
  updateWarehouse,
  getWarehouse,
  getWarehouseFields,
  postBulkUploadWarehouses,
});

export default warehouseController;
export {
  deleteWarehouse,
  getWarehouses,
  postWarehouse,
  updateWarehouse,
  getWarehouse,
  getWarehouseFields,
  postBulkUploadWarehouses,
};
