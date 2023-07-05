export default function makeRemoveWarehouse({ warehousesDb, customersDb }) {
  function deleteNothing() {
    return {
      deletedCount: 0,
      message: 'Warehouse not found, nothing to delete.',
    };
  }

  async function hardDelete(warehouse) {
    await warehousesDb.remove(warehouse);
    return {
      deletedCount: 1,
      message: 'Warehouse deleted.',
    };
  }
  return async function removeWarehouse({ id, tenant } = {}) {
    if (!id) {
      throw new Error('You must supply a warehouse id.');
    }

    const warehouseToDelete = await warehousesDb.findById({
      id,
      tenant: tenant.id.toString(),
    });

    if (!warehouseToDelete) {
      return deleteNothing();
    }

    if (warehouseToDelete.isDefault === true) {
      throw new Error(`Cannot delete the default warehouse.`);
    }
    const atleast1Tenant = await customersDb.findOne({
      warehouses: warehouseToDelete.id.toString(),
    });

    if (atleast1Tenant) {
      // DEACTIVATE
      await warehousesDb.update({
        id: warehouseToDelete.id,
        active: false,
      });

      return { message: 'Warehouse deactivated successfully.' };
    }

    return hardDelete(warehouseToDelete);
  };
}
