import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Load FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faEnvelope, 
  faMoon, 
  faSun, 
  faBars, 
  faExternalLinkAlt, 
  faMapMarkerAlt, 
  faPhoneAlt, 
  faFileDownload,
  faChartPie,
  faChartLine,
  faCodeBranch,
  faProjectDiagram,
  faDesktop,
  faBrain,
  faCogs,
  faChalkboardTeacher,
  faBriefcase,
  faLaptopCode,
  faNetworkWired,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedinIn,
  faGithub,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

// Add icons to the library
library.add(
  faEnvelope, 
  faMoon, 
  faSun, 
  faBars, 
  faLinkedinIn, 
  faGithub, 
  faTwitter, 
  faExternalLinkAlt, 
  faMapMarkerAlt, 
  faPhoneAlt, 
  faFileDownload,
  faChartPie,
  faChartLine,
  faCodeBranch,
  faProjectDiagram,
  faDesktop,
  faBrain,
  faCogs,
  faChalkboardTeacher,
  faBriefcase,
  faLaptopCode,
  faNetworkWired,
  faDatabase
);

createRoot(document.getElementById("root")!).render(<App />);
