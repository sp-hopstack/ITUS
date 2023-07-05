import setupLogger from '../../setup/logging';

const logger = setupLogger(__filename);

export default function makeGetWarehouses({ listWarehouses, determineTenant }) {
  return async function getWarehouses(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const tenant = await determineTenant(
        JSON.parse(httpRequest.headers.tenant),
      );
      const postWarehouses = await listWarehouses({
        tenant,
        ...httpRequest.body,
      });
      return {
        headers,
        statusCode: 200,
        body: postWarehouses,
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
