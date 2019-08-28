import uuid from 'uuid';
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
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
  dynamoDb.put(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Unhappy path
    if (error) {
      const response = {
        statusCode: 500,
        headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Happy path
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}
