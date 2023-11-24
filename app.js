const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { json } = require('body-parser');
const connectToMongoDB = require('./db');
const { create } = require('./modals/User');


const app = express();
connectToMongoDB()

app.use(cors())

// Connect to your database (e.g., MongoDB)
// Middleware to parse JSON data
app.use(json());


// Start the server
const port =  5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Route for handling user registration
// app.post('/signup', async (req, res) => {
//     try {
//       // Retrieve user data from the request body
//       const { email, password } = req.body;
  
//       // Check if the email already exists in the database
//       const existingUser = await User.findOne({ email });
  
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email already in use' });
//       }
  
//       // Create a new user
//       const newUser = new User({ email: 'example@example.com', password: 'password123' });
//       newUser.save((err, user) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('User created:', user);
//         }
//       });
//       //update user
//       User.updateOne({ email: 'example@example.com' }, { password: 'newpassword123' }, (err, result) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('Updated user:', result);
//         }
//       });
//       //delete
//       User.deleteOne({ email: 'example@example.com' }, (err) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('User deleted');
//         }
//       });
      
//       User.findByIdAndDelete('1234567890', (err, user) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('Deleted user:', user);
//         }
//       });
      
      
//       User.findOneAndUpdate({ email: 'example@example.com' }, { password: 'newpassword123' }, (err, user) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('Updated user:', user);
//         }
//       });
      
  
//       // Save the user to the database
//       await newUser.save();
  
//       return res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Server error' });
//     }
//   });



app.post('/create-user', async(req, res) =>{
  const {email, password} = req.body
  try{
    await create({
      email: email,
      password: password
    })

    res.status(201).json({message: 'User created.'})
  }
  catch{
    res.status(500).json({message:'Server Error'})
  }
})

document.getElementById('login').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === true) {
        alert(data.message); // Display a success message
        window.location.href = 'index.html'; // Redirect to the desired page after successful login
      } else {
        alert(data.message); // Display an error message
      }
    } else {
      const data = await response.json();
      alert(data.message); // Display an error message
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.'); // Display a generic error message
  }
});
