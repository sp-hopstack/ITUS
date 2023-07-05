export default function makeGetTenant({ issueHttpRequest }) {
  return async function getTenant(tenantId) {
    try {
      return await issueHttpRequest.get(`/api/tenants/${tenantId}`);
    } catch (err) {
      throw new Error(err.response?.data.message);
    }
  };
}
