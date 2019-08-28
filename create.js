import uuid from 'uuid';
import * as dbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';



export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "notes",
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  };

  try {
    const result = await dbLib.call("get", params);
    if (result.Item) return success(params.Item);
    else return failure({ status: false, error: "Item not found" });
  } catch (e) {
    return failure({ status: false });
  }
}
