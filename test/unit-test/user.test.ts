const dotenv = require('dotenv');
dotenv.config();
const chai = require('chai');
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server';

describe('User Test Cases', function () {
  it('Should get all users', async () => {
    const result = await testServer.executeOperation({
      query: `query{
        getUsers{
              status{
              code
              header
              description
            }
          data{
            name
            email
          }
        }
      }`,
    });
    expect(result.data.getUsers.status.code).equal(200);
  });

  it('Should get token by email', async () => {
    const result = await testServer.executeOperation({
      query: `query {
        token(email: "Admin@test.com")
      }`,
    });
    expect(result.data);
  });

  it('Should create new user', async () => {
    const result = await testServer.executeOperation({
      query: `mutation {
        addUser(
          input: {
            email: "Admin${Math.random()}@test.com"
            name: "Admin"
            password: "self"
           phone :"1234567890"
          }
        ) {
          status {
            code
            header
            description
          }
          data {
            name
          }
        }
      }`,
    });
    const responseProperties = ['name'];
    const response = result.data.addUser;
    expect(response.status.code).equal(200);
    expect(response).to.have.property('data');
    expect(response.data).to.have.keys(responseProperties);
    expect(response.data.name).equal('Admin')
  });

  it('Should throw error on invalid id', async () => {
    const result = await testServer.executeOperation({
      query: `query {
        getUserById(
          id: "41224d776a326fb40f"
        ){
          status {
            code
            header
            description
        }
        data {
          name
        }
      }
    }`,
    });
    console.log('getUserById', result);
    console.log('getUserById', result?.data);
    expect(result.data.getUserById.status.code).equal(500);
  });
});
