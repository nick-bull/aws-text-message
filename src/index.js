import {toError} from '@nick-bull/to';
import {createSnsService} from './createSnsService';

const snsService = createSnsService();
const {
  publish,
  setSMSAttributes,
} = snsService;

export const sendTextMessage = async (phoneNumber, textMessage) => {
  const smsOptions = {
    attributes: {DefaultSMSType: 'Transactional'},
  };
  const smsOptionsError = await toError(setSMSAttributes(smsOptions));
  if (smsOptionsError) {
    throw new Error(`sendTextMessage: ${smsOptionsError}`);
  }

  const publishOptions = {
    Message: textMessage,
    PhoneNumber: phoneNumber,
  };
  const publishError = await toError(publish(publishOptions));
  if (publishError) {
    throw new Error(`sendTextMessage: ${publishError}`);
  }
};
