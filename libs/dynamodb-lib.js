import AWS from 'aws-sdk';

export const call = (action, params) => {
  const dynamoDb = new AWS.dynamoDb.DocumentClient();

  return dynamoDb[action](params).promise();
};