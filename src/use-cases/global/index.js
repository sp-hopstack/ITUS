import makeDetermineTenant from './determine-tenant';
import getTenant from '../../connectors/get-tenant';

const determineTenant = makeDetermineTenant({ getTenantConnector: getTenant });

const globalService = Object.freeze({
  determineTenant,
});

export default globalService;
export { determineTenant };
