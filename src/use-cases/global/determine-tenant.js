export default function makeDetermineTenant({ getTenantConnector }) {
  return async function determineTenant(tenant) {
    if (!tenant) {
      throw new Error(`Tenant info missing`);
    }
    const tenantObject = await getTenantConnector(tenant.id);
    if (tenantObject && tenantObject.active === true) {
      return tenantObject;
    }

    throw new Error(`Invalid Tenant`);
  };
}
