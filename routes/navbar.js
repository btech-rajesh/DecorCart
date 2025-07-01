// routes/contactRoutes.js
const express = require('express');
const router = express.Router();

router.get('/contact', (req, res) => {
  res.render('navbar/contact', { currentUser: req.session.user }); // Adjust the path based on your folder structure
});
// Handle service scheduling
router.post('/contact', (req, res) => {
    const { serviceType } = req.body;
  
    // Add service scheduling logic here (e.g., store in the database)
    // For example, you could store it in a database or in session
    // Assuming you store it in the session (replace with database logic as needed):
    
    req.session.scheduledService = {
      serviceType,
     
    };
  
    // Respond to the user after service is scheduled
    res.send('Your request has been sent succesfully!');
  });

router.post('/contact', (req, res) => {
    // Handle form submission
    // console.log(req.body); 
    res.send('Form submitted successfully!');
  });
  

  router.get('/about',(req,res)=>{
    res.render('navbar/about', { currentUser: req.session.user });
  });

  router.get('/schedule', (req, res) => {
    res.render('navbar/schedule', { currentUser: req.session.user }); // Render the service scheduling page
  });
  // Handle service scheduling
router.post('/schedule', (req, res) => {
    const { serviceType, serviceDate, serviceTime } = req.body;
  
    // Add service scheduling logic here (e.g., store in the database)
    // For example, you could store it in a database or in session
    // Assuming you store it in the session (replace with database logic as needed):
    
    req.session.scheduledService = {
      serviceType,
      serviceDate,
      serviceTime,
    };
  
    // Respond to the user after service is scheduled
    res.send('Your service has been scheduled successfully!');
  });

module.exports = router;
