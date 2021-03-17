var AWS = require("aws-sdk");
var moment = require("moment");

AWS.config.update({ region: "us-east-1" }); // Region of artana servers

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

var params = {
  TableName: "ARTANA_USERS",
  Item: {
    SOCKET_ID: { S: "001" },
    JOIN_TIME_MST: { S: moment().utcOffset("−07:00").format("YYYY-MM-DD HH:mm") },
  },
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
