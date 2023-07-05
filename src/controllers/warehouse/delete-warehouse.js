export default function makeDeleteWarehouse({
  removeWarehouse,
  determineTenant,
}) {
  return async function deleteWarehouse(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const tenant = await determineTenant(
        JSON.parse(httpRequest.headers.tenant),
      );
      const response = await removeWarehouse({
        id: httpRequest.params.id,
        tenant,
      });
      return {
        headers,
        statusCode: response.deletedCount === 0 ? 404 : 200,
        body: response,
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          message: e.message,
        },
      };
    }
  };
}
