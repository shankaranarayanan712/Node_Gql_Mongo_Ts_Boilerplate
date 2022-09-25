import { IResolvers } from 'graphql-tools';

import { CarsController } from '../../controllers/cars.controller';

const carsController = new CarsController();

const carResolver: IResolvers = {
  Query: {
    listCars: (_, __: any) => {
      return carsController.listCars();
    },
  },
};

export default carResolver;
