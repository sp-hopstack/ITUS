import config from 'config';
import axiosInstance from '../../utils/axiosInstance';
import makeGetTenant from './get-tenant';

const getTenant = makeGetTenant({
  issueHttpRequest: axiosInstance(config.get('tenantsApi')),
});

export default getTenant;
