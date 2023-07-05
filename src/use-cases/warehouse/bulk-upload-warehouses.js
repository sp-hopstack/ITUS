export default function makeBulkUploadWarehouses({ addWarehouse }) {
  const createWarehouseObjects = (rows) => {
    const mapping = {
      name: 'string',
      code: 'string',
      typeOfWarehouse: 'array',
      storageTypes: 'array',
    };

    const warehouses = [];
    let error = false;
    const errors = {};

    rows.entries().forEach(([idx, row]) => {
      const warehouse = {};
      Object.keys(mapping).forEach((key) => {
        if (key in row && row[key] !== undefined) {
          warehouse[key] = row[key];
          if (mapping[key] === 'array') {
            warehouse[key] = row[key].split(',').map((type) => type.trim());
          }
        } else {
          error = true;
          if (idx in errors) {
            errors[idx].push(key);
          } else {
            errors[idx] = [key];
          }
        }
      });
      warehouse.attributes = row?.attributes;
      warehouses.push(warehouse);
    });

    return { warehouses, error, errors };
  };

  return async function bulkUploadWarehouses({ tenant, rows }) {
    // validate and correct data types of provided fields

    const { warehouses, error, errors } = createWarehouseObjects(rows);

    if (error) {
      return {
        error,
        errors,
        message: 'One or more rows failed validation. No data is added',
      };
    }

    warehouses.entries().forEach(async ([idx, warehouse]) => {
      try {
        await addWarehouse({ tenant, ...warehouse });
      } catch (err) {
        err.message = `Stop uploaded from row: ${idx} | ${err.message}`;
        throw err;
      }
    });

    return {
      error: false,
      message: 'Uploaded all the warehouses',
    };
  };
}
