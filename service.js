const validator = require('./validation');
const factoryRepo = require('./factory-repo');

exports.addFactory = async (factory) => {
  try {
    validator.validateFactory(factory);
    factory.nodes = generateRandomNumbers(factory.count, factory.min,
        factory.max);
    await factoryRepo.addFactory(factory);
  } catch (e) {
    throw e;
  }
};

function generateRandomNumbers(count, min, max) {
  return Array(count).
      fill(true).
      map(() => Math.floor((Math.random() * max) + min));
}

exports.deleteFactory = (id) =>{
  try{
    validator.validateId(id);
    factoryRepo.deleteFactoryById(id)
  }catch (e) {
    throw e;
  }
};

exports.updateFactory = async (factory) => {
  try {
    validator.validateId(factory.id);
    validator.validateFactory(factory);
    factory.nodes = generateRandomNumbers(factory.count, factory.min,
        factory.max);
    await factoryRepo.updateFactory(factory);
  } catch (e) {
    throw e;
  }
};