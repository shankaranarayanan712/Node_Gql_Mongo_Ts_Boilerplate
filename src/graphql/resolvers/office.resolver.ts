import { IResolvers } from 'graphql-tools';

import { OfficeController } from '../../controllers/office.controller';

const officeController = new OfficeController();

const officeResolver: IResolvers = {
  Query: {
    listOffice: (_, __: any) => {
      return officeController.listOffice();
    },
  },
};

export default officeResolver;
