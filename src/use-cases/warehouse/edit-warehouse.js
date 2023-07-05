import Id from '../../utils/Id';
import makeWarehouse from '../../entities/warehouse';

export default function makeEditWarehouse({ warehousesDb }) {
  return async function editWarehouse({ tenant, id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply an id.');
    }

    const existing = await warehousesDb.findById({
      id,
      tenant: tenant.id.toString(),
    });

    if (!existing) {
      throw new RangeError('Warehouse not found.');
    }

    const warehouse = makeWarehouse({
      ...existing,
      ...changes,
      updatedAt: undefined,
    });
    const anotherWarehouseSameCode = await warehousesDb.findOne({
      $or: [{ code: warehouse.getCode() }, { name: warehouse.getName() }],
      _id: { $ne: Id.convertId(id) },
      tenant: tenant.id.toString(),
    });
    if (anotherWarehouseSameCode) {
      throw new Error('Another warehouse with that same code exists.');
    }

    await warehousesDb.update({
      id: warehouse.getId(),
      name: warehouse.getName(),
      code: warehouse.getCode(),
      location: warehouse.getLocation(),
      typeOfWarehouse: warehouse.getTypeOfWarehouse(),
      splitOrdersEnabled: warehouse.getSplitOrdersEnabled(),
      createdAt: warehouse.getCreatedAt(),
      updatedAt: warehouse.getUpdatedAt(),
      active: warehouse.getActive(),
      storageTypes: warehouse.getStorageTypes(),
    });

    return {
      message: 'Warehouse updated successfully',
    };
  };
}
