import AWS from 'aws-sdk';

const {config, SNS} = AWS;

config.update({region: 'eu-west-2'});

const getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(
  (item) => typeof obj[item] === 'function',
);

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
