const dotenv = require('dotenv');
dotenv.config();
const chai = require('chai');
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server';

describe('Office Test Cases', function () {
  it('Should get all Office', async () => {
    const result = await testServer.executeOperation({
      query: `query listOffice {
        listOffice {
            status {
                code
                header
                description
            }
            data {
                id
                name
                address
                city
                email
                zip
                phone
            }
        }
    }`,
    });
      expect(result.data.listOffice.status.code).equal(200);
      expect(result).to.have.property('data');
      expect(result.data.listOffice.data).to.be.an('array')
  });
});
