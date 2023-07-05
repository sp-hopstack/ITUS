import setupLogger from '../../setup/logging';

const logger = setupLogger(__filename);

export default function makeGetWarehouseFields({
  fetchWarehouseFields,
  determineTenant,
}) {
  return async function getWarehouseFields(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const tenant = await determineTenant(
        JSON.parse(httpRequest.headers.tenant),
      );
      const response = await fetchWarehouseFields({
        tenant,
      });
      return {
        headers,
        statusCode: 200,
        body: response,
      };
    } catch (e) {
      // TODO: Error logging
      logger.error(e);
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
