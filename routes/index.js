var express = require('express');
var router = express.Router();

// Shared site metadata used across all pages.
var site = {
  brand: 'Jackie Shu',
  tagline: 'Software Technology Student',
  studentName: 'Shu Haoyang (Jackie)',
  studentId: '2024110172'
};

// Projects highlighted on the Projects page.
var projects = [
  {
    slug: 'campus-web-design',
    image: '/images/project-campus.svg',
    title: 'Campus Web Design',
    category: 'Web Development',
    role: 'Designer & Developer',
    description:
      'Designed and built a campus-themed promotional website for Suzhou Centennial College. Focused on clean layout, responsive design, and accessible navigation. The project earned second prize in the campus web design competition.',
    outcome: '2nd Prize — Campus Web Design Competition'
  },
  {
    slug: 'portfolio-site',
    image: '/images/project-portfolio.svg',
    title: 'Personal Portfolio Website',
    category: 'Full-Stack Web',
    role: 'Full-Stack Developer',
    description:
      'Built this personal portfolio site from scratch using Node.js, ExpressJS, and the EJS templating engine. Implemented routing, reusable view partials, and a contact form that captures submissions and redirects back to the home page.',
    outcome: 'Deployed as COMP229 Assignment 1'
  },
  {
    slug: 'semiconductor-sales',
    image: '/images/project-sales.svg',
    title: 'Semiconductor Equipment B2B Sales',
    category: 'Technical Sales',
    role: 'Sales Support',
    description:
      'Shadowed a senior technical sales lead visiting Russian and Taiwanese clients. Learned equipment introduction, requirement discovery, and quotation negotiation while observing real business etiquette in the semiconductor industry.',
    outcome: 'Hands-on exposure to B2B technical sales'
  }
];

// Services offered on the Services page.
var services = [
  {
    icon: 'bi-code-slash',
    title: 'Web Development',
    description: 'Responsive websites and web applications using HTML, CSS, JavaScript, Node.js and Express.'
  },
  {
    icon: 'bi-database',
    title: 'Database & SQL',
    description: 'Data modeling and SQL queries for relational databases, with a solid foundation in Linux environments.'
  },
  {
    icon: 'bi-headset',
    title: 'Technical Support',
    description: 'Clear, patient troubleshooting and technical explanation for users of all skill levels.'
  },
  {
    icon: 'bi-translate',
    title: 'Bilingual Communication',
    description: 'English (CET-4) and Chinese communication for cross-cultural collaboration and support.'
  },
  {
    icon: 'bi-graph-up',
    title: 'Technical Sales & FAE',
    description: 'Bridging technical understanding with customer needs for pre-sales, FAE and support roles.'
  },
  {
    icon: 'bi-cpu',
    title: 'Programming',
    description: 'Foundational skills in C, C# and Java, ready to build and maintain small applications.'
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    active: 'home',
    site: site,
    showThanks: req.query.sent === '1'
  });
});

/* GET about me page. */
router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About Me',
    active: 'about',
    site: site
  });
});

/* GET projects page. */
router.get('/projects', function (req, res, next) {
  res.render('projects', {
    title: 'Projects',
    active: 'projects',
    site: site,
    projects: projects
  });
});

/* GET services page. */
router.get('/services', function (req, res, next) {
  res.render('services', {
    title: 'Services',
    active: 'services',
    site: site,
    services: services
  });
});

/* GET contact page. */
router.get('/contact', function (req, res, next) {
  res.render('contact', {
    title: 'Contact Me',
    active: 'contact',
    site: site
  });
});

/* POST contact form — capture the message, then redirect back to Home. */
router.post('/contact', function (req, res, next) {
  var submission = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contactNumber: req.body.contactNumber,
    email: req.body.email,
    message: req.body.message,
    receivedAt: new Date().toISOString()
  };

  // For this assignment the form is not wired to a backend service,
  // so we capture the data in the server log.
  console.log('[Contact] New message received:');
  console.log(JSON.stringify(submission, null, 2));

  res.redirect('/?sent=1');
});

module.exports = router;
