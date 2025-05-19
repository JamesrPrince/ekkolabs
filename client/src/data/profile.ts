import profilePic from "@/assets/images/profilepic.jpg";

export const profile = {
  name: "Prince Chisenga",
  title: "Data Analyst & Business Consultant",
  photo: profilePic,
  bio: [
    "I'm a data professional with extensive experience in analytics, business intelligence, and project management. Based in Lusaka, Zambia, I've worked across various sectors including telecommunications, technology consulting, and financial services.",
    "My approach combines technical expertise with business acumen to deliver solutions that drive actionable insights and measurable results. I specialize in translating complex data into clear strategic recommendations.",
    "When I'm not analyzing data, I contribute to open-source projects and mentor emerging data professionals in my community.",
  ],
  skills: [
    "Python & R",
    "SQL & Database Design",
    "Power BI & Tableau",
    "Machine Learning",
    "Excel & Advanced Analytics",
    "Project Management",
  ],
  intro:
    "I help organizations make data-driven decisions through comprehensive analytics and strategic planning. Specialized in business intelligence, project management, and digital transformation.",
};

export const experience = [
  {
    title: "Commercials and Data Manager",
    company: "Top Image Africa Limited",
    location: "Lusaka, Lusaka Province, Zambia",
    type: "On-site",
    period: "Apr 2021 - Present",
    duration: "4 yrs 2 mos",
    responsibilities: [
      "Drive data-driven decisions as a business analyst, identifying growth opportunities and market trends.",
      "Optimize operations, streamline processes, and ensure efficiency as an operations specialist.",
    ],
    skills: ["Commercials", "Data Analytics"],
    icon: "briefcase",
  },
  {
    title: "Technology Consultant",
    company: "Ekko Labs",
    location: "Lusaka, Lusaka Province, Zambia",
    type: "Hybrid",
    period: "Jan 2021 - Present",
    duration: "4 yrs 5 mos",
    responsibilities: [
      "Strategic technology consultant specializing in digital transformation and business process optimization.",
      "Partner with cross-functional stakeholders to analyze technical challenges, design innovative solutions.",
    ],
    skills: ["Project Management", "Business Analysis"],
    icon: "laptop-code",
  },
  {
    title: "Information Technology Manager",
    company: "Mobicom Africa Ltd",
    location: "Lusaka, Lusaka Province, Zambia",
    type: "On-site",
    period: "Dec 2019 - Jan 2021",
    duration: "1 yr 2 mos",
    responsibilities: [
      "Led a team of 6: four data analysts, one designer, and one IT intern.",
      "Managed IT tasks including app implementation, hardware & software deployment.",
    ],
    skills: ["IT Management", "Infrastructure"],
    icon: "network-wired",
  },
  {
    title: "Senior Data Analyst",
    company: "Mobicom Africa Ltd",
    location: "Lusaka, Lusaka Province, Zambia",
    type: "On-site",
    period: "Jan 2018 - Dec 2019",
    duration: "2 yrs",
    responsibilities: [
      "Managed a team of data analysts, ensuring high-quality data analysis.",
      "Built and maintained the company website using WordPress.",
    ],
    skills: ["Data Analysis", "SQL"],
    icon: "database",
  },
  {
    title: "Customer Service Teller",
    company: "MTN Zambia",
    location: "Lusaka, Lusaka Province, Zambia",
    type: "Contract",
    period: "Dec 2017 - May 2018",
    duration: "6 mos",
    responsibilities: [
      "Attended to day-to-day financial transactions that MTN customers need to take care of.",
      "Handled deposit and withdrawal requests for customers.",
    ],
    skills: ["Customer Service", "Banking Services"],
    icon: "briefcase",
  },
];

export const projects = [
  {
    title: "Retail Analytics Dashboard",
    category: "Business Intelligence",
    description:
      "A comprehensive dashboard providing real-time insights for a major retail chain, featuring sales analysis, inventory tracking, and customer behavior patterns.",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["Power BI", "Python", "SQL"],
    featured: true,
    links: {
      live: "https://example.com/retail-dashboard",
      github: "https://github.com/prince-chisenga/retail-analytics",
    },
  },
  {
    title: "Financial Forecasting System",
    category: "Machine Learning",
    description:
      "Developed predictive models to forecast financial trends for investment firms, utilizing machine learning algorithms and time-series analysis.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["Python", "TensorFlow", "Pandas"],
    featured: false,
    links: {
      live: "https://example.com/financial-forecast",
      github: "https://github.com/prince-chisenga/financial-forecast",
    },
  },
  {
    title: "Supply Chain Optimization",
    category: "Business Intelligence",
    description:
      "Implemented an end-to-end supply chain optimization solution that reduced logistics costs by 23% and improved delivery times for a manufacturing client.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["R", "Tableau", "PostgreSQL"],
    featured: false,
    links: {
      live: "https://example.com/supply-chain",
      github: null,
    },
  },
  {
    title: "Customer Segmentation Analysis",
    category: "Data Analysis",
    description:
      "Created a detailed customer segmentation model for a telecommunications company, enabling targeted marketing campaigns and improved customer retention strategies.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["Python", "scikit-learn", "Matplotlib"],
    featured: false,
    links: {
      live: "https://example.com/customer-segmentation",
      github: "https://github.com/prince-chisenga/customer-segmentation",
    },
  },
  {
    title: "Market Research Portal",
    category: "Web Development",
    description:
      "Designed and developed an interactive market research platform allowing clients to visualize industry trends and competitor analysis in real-time.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["React", "Node.js", "D3.js"],
    featured: false,
    links: {
      live: "https://example.com/market-research",
      github: "https://github.com/prince-chisenga/market-research",
    },
  },
  {
    title: "Healthcare Analytics System",
    category: "Machine Learning",
    description:
      "Built a predictive analytics system for healthcare providers to forecast patient admission rates and optimize staffing levels, improving resource allocation by 18%.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    technologies: ["Python", "Keras", "Flask"],
    featured: false,
    links: {
      live: "https://example.com/healthcare-analytics",
      github: null,
    },
  },
];
