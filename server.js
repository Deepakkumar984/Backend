const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., Gmail, Yahoo, etc.
  auth: {
    user: 'noumanjj2018@gmail.com',
    pass: 'evqnbjcsnqccfmwb',
  },
});

// Email sending endpoint
app.post('/send-email', (req, res) => {
  const { name,lastname, number, email, message } = req.body;

  const mailOptions = {
    from: 'noumanjj2018@gmail.com',
    to: 'connect@synergyintegratedsolutions.pk', // Change this to your desired recipient
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name} ${lastname} Mobile NO: ${number}  Email: (${email}) says: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});

const PORT = 3001; // Choose any available port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
