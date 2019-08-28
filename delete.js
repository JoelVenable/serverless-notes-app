import * as dbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
import { DynamoDB } from 'aws-sdk';

export async function main(event, context) {
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    await dbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}