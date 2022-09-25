const dotenv = require('dotenv');
dotenv.config();
const chai = require('chai');
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server';

describe('Auth test case', function () {
  it('Should login and get auth token', async () => {
    const result = await testServer.executeOperation({
      query: `mutation {
        login(
            input:{
                email:"Admin@mail.com",
                password:"admin"
            }
            ) {
                status {
                    code
                    header
                    description
                }
                data {
                    token
                    email
                }
            }
    }`,
    });
    expect(result.data.login.status.code).equal(200);
    expect(result).to.have.property('data');
    expect(result.data.login.data).to.have.property('token');
  });
});
