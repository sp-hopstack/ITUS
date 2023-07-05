import makeAddWarehouse from './add-warehouse';
import makeEditWarehouse from './edit-warehouse';
import makeRemoveWarehouse from './remove-warehouse';
import makeListWarehouses from './list-warehouses';
import makeFindWarehouse from './find-warehouse';
import makeFetchWarehouseFields from './fetch-warehouse-filelds';
import makeBulkUploadWarehouses from './bulk-upload-warehouses';

import { warehousesDb, customersDb } from '../../data-access';

const addWarehouse = makeAddWarehouse({ warehousesDb });
const editWarehouse = makeEditWarehouse({ warehousesDb });
const listWarehouses = makeListWarehouses({ warehousesDb });
const removeWarehouse = makeRemoveWarehouse({ warehousesDb, customersDb });
const findWarehouse = makeFindWarehouse({ warehousesDb });
const fetchWarehouseFields = makeFetchWarehouseFields({});
const bulkUploadWarehouses = makeBulkUploadWarehouses({ addWarehouse });

const warehouseService = Object.freeze({
  addWarehouse,
  editWarehouse,
  listWarehouses,
  removeWarehouse,
  findWarehouse,
  fetchWarehouseFields,
  bulkUploadWarehouses,
});

export default warehouseService;
export {
  addWarehouse,
  editWarehouse,
  listWarehouses,
  removeWarehouse,
  findWarehouse,
  fetchWarehouseFields,
  bulkUploadWarehouses,
};
