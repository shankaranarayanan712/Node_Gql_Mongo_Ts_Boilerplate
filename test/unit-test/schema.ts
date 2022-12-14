const { gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type Query {
    getUsers: getUsersData
  }

  type Query {
    getUserById(id: String!): getUserByIdData
  }

  type Query {
    token(email: String!): String!
  }

  type Query {
    listCars: carData
  }

  type Query {
    listOffice: officeData
  }

  type Query {
    getOfficeBookings(userId: String): officeBookingsResponse
  }

  type Query {
    getCarBookings(userId: String): carBookingsResponse
  }

  type Query {
    filterCarBookings(input: FilterCarBookingInput!): carBookingsResponse
  }

  type Query {
    filterOfficeBookings(input: FilterOfficeBookingInput!): officeBookingsResponse
  }

  type Mutation {
    addUser(input: UserInput!): userData
  }

  type Mutation {
    updateUser(id: String, input: UserInput!): userData
  }

  type Mutation {
    login(input: LoginInput!): login
  }

  type Mutation {
    createCarBooking(input: CreateCarBookingInput!): carBookingResponse
  }

  type Mutation {
    createOfficeBooking(input: CreateOfficeBookingInput!): officeBookingResponse
  }

  type getUsersData {
    status: Status
    data: [User]
  }

  type getUserByIdData {
    status: Status
    data: User
  }

  input UserInput {
    email: String
    name: String
    password: String
    phone: String
  }

  input LoginInput {
    email: String
    password: String
  }

  input FilterCarBookingInput {
    userId: String
    carId: String
    status: String
    startDate: String
    endDate: String
  }

  input FilterOfficeBookingInput {
    userId: String
    officeId: String
    status: String
    startDate: String
    endDate: String
  }

  input CreateCarBookingInput {
    userId: String!
    carId: String!
    paymentTransactionId: String!
    startDate: Date!
    endDate: Date!
  }

  input CreateOfficeBookingInput {
    userId: String!
    officeId: String!
    paymentTransactionId: String!
    startDate: Date!
    endDate: Date!
  }

  type userData {
    status: Status
    data: User
  }

  type login {
    status: Status
    data: UserWithToken
  }

  type UserWithToken {
    token: String
    email: String
  }

  type carData {
    status: Status
    data: [Car]
  }

  type officeData {
    status: Status
    data: [Office]
  }

  type officeBookingData {
    status: Status
    data: [OfficeBooking]
  }

  type User {
    id: String
    email: String
    name: String
    phone: String
    carBookings: [CarBooking]
  }

  type Car {
    id: String
    name: String
    model: String
    number: String
  }

  type Office {
    id: String
    name: String
    address: String
    city: String
    email: String
    zip: String
    phone: String
  }

  type carBookingResponse {
    status: Status
    data: CarBooking
  }

  type carBookingsResponse {
    status: Status
    data: [CarBooking]
  }

  type officeBookingResponse {
    status: Status
    data: OfficeBooking
  }

  type officeBookingsResponse {
    status: Status
    data: [OfficeBooking]
  }

  type CarBooking {
    id: String
    userId: String!
    carId: String!
    paymentTransactionId: String!
    startDate: Date!
    endDate: Date!
    status: String
  }

  type OfficeBooking {
    id: String
    userId: String!
    officeId: String!
    paymentTransactionId: String!
    startDate: Date!
    endDate: Date!
    status: String
  }

  type Status {
    code: Int
    header: String
    description: String
  }
`;
export = typeDefs
