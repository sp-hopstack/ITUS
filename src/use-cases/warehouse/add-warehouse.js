import makeWarehouse from '../../entities/warehouse';

export default function makeAddWarehouse({ warehousesDb }) {
  return async function addWarehouse({ tenant, ...warehouseInfo }) {
    const warehouse = makeWarehouse({
      tenant: tenant.id.toString(),
      ...warehouseInfo,
    });
    const exists = await warehousesDb.findOne({
      $or: [{ name: warehouse.getName() }, { code: warehouse.getCode() }],
      tenant: tenant.id.toString(),
    });
    if (exists) {
      throw new Error(`Warehouse with those name or code already exists`);
    }

    await warehousesDb.insert({
      id: warehouse.getId(),
      name: warehouse.getName(),
      code: warehouse.getCode(),
      tenant: warehouse.getTenant(),
      location: warehouse.getLocation(),
      typeOfWarehouse: warehouse.getTypeOfWarehouse(),
      splitOrdersEnabled: warehouse.getSplitOrdersEnabled(),
      createdAt: warehouse.getCreatedAt(),
      updatedAt: warehouse.getUpdatedAt(),
      active: warehouse.getActive(),
      storageTypes: warehouse.getStorageTypes(),
      attributes: warehouse.getAttributes(),
    });

    return {
      message: 'Warehouse added successfully',
    };
  };
}
