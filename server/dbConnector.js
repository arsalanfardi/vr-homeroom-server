import { AWS } from "aws-sdk";

AWS.config.update({ region: "us-east-1" }); // Region of artana servers

/** DynamoDB object */
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

export const writeToDb = function (item) {
  var params = {
    TableName: "ARTANA_USERS",
    Item: item,
  };

  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};
