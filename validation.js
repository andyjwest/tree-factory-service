const ValidationError = require('./ValidationError');

exports.validateFactory =  factory => {
    let errors = [];
    if(!!!factory.name) errors.push('Name field require');
    if(!!!factory.min && factory.min !== 0) errors.push('Min field require');
    if(!!!factory.max && factory.max !== 0) errors.push('Max field require');
    if(!!!factory.nodeCount && factory.nodeCount !== 0) errors.push('Node Count field require');
    if(errors.length > 0) throw new ValidationError(errors);
};

exports.validateId = id => {
    let errors = [];
    if(!!!id) errors.push('ID field require');
    if(errors.length > 0) throw new ValidationError(errors);
};