const dotenv = require('dotenv');
dotenv.config();
const chai = require('chai');
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server';
const User = require('../../src/models/user');
const Car = require('../../src/models/car');
const Office = require('../../src/models/office');
const OfficeBooking = require('../../src/models/office.booking');
const CarBooking = require('../../src/models/car.booking');

describe('Booking Test Cases', () => {
  let user;
  let car;
  let office;
  const carTestIds = [];
  const officeTestIds = [];
  beforeAll(async () => {
    user = await User.findOne({ email: 'Admin@mail.com' });
    car = await Car.findOne({ number: 'X12-543' });
    office = await Office.findOne({ name: 'IT-Platz' });
  });
  afterAll(async () => {
    await OfficeBooking.deleteMany({ _id: { $in: officeTestIds } });
    await CarBooking.deleteOne({ _id: carTestIds });
  });

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
    expect(respone.status.description).equal(
      'Cast to ObjectId failed for value "632f5fcb9a819939f8b20b4s" at path "_id" for model "User"'
    );
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

  it('Should book Office', async () => {
    const result = await testServer.executeOperation({
      query: `mutation{
          createOfficeBooking (
              input: {
                  userId: "${user.id}",
                  officeId: "${office.id}",
                  paymentTransactionId: "123123",
                  startDate: "2000-10-03T18:30:00.000Z",
                  endDate: "2000-10-03T19:30:00.000Z"
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
    const responseProperties = [
      'userId',
      'id',
      'officeId',
      'paymentTransactionId',
      'startDate',
      'endDate',
      'status',
    ];
    expect(respone.status.code).equal(200);
    expect(respone).to.have.property('data');
    expect(respone.data).to.have.keys(responseProperties);
    expect(respone.data.status).equal('BOOKED');
    officeTestIds.push(respone.data.id);
  });

  it('Should Create Car Booking', async () => {
    const query = `mutation{
        createCarBooking (
            input: {
                userId: "${user.id}",
                carId:  "${car.id}",
                paymentTransactionId: "123",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-05T18:30:00.000Z"
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
      query: query,
    });
    const respone = result?.data.createCarBooking;
    const responseProperties = [
      'userId',
      'id',
      'carId',
      'paymentTransactionId',
      'startDate',
      'endDate',
      'status',
    ];
    expect(respone.status.code).equal(200);
    expect(respone).to.have.property('data');
    expect(respone.data).to.have.keys(responseProperties);
    expect(respone.data.status).equal('BOOKED');
    carTestIds.push(respone.data.id);
  });

  it('Should filter Office Bookings based on user Id and date range', async () => {
    const query = `query{
      filterOfficeBookings (
              input: {
                userId: "${user.id}",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-03T19:30:00.000Z"
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
    }`;
    const result = await testServer.executeOperation({
      query: query,
    });
    const respone = result?.data.filterOfficeBookings;

    expect(respone.status.code).equal(200);
    expect(respone).to.have.property('data').that.is.an('array').to.have.length.of.at.least(1);
  });

  it('Should return empty result when the filter fails', async () => {
    const query = `query{
      filterOfficeBookings (
              input: {
                userId: "${user.id}",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-03T19:30:00.000Z",
                status: "DUMMY_STATUS"
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
    }`;
    const result = await testServer.executeOperation({
      query: query,
    });
    const respone = result?.data.filterOfficeBookings;
    expect(respone.status.code).equal(200);
    expect(respone).to.have.property('data').that.is.an('array').to.be.empty;
  });

  it('Should filter Car Bookings based on user Id and date range', async () => {
    const query = `query{
      filterCarBookings (
              input: {
                userId: "${user.id}",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-05T18:30:00.000Z"
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
      query: query,
    });
    const respone = result?.data.filterCarBookings;

    expect(respone.status.code).equal(200);
    expect(respone).to.have.property('data').that.is.an('array').to.have.length.of.at.least(1);
  });

  it('Should throw graphql error when trying to access properties that are not part of API contract', async () => {
    const query = `query{
      filterCarBookings (
              input: {
                userId: "${user.id}",
                startDate: "2000-10-03T18:30:00.000Z",
                endDate: "2000-10-05T18:30:00.000Z"
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
                  randomId
                  paymentTransactionId
                  startDate
                  endDate
                  status
              }
          }
    }`;
    const result = await testServer.executeOperation({
      query: query,
    });

    const error = result.errors[0];

    expect(result).to.have.property('errors').that.is.an('array').to.have.length.of.at.least(1);
    expect(error)
      .to.have.property('message')
      .that.is.an('string')
      .to.equal('Cannot query field "randomId" on type "CarBooking".');
  });
  it('Should get car booking of a given user', async () => {
    const query = `query{
      getCarBookings (userId: "${user.id}") {
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
      query: query,
    });
    const respone = result?.data.getCarBookings;

    expect(respone.status.code).equal(200);
    expect(respone).to.have.property('data');
  });

  it('Should get office booking of a given user', async () => {
    const query = `query{
      getOfficeBookings (userId: "${user.id}") {
              status {
                  code
                  header
                  description
              }
              data {
                  id
                  officeId
                  paymentTransactionId
                  startDate
                  endDate
                  status
              }
          }
    }`;
    const result = await testServer.executeOperation({
      query: query,
    });
    const respone = result?.data.getOfficeBookings;

    expect(respone.status.code).equal(200);
    expect(respone).to.have.property('data');
  });

  it('Should throw error when user id is not passed', async () => {
    const query = `query{
      getOfficeBookings (userId: "") {
              status {
                  code
                  header
                  description
              }
              data {
                  id
                  officeId
                  paymentTransactionId
                  startDate
                  endDate
                  status
              }
          }
    }`;
    const result = await testServer.executeOperation({
      query: query,
    });
    const respone = result?.data.getOfficeBookings;

    expect(respone.status.code).equal(500);
  });

  it('Should get car booking of a given user', async () => {
    const query = `query{
      getCarBookings (userId: "") {
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
      query: query,
    });
    const respone = result?.data.getCarBookings;

    expect(respone.status.code).equal(500);
  });
});
