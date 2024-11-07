import fs from 'fs';
import path from 'path';

// Define the base directory where your 'src' folder is located
const basePath = path.join('C:', 'Users', 'user', 'Web dev', 'AlumniHub', 'client', 'src');

// Define the folder structure to be created inside the src folder
const projectStructure = {
  components: {
    common: [
      'Button',
      'Input',
      'Modal',
      'Pagination',
      'Spinner'
    ],
    HeroSection: [],
    AlumniCard: [],
    Navbar: [],
    Footer: [],
    FeatureCard: [],
    JobFilter: [],
    EventFilter: [],
    NotificationList: [],
    DonationButton: [],
    TopAlumniCarousel: []
  },
  redux: {
    actions: [
      'alumniActions.js',
      'jobActions.js',
      'eventActions.js',
      'donationActions.js',
      'notificationActions.js',
      'userActions.js'
    ],
    reducers: [
      'alumniReducer.js',
      'jobReducer.js',
      'eventReducer.js',
      'donationReducer.js',
      'notificationReducer.js',
      'userReducer.js',
      'index.js'
    ],
    types: [
      'alumniTypes.js',
      'jobTypes.js',
      'eventTypes.js',
      'donationTypes.js',
      'notificationTypes.js',
      'userTypes.js'
    ],
    store: 'store.js'
  },
  utils: {
    api: 'api.js',
    helpers: 'helpers.js'
  },
  pages: {
    common: [
      'LoginPage',
      'RegisterPage',
      'AboutUsPage'
    ],
    LandingPage: [],
    NavbarDashboard: [],
    AlumniPage: [],
    DonationPage: [],
    NotificationPage: [],
    JobsPage: [],
    EventPage: [],
    TopAlumniCarousel: []
  }
};

// Function to create the directory structure
function createStructure(basePath, structure) {
  for (let folder in structure) {
    const folderPath = path.join(basePath, folder);

    try {
      // Create the folder if it does not exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Created folder: ${folderPath}`);
      }

      // Check if the structure is an array (files)
      if (Array.isArray(structure[folder])) {
        structure[folder].forEach(file => {
          const filePath = path.join(folderPath, `${file}.js`);
          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '', 'utf8');
            console.log(`Created file: ${filePath}`);
          }
        });
      } else {
        // Recursively create the subfolders and files
        createStructure(folderPath, structure[folder]);
      }
    } catch (error) {
      console.error(`Error creating folder or file: ${folderPath}`, error);
    }
  }
}

// Create the project structure inside the src folder
createStructure(basePath, projectStructure);
