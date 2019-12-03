const validator = require('./validation');
const factoryRepo = require('./factory-repo');
const generateRandomNumbers = (count, min, max) => Array(count).
    fill(true).
    map(() => Math.floor(Math.random() * (max - min + 1) + min));

exports.addFactory = async (factory) => {
  try {
    validator.validateFactory(factory);
    factory.nodes = generateRandomNumbers(factory.nodeCount, factory.min,
        factory.max);
    factory.lastUpdated = new Date();
    factory.createdDate = new Date();
    await factoryRepo.addFactory(factory);
  } catch (e) {
    throw e;
  }
};

exports.deleteFactory = async (id) => {
  try {
    validator.validateId(id);
    await factoryRepo.deleteFactoryById(id);
  } catch (e) {
    throw e;
  }
};

exports.updateFactory = async (factory) => {
  try {
    validator.validateId(factory.id);
    validator.validateFactory(factory);
    factory.nodes = generateRandomNumbers(factory.nodeCount, factory.min,
        factory.max);
    factory.lastUpdated = new Date();
    await factoryRepo.updateFactory(factory);
  } catch (e) {
    throw e;
  }
};