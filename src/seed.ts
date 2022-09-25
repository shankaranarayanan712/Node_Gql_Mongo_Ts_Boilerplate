const Cars = require('./models/car');
const Office = require('./models/office');
const User = require('./models/user');
const { UserService } = require('./services/user.service');
const cars = [
  {
    name: 'Mercedes-Benz',
    model: 'A-Class',
    number: 'X12-543',
  },
  {
    name: 'Audi',
    model: 'A3',
    number: 'A3-124',
  },
  {
    name: 'Audi',
    model: 'A4',
    number: 'A4-124-X',
  },
  {
    name: 'Audi',
    model: 'A5',
    number: 'A5-124-Y',
  },
  {
    name: 'Hyundai',
    model: 'Accent',
    number: 'Accent-124',
  },
  {
    name: 'Honda',
    model: 'Accord',
    number: 'Accord-223-X',
  },
  {
    name: 'Nissan',
    model: 'Altima',
    number: 'Altima-124-XYZ',
  },
  {
    name: 'Volkswagen',
    model: 'Arteon',
    number: 'Ar-124-ZXE',
  },
];

const offices = [
  {
    name: 'IT-Platz',
    address: 'No 25 Commercial Street',
    city: 'Berlin',
    zip: '12345',
    email: 'office1@email.com',
    phone: '1234567890',
  },
  {
    name: 'Media Mart',
    address: '123 Airport road',
    city: 'Hamburg',
    zip: '12121',
    email: 'Media@email.com',
    phone: '0987648290',
  },
  {
    name: 'Corporate Finance Corp',
    address: '654 Town Street',
    city: 'Berlin',
    zip: '12323',
    email: 'Finance23@email.com',
    phone: '0293847563',
  },
  {
    name: 'Revenue office',
    address: '003 Wall Street',
    city: 'Frankfrut',
    zip: '11232',
    email: 'Revenue@email.com',
    phone: '2094857624',
  },
  {
    name: 'Palace grounds',
    address: 'No 2 Palace Highway Street',
    city: 'Berlin',
    zip: '53643',
    email: 'Palace12@email.com',
    phone: '463728930',
  },
  {
    name: 'Dlf office',
    address: '11 Dlf road',
    city: 'Berlin',
    zip: '12322',
    email: 'Dlf@email.com',
    phone: '0192837465',
  },
];

const adminUser = {
  email: 'Admin@mail.com',
  name: 'Admin',
  password: 'admin',
  phone: '123456789',
};

export const seedData = async (shouldCleanupExistingData = true) => {
  try {
    const userService = new UserService();
    if (shouldCleanupExistingData) {
      await User.deleteMany({});
    }
    const [existingCars, existingOffices] = await Promise.all([Cars.find({}), Office.find({})]);
    await userService.create(adminUser);
    if (existingCars?.length === 0) {
      for (let i = 0; i < cars.length; i++) {
        const car = new Cars(cars[i]);
        car.save();
      }
    }
    if (existingOffices?.length === 0) {
      for (let i = 0; i < offices.length; i++) {
        const office = new Office(offices[i]);
        office.save();
      }
    }
  } catch (err) {
    console.error(err);
  }

  console.log('Mock data is seeded from seed script.');
};
