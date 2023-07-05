import setupLogger from '../../setup/logging';

const logger = setupLogger(__filename);

export default function makeGetWarehouses({ findWarehouse, determineTenant }) {
  return async function getWarehouses(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const tenant = await determineTenant(
        JSON.parse(httpRequest.headers.tenant),
      );
      const response = await findWarehouse({
        id: httpRequest.params.id,
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
