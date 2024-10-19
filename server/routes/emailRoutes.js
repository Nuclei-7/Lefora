const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const path = require("path");

// Route to send email using shell script
router.post("/send-email", (req, res) => {
  const { userEmail, userName } = req.body;
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!userEmail || !userName || !apiKey) {
    return res.status(400).send("Email is required.");
  }

  const scriptPath = path.resolve(__dirname, "sendEmail.sh"); // Full path to the shell script

  // Construct the command to run the shell script with just the email
  const command = `"C:/Program Files/Git/bin/bash.exe" "${scriptPath}" "${userEmail}" "${userName}" ${apiKey}`;

  console.log("Executing command:", command); // For debugging purposes

  // Execute the shell script
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).send("Error executing script");
    }

    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return res.status(500).send("Error in script execution");
    }

    console.log(`Email sent: ${stdout}`);
    res.send("Email sent successfully!");
  });
});

module.exports = router;
