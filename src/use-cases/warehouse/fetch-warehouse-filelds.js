export default function makeFetchWarehouseFields() {
  return async function fetchWarehouseFields() {
    return {
      name: 'Name*',
      code: 'Code*',
      typeOfWarehouse:
        'Type Of warehouse* (Seprate with commas to add multiple type)',
      storageTypes: 'Storage Types* (Chilled or Ambient)',
    };
  };
}
