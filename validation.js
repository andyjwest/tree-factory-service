exports.validateFactory = factory => {
    let errors = [];
    if(!!factory.name) errors.push('Name field require');
    if(!!factory.min) errors.push('Min field require');
    if(!!factory.max) errors.push('Max field require');
    if(!!factory.nodeCount) errors.push('Node Count field require');
    return errors;
};
