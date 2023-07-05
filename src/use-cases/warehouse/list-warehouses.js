import Id from '../../utils/Id';

const constructFilters = async (filters) => {
  if (!filters || Object.keys(filters).length === 0) return {};
  const orFilter = [];
  const andFilter = [];

  if (filters.tenant) {
    andFilter.push({ tenant: filters.tenant });
  }

  if (filters.id && filters.id.length > 0) {
    /* eslint no-underscore-dangle: 0 */
    // eslint-disable-next-line no-param-reassign
    filters._id = {
      $in: filters.id.map((item) => Id.convertId(item)),
    };
    andFilter.push({ _id: filters._id });
  }

  if (filters.name) {
    andFilter.push({ name: filters.name });
  }

  if (filters.code) {
    andFilter.push({ code: filters.code });
  }

  if (filters.keyword) {
    const searchTerm = new RegExp(filters.keyword, 'i');
    orFilter.push(
      {
        name: { $regex: searchTerm },
      },
      { code: { $regex: searchTerm } },
    );
  }

  if ([true, false].includes(filters.active) === true) {
    andFilter.push({ active: filters.active });
  }

  if (filters.typeOfWarehouse && filters.typeOfWarehouse.length) {
    orFilter.push({
      typeOfWarehouse: { $in: filters.typeOfWarehouse },
    });
  }

  if (filters.storageTypes && filters.storageTypes.length) {
    orFilter.push({
      storageTypes: { $in: filters.storageTypes },
    });
  }

  const returnFilters = {};

  if (orFilter.length > 0) {
    returnFilters.$or = orFilter;
  }

  if (andFilter.length > 0) {
    returnFilters.$and = andFilter;
  }
  return returnFilters;
};

export default function makeListWarehouses({ warehousesDb }) {
  return async function listWarehouses({
    all = false,
    perPage = 25,
    pageNumber = 1,
    sort,
    tenant,
    filters,
  }) {
    const defaultWarehouse = await warehousesDb.findOne({
      tenant: tenant.id.toString(),
      isDefault: true,
    });
    if (!defaultWarehouse) {
      await warehousesDb.insert({
        id: Id.makeId(),
        name: `Default`,
        code: 'DEF',
        isDefault: true,
        tenant: tenant.id.toString(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // eslint-disable-next-line no-param-reassign
    perPage = parseInt(perPage.toString(), 10);
    // eslint-disable-next-line no-param-reassign
    pageNumber = parseInt(pageNumber.toString(), 10);
    if (!filters || Object.keys(filters).length === 0) {
      // eslint-disable-next-line no-param-reassign
      filters = {};
    }

    // eslint-disable-next-line no-param-reassign
    filters.tenant = tenant.id.toString();
    const filter = await constructFilters(filters);

    let entities = [];
    let total = 0;

    if (all) {
      entities = await warehousesDb.find(filter);
      total = entities.length;
    } else {
      entities = await warehousesDb.filtered(filter, sort, perPage, pageNumber);
      total = await warehousesDb.countDocuments(filter);
    }

    entities.forEach(async (warehouse) => {
      if ([true, false].includes(warehouse.active) === false) {
        // eslint-disable-next-line no-param-reassign
        warehouse.active = true;
        await warehousesDb.update({ id: warehouse.id, active: true });
      }
    });

    return {
      entities,
      total,
    };
  };
}
