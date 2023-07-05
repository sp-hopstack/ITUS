export default function buildMakeWarehouse({ Id }) {
  return function makeWarehouse({
    id = Id.makeId(),
    createdAt = Date.now(),
    updatedAt = Date.now(),
    name,
    code,
    location,
    tenant,
    typeOfWarehouse,
    splitOrdersEnabled,
    active = true,
    storageTypes,
    attributes,
  } = {}) {
    if (!tenant) {
      throw new Error(`Warehouse must have a tenant`);
    }

    if (!name) {
      throw new Error('Warehouse must have a name.');
    }

    if (!code) {
      throw new Error('Warehouse must have a code');
    }

    if (!location) {
      throw new Error('Warehouse must have a location');
    }

    return Object.freeze({
      getId: () => id,
      getTenant: () => tenant,
      getName: () => name,
      getCode: () => code,
      getLocation: () => location,
      getTypeOfWarehouse: () => typeOfWarehouse,
      getSplitOrdersEnabled: () => splitOrdersEnabled,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt,
      getActive: () => active,
      getStorageTypes: () => storageTypes,
      getAttributes: () => attributes,
    });
  };
}
