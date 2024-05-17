document.addEventListener('DOMContentLoaded', function() {
    // Menu icon toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    // Smooth scrolling for navbar links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(otherLink => otherLink.classList.remove('active'));
            link.classList.add('active');
            const target = document.getElementById(link.dataset.target);
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll to contact section when btn-1 is clicked
    const hireBtn = document.querySelector('.btn-1');

    hireBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll to experience section when btn-2 is clicked
    const experienceBtn = document.querySelector('.btn-2');

    experienceBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const experienceSection = document.getElementById('experience-education');
        experienceSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Download CV functionality
    const downloadCVBtn = document.getElementById('downloadCV');

    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default action of the link

            // Replace with the path to your actual CV file
            const cvFilePath = '/Files/RyuCV.pdf';

            // Use fetch API to fetch the file
            fetch(cvFilePath)
                .then(response => response.blob())
                .then(blob => {
                    // Create a new blob object
                    const blobUrl = window.URL.createObjectURL(blob);

                    // Create a temporary anchor element
                    const tempLink = document.createElement('a');
                    tempLink.style.display = 'none';
                    tempLink.href = blobUrl;
                    tempLink.setAttribute('download', 'RyuCV.pdf');

                    // Append the anchor element to the body
                    document.body.appendChild(tempLink);

                    // Simulate a click on the anchor element to trigger the download
                    tempLink.click();

                    // Remove the temporary anchor element
                    document.body.removeChild(tempLink);
                })
                .catch(error => console.error('Error fetching CV:', error));
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Menu icon toggle and other scripts
    
    // WhatsApp link
    const whatsappLink = document.querySelector('.bx.bxl-whatsapp').parentNode;
    
    whatsappLink.addEventListener('click', function(event) {
        // Prevent the default action of the link
        event.preventDefault();

        // Replace with your WhatsApp API link
        const whatsappAPI = 'https://api.whatsapp.com/send?phone=+6283894417070';
        
        // Open WhatsApp link in a new tab
        window.open(whatsappAPI, '_blank');
    });
});

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Contact form route
app.post('/send', (req, res) => {
    const { fullName, email, phoneNumber, subject, message } = req.body;

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-password' // Replace with your password
        }
    });

    // Email options
    let mailOptions = {
        from: 'ryuandrew15@gmail.com', // Replace with your email
        to: 'ryuandrew15@gmail.com', // Replace with your email
        subject: `New Message: ${subject}`,
        text: `
            Name: ${fullName}
            Email: ${email}
            Phone Number: ${phoneNumber}
            Message: ${message}
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });

    res.redirect('/'); // Redirect to home page or thank you page
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});