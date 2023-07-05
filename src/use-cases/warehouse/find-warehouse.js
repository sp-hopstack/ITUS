import Id from '../../utils/Id';

export default function makeFindWarehouse({ warehousesDb }) {
  return async function findWarehouse({ id, tenant }) {
    return warehousesDb.findOne({
      _id: Id.convertId(id),
      tenant: tenant.id.toString(),
    });
  };
}
