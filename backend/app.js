const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
require("dotenv").config();
const {Resend} = require('resend');
const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
const jwt = require('jsonwebtoken');

const resend = new Resend(process.env.RESEND_KEY)

const app = express();
app.use(cors({
  origin:["https://dribbble-front.vercel.app"],
  methods:["POST"],
  credentials:true,
}));


app.use(express.json());


const connectionString = process.env.DATABASE_URL;


const pool = new Pool({
  connectionString: connectionString,
});


pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Database connected successfully");
    console.log("Current time:", res.rows[0].now); 
  }
});


app.post("/api/signup", async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const client = await pool.connect();
    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      res.json({ message: "exist" });
      client.release();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await client.query(
        "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4)",
        [name, username, email, hashedPassword]
      );
      if (result.rowCount === 1) {
        res.status(201).json({ message: "success" });
      } else {
        res.status(500).send("Error creating user");
      }
      client.release();
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Signup failed");
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await pool.connect();
    const user = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      res.json({ success: false, message: "User does not exist" });
      client.release();
    } else {
      const match = await bcrypt.compare(password, user.rows[0].password);
      if (match) {
        const { id, name, email } = user.rows[0];
        const profileData = await client.query(
          "SELECT image, location, role, email_validated FROM profiles WHERE email_id = $1",
          [email]
        );
        const { image, location, role, email_validated } =
          profileData.rows.length > 0 ? profileData.rows[0] : {};
        res.json({
          success: true,
          message: "Login successful",
          userId: id,
          name,
          email_validated,
          profilePic: image,
          userLocation: location,
          selectedRoles: role,
        });
      } else {
        res.json({ success: false, message: "Incorrect password" });
      }
      client.release();
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Login failed");
  }
});

app.post("/api/profiles", async (req, res) => {
  try {
    const { profilePic, location, email,role,isVerified } = req.body;
    console.log("request body:",req.body);


    const client = await pool.connect();

  
    const user = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    
    if (user.rows.length === 0) {
      client.release();
      return res.status(404).json({ message: "User not found" });
    }

    
    const result = await client.query(
      "INSERT INTO profiles (email_id, image, location, role, email_validated) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [email, profilePic ? profilePic : null, location,role,isVerified]
    );
    const profileId = result.rows[0].id;

    
    client.release();

    
    res.status(201).json({ message: "Profile created successfully", profileId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to submit profile" });
  }
});

app.post("/api/verify-email", async (req, res) => {
  const { email } = req.body;

  try {
    const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

    const { data, error } = await resend.emails.send({
      from: 'dribbble@vinayaknayar.in',
      to: [email],
      subject: 'Email Verification',
      html: `
        <p>Please click the following link to verify your email address:</p>
        <a href="http://localhost:3000/verify-email?token=${token}">Verify Email</a>
      `,
    });

    if (error) {
      console.error("Error sending verification email:", error);
      return res.status(500).json({ message: "Failed to send verification email" });
    }

    console.log("Verification email sent:", data);
    res.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Failed to verify email" });
  }
});



app.post('/api/verify-token', async (req, res) => {
  const { token } = req.body;

  try {
    
    const decoded = jwt.verify(token,secret);
    const { email } = decoded;

    const client = await pool.connect();
    await client.query('UPDATE profiles SET email_validated = true WHERE email_id = $1', [email]);
    client.release();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ message: 'Failed to verify email' });
  }
});




app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});