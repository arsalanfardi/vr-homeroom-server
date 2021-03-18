import AWS from "aws-sdk";
import dotenv from "dotenv";
import moment from "moment";

// Load env file
dotenv.config();

var awsConfig = {
  region: "us-east-1", // Region of artana servers
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
};
AWS.config.update(awsConfig);

/** DynamoDB object */
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
/** DynamoDB table name */
const TABLENAME = "ARTANA_USERS";

/**
 * Write a dictionary item to DynamoDB.
 *
 * Ensure the item specifies value type (S, N, etc.).
 * @param {*} item
 */
export const writeToDb = function (item) {
  const params = {
    TableName: TABLENAME,
    Item: item,
  };

  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function (err) {
    if (err) {
      console.log("Error", err);
    }
  });
};

/**
 * End a user session by calculating the duration of the session and updating DynamoDB with the value.
 * @param {*} socketId
 */
export const endSession = function (socketId) {
  const params = {
    TableName: TABLENAME,
    Key: {
      SOCKET_ID: { S: socketId },
    },
    ProjectionExpression: "JOIN_TIME_MST",
  };

  ddb.getItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      const joinTime = moment(data.Item["JOIN_TIME_MST"]["S"]);
      const disconnTime = moment().utcOffset("−07:00");
      const duration = disconnTime.diff(joinTime, "minutes", true).toFixed(2);

      const update_params = {
        TableName: TABLENAME,
        Key: {
          SOCKET_ID: { S: socketId },
        },
        UpdateExpression: "set DISCONNECT_TIME_MST=:x, SESSION_DURATION_MIN=:y",
        ExpressionAttributeValues: {
          ":x": { S: disconnTime.format() },
          ":y": { N: duration },
        },
      };

      ddb.updateItem(update_params, function (err) {
        if (err) console.log(err);
      });
    }
  });
};
