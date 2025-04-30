require('dotenv').config(); 
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({
  region: process.env.AWS_REGION, 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
  }
});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const newUser = {
  TableName: "student_production_db",
  Item: {
    userId: "user123",
    email: "arun.com",
    firstName: "Arun",
    lastName: "Kumar",
    category: "Technology",
    emailVerified: false,
    password: "Saicharan@0624!",
    profileUrl: "",
    registerType: "Student",
    skills: "",
    gender: "male",
    goal: "Learn backend",
    courseCompleted: [],
    coursesInProgress: 0,
    hoursSpentThisWeek: 0, 
  },
};
async function insertUser() {
  try {
    await ddbDocClient.send(new PutCommand(newUser));
    console.log(" User inserted successfully.");
  } catch (err) {
    console.error(" Error inserting user:", err);
  }
}
insertUser();
