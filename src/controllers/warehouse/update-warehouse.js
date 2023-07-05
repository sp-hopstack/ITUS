export default function makeUpdateWarehouse({
  editWarehouse,
  determineTenant,
}) {
  return async function updateWarehouse(httpRequest) {
    try {
      const tenant = await determineTenant(
        JSON.parse(httpRequest.headers.tenant),
      );
      const toEdit = {
        tenant,
        ...httpRequest.body,
        id: httpRequest.params.id,
      };
      const response = await editWarehouse(toEdit);
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date(response.updatedAt).toUTCString(),
        },
        statusCode: 200,
        body: response,
      };
    } catch (e) {
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json',
          },
          statusCode: 404,
          body: {
            message: e.message,
          },
        };
      }
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
