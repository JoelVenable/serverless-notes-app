import uuid from 'uuid';
import * as dbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';


const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  try {
    await dbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
