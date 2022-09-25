const dotenv = require('dotenv');
dotenv.config();
const chai = require('chai');
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server';

describe('Car Test Cases', function () {
  it('Should get all Cars', async () => {
    const result = await testServer.executeOperation({
      query: `query listCars {
        listCars {
            status {
                code
                header
                description
            }
            data {
                id
                name
                model
                number
            }
        }
    }`,
    });
      expect(result.data.listCars.status.code).equal(200);
      expect(result).to.have.property('data');
      expect(result.data.listCars.data).to.be.an('array')
  });
});
