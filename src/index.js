import AWS from 'aws-sdk';
const {config, SNS} = AWS;

config.update({region: 'eu-west-2'});

const getMethods = (obj) => {
  const methods = [];

  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      methods.push(key);
    }
  }

  return methods;
};

export const createSnsService = () => {
  const service = new SNS({apiVersion: '2010-03-31'});
  const serviceMethodNames = getMethods(service);

  return serviceMethodNames.reduce(
    (acc, name) => {
      acc[name] = async (...args) => {
        const serviceCall = service[name](...args);

        return (typeof serviceCall.promise === 'function')
          ? serviceCall.promise()
          : serviceCall;
      };
      return acc;
    },
    {},
  );
};

