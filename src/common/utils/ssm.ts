import * as AWS from 'aws-sdk';
import { SsmSap } from 'aws-sdk';
const SSM = new AWS.SSM({ region: 'ap-northeast-2' });

export const loadParameter = async (parameterName: string) => {
  try {
    const { Parameter } = await SSM.getParameter({
      Name: parameterName,
      WithDecryption: false,
    }).promise();
    return JSON.parse(Parameter?.Value) ?? null;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
