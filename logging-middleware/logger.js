require("dotenv").config();
const axios = require("axios");

async function Log(stack, level, packageName, message) {
  try {
    console.log("Token Loaded:", process.env.ACCESS_TOKEN?.substring(0, 20));
    const response = await axios.post(
      "https://4.224.186.213/evaluation-service/logs",
      {
        stack: stack,
        level: level,
        package: packageName,
        message: message,
      },
      {
        headers: {
          authorization: `Bearer $ {process.env.ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

module.exports = Log;
