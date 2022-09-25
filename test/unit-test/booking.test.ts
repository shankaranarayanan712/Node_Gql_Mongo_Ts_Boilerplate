const dotenv = require('dotenv');
dotenv.config();
const chai = require('chai');
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server';

describe('Booking Test Cases', function () {
  it('Should throw error if the car that is trying to be booked doesnot Exist', async () => {
    const query = `mutation{
            createCarBooking (
                input: {
                    userId: "632f5fcb9a819939f8b20b4b",
                    carId: "632dfa7c16b7a71e64740111",
                    paymentTransactionId: "123",
                    startDate: "2000-10-03T18:30:00.000Z",
                    endDate: "2000-10-04T18:30:00.000Z"
                    }
                ) {
                status {
                    code
                    header
                    description
                }
                data {
                    id
                    userId
                    carId
                    paymentTransactionId
                    startDate
                    endDate
                    status
                }
            }
        }`;
    const result = await testServer.executeOperation({
      query,
    });
    const respone = result?.data.createCarBooking;

    expect(respone.status.header).equal('Error');
    expect(respone.status.code).equal(500);
    expect(respone.status.description).oneOf([
      'car not found, please provide a valid car to proeed with booking',
      'User not found, please provide a valid user to proeed with booking',
    ]);
  });
  it('Should throw error if End date is lesser than start date when booking car', async () => {
    const query = `mutation{
            createCarBooking (
                input: {
                    userId: "632f5fcb9a819939f8b20b4b",
                    carId: "632dfa7c16b7a71e64740111",
                    paymentTransactionId: "123",
                    startDate: "2000-10-03T18:30:00.000Z",
                    endDate: "2000-10-01T18:30:00.000Z"
                    }
                ) {
                status {
                    code
                    header
                    description
                }
                data {
                    id
                    userId
                    carId
                    paymentTransactionId
                    startDate
                    endDate
                    status
                }
            }
        }`;
    const result = await testServer.executeOperation({
      query,
    });
    const respone = result?.data.createCarBooking;

    expect(respone.status.header).equal('Error');
    expect(respone.status.code).equal(500);
    expect(respone.status.description).equal('"endDate" must be greater than "ref:startDate"');
  });


  it('Should throw error when try to book a office that is not available', async () => {
    const result = await testServer.executeOperation({
      query: `mutation{
        createOfficeBooking (
            input: {
                userId: "632f5fcb9a819939f8b20b4b",
                officeId: "632dfa7c16b7a71e64740111",
                paymentTransactionId: "213123",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-04T18:30:00.000Z"
              }
          ) {
            status {
                code
                header
                description
            }
            data {
                id
                userId
                officeId
                paymentTransactionId
                startDate
                endDate
                status
            }
        }
    }`,
    });
    const respone = result?.data.createOfficeBooking;
    expect(respone.status.header).equal('Error');
    expect(respone.status.code).equal(500);
    expect(respone.status.description).oneOf([
      'office not found, please provide a valid office to proeed with booking',
      'User not found, please provide a valid user to proeed with booking',
    ]);
  });

  it('Should throw error for invalid id', async () => {
    const result = await testServer.executeOperation({
      query: `mutation{
        createOfficeBooking (
            input: {
                userId: "632f5fcb9a819939f8b20b4s",
                officeId: "632dfa7c16b7a71e64740122",
                paymentTransactionId: "13123123",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-04T18:30:00.000Z"
              }
          ) {
            status {
                code
                header
                description
            }
            data {
                id
                userId
                officeId
                paymentTransactionId
                startDate
                endDate
                status
            }
        }
    }`,
    });
    const respone = result?.data.createOfficeBooking;
    expect(respone.status.header).equal('Error');
    expect(respone.status.code).equal(500);
    expect(respone.status.description).equal("Cast to ObjectId failed for value \"632f5fcb9a819939f8b20b4s\" at path \"_id\" for model \"User\"");
  });

  it('Should throw error if End date is lesser than start date when booking office', async () => {
    const result = await testServer.executeOperation({
      query: `mutation{
        createOfficeBooking (
            input: {
                userId: "632f5fcb9a819939f8b20b4s",
                officeId: "632dfa7c16b7a71e64740122",
                paymentTransactionId: "13123123",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-01T18:30:00.000Z"
              }
          ) {
            status {
                code
                header
                description
            }
            data {
                id
                userId
                officeId
                paymentTransactionId
                startDate
                endDate
                status
            }
        }
    }`,
    });
    const respone = result?.data.createOfficeBooking;
    expect(respone.status.header).equal('Error');
    expect(respone.status.code).equal(500);
    expect(respone.status.description).equal('"endDate" must be greater than "ref:startDate"');
  });
  // pass valid parameters to get result for below tests

  // it('Should book Office', async () => {
  //   const result = await testServer.executeOperation({
  //     query: `mutation{
  //         createOfficeBooking (
  //             input: {
  //                 userId: "632dfa7c16b7a71e647401d8",
  //                 officeId: "632f4c1a5af5275e403a8f59",
  //                 paymentTransactionId: "",
  //                 startDate: "2000-10-03T18:30:00.000Z",
  //                 endDate: "2000-10-03T18:30:00.000Z"
  //               }
  //           ) {
  //             status {
  //                 code
  //                 header
  //                 description
  //             }
  //             data {
  //                 id
  //                 userId
  //                 officeId
  //                 paymentTransactionId
  //                 startDate
  //                 endDate
  //                 status
  //             }
  //         }
  //     }`,
  //   });
  //   const respone = result?.data.createOfficeBooking;
  //   const responseProperties = [
  //     'userId',
  //     'id',
  //     'officeId',
  //     'paymentTransactionId',
  //     'startDate',
  //     'endDate',
  //     'status',
  //   ];
  //   expect(respone.status.code).equal(200);
  //   expect(respone).to.have.property('data');
  //   expect(respone.data).to.have.keys(responseProperties);
  //   expect(respone.data.status).equal('BOOKED');
  // });

  // it('Should Create Car Booking', async () => {
  //   const query = `mutation{
  //       createCarBooking (
  //           input: {
  //               userId: "632dfa7c16b7a71e647401d8",
  //               carId: "632f4c1a5af5275e403a8f51",
  //               paymentTransactionId: "123",
  //               startDate: "2000-10-03T18:30:00.000Z",
  //               endDate: "2000-10-03T18:30:00.000Z"
  //               }
  //           ) {
  //           status {
  //               code
  //               header
  //               description
  //           }
  //           data {
  //               id
  //               userId
  //               carId
  //               paymentTransactionId
  //               startDate
  //               endDate
  //               status
  //           }
  //       }
  //   }`;
  //   const result = await testServer.executeOperation({
  //     query: query,
  //   });
  //   const respone = result?.data.createCarBooking;
  //   const responseProperties = [
  //     'userId',
  //     'id',
  //     'carId',
  //     'paymentTransactionId',
  //     'startDate',
  //     'endDate',
  //     'status',
  //   ];
  //   expect(respone.status.code).equal(200);
  //   expect(respone).to.have.property('data');
  //   expect(respone.data).to.have.keys(responseProperties);
  //   expect(respone.data.status).equal('BOOKED');
  // });
});
