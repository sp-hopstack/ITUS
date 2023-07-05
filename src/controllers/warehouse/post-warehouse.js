export default function makePostWarehouse({ addWarehouse, determineTenant }) {
  return async function postWarehouse(httpRequest) {
    try {
      const tenant = await determineTenant(
        JSON.parse(httpRequest.headers.tenant),
      );
      const warehouseInfo = httpRequest.body;
      const response = await addWarehouse({
        tenant,
        ...warehouseInfo,
      });
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(response.updatedAt).toUTCString(),
        },
        statusCode: 200,
        body: response,
      };
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          message: e.message,
        },
      };
    }
  };
}
