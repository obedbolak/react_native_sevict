export const programData = [
  {
    id: "computer",
    title: "Computer Engineering",
    icon: "💻",
    color: "bg-blue-500",
    description: "Advanced technology and software development programs",
    programs: [
      {
        name: "Software Engineering",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],

        description:
          "Design and develop software applications and systems with modern methodologies like Agile and DevOps",
        careerPaths: [
          "Software Developer",
          "Systems Architect",
          "DevOps Engineer",
          "QA Specialist",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-se-101",
            title: "Data Structures & Algorithms",
            category: "computer",
            instructor: "Dr. John Smith",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 245,
            image:
              "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
            description:
              "Learn fundamental data structures and algorithms essential for software development",
            field: "Computer Engineering",
          },
          {
            id: "comp-se-102",
            title: "Software Design Patterns",
            category: "computer",
            instructor: "Prof. Alice Johnson",
            duration: "10 Weeks",
            level: "Advanced",
            rating: 4.6,
            students: 187,
            image:
              "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            description:
              "Master common software design patterns to create maintainable and scalable applications",
            field: "Computer Engineering",
          },
          {
            id: "comp-se-103",
            title: "Cloud Computing",
            category: "computer",
            instructor: "Dr. Robert Chen",
            duration: "14 Weeks",
            level: "Intermediate",
            rating: 4.7,
            students: 210,
            image:
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
            description:
              "Introduction to cloud platforms and distributed computing architectures",
            field: "Computer Engineering",
          },
          {
            id: "comp-se-104",
            title: "Mobile App Development",
            category: "computer",
            instructor: "Prof. Sarah Williams",
            duration: "16 Weeks",
            level: "Beginner",
            rating: 4.5,
            students: 195,
            image:
              "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Build cross-platform mobile applications using modern frameworks",
            field: "Computer Engineering",
          },
        ],
      },
      {
        name: "Network & Security",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Secure network infrastructure and cybersecurity",
        careerPaths: [
          "Network Engineer",
          "Cybersecurity Analyst",
          "IT Security Consultant",
          "Network Administrator",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-ns-101",
            title: "Cybersecurity Fundamentals",
            category: "computer",
            instructor: "Dr. Michael Brown",
            duration: "10 Weeks",
            level: "Beginner",
            rating: 4.7,
            students: 230,
            image:
              "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Introduction to cybersecurity principles, threats, and defense mechanisms. Covers encryption, authentication, and security policies.",
            field: "Computer Engineering",
          },
          {
            id: "comp-ns-102",
            title: "Network Security",
            category: "computer",
            instructor: "Prof. David Wilson",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.6,
            students: 195,
            image:
              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Comprehensive study of securing network infrastructure, including firewalls, intrusion detection systems, and VPN technologies.",
            field: "Computer Engineering",
          },
          {
            id: "comp-ns-103",
            title: "Network Architecture",
            category: "computer",
            instructor: "Dr. Emily Davis",
            duration: "14 Weeks",
            level: "Advanced",
            rating: 4.5,
            students: 175,
            image:
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
            description:
              "Design and implementation of secure network architectures, covering topology design, routing protocols, and scalability considerations.",
            field: "Computer Engineering",
          },
          {
            id: "comp-ns-104",
            title: "Cloud Security",
            category: "computer",
            instructor: "Prof. James Miller",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.4,
            students: 160,
            image:
              "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
            description:
              "Security best practices for cloud environments including identity management, data protection, and compliance in AWS/Azure platforms.",
            field: "Computer Engineering",
          },
        ],
      },
      {
        name: "Telecommunication",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Communication systems and wireless technologies",
        careerPaths: [
          "Telecom Engineer",
          "Network Planner",
          "RF Engineer",
          "Telecom Consultant",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-tc-201",
            title: "Wireless Communications",
            category: "computer",
            instructor: "Dr. Sophia Chen",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.6,
            students: 185,
            image:
              "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
            description:
              "Fundamentals of wireless communication systems including cellular networks, WiFi, and 5G technologies with hands-on signal analysis.",
            field: "Computer Engineering",
          },
          {
            id: "comp-tc-202",
            title: "Network Planning",
            category: "computer",
            instructor: "Prof. Richard Park",
            duration: "10 Weeks",
            level: "Advanced",
            rating: 4.5,
            students: 165,
            image:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Strategic planning of telecom networks including capacity forecasting, site selection, and optimization techniques for urban/rural deployments.",
            field: "Computer Engineering",
          },
          {
            id: "comp-tc-203",
            title: "RF Design",
            category: "computer",
            instructor: "Dr. Olivia Zhang",
            duration: "14 Weeks",
            level: "Advanced",
            rating: 4.7,
            students: 150,
            image:
              "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            description:
              "Radio frequency engineering principles covering antenna design, propagation models, and spectrum analysis using industry-standard tools.",
            field: "Computer Engineering",
          },
          {
            id: "comp-tc-204",
            title: "Telecom Engineering",
            category: "computer",
            instructor: "Prof. Daniel Kim",
            duration: "16 Weeks",
            level: "Intermediate",
            rating: 4.4,
            students: 210,
            image:
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Comprehensive telecom systems engineering including switching technologies, transmission protocols, and next-gen network architectures.",
            field: "Computer Engineering",
          },
        ],
      },
      {
        name: "Database Management",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Data storage, management, and analysis systems",
        careerPaths: [
          "Database Administrator",
          "Data Analyst",
          "Data Engineer",
          "BI Developer",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-db-301",
            title: "Database Design",
            category: "computer",
            instructor: "Dr. Alan Turing",
            duration: "10 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 275,
            image:
              "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Master relational database modeling with ER diagrams, normalization (1NF-3NF), and schema optimization for scalable applications.",
            field: "Computer Engineering",
            tools: ["ERwin", "MySQL Workbench"],
          },
          {
            id: "comp-db-302",
            title: "SQL",
            category: "computer",
            instructor: "Prof. Grace Hopper",
            duration: "8 Weeks",
            level: "Beginner",
            rating: 4.9,
            students: 320,
            image:
              "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Write efficient SQL queries (joins, subqueries, CTEs) and perform CRUD operations across PostgreSQL, MySQL, and SQL Server.",
            field: "Computer Engineering",
            certifications: ["Oracle SQL Certified Associate"],
          },
          {
            id: "comp-db-303",
            title: "Data Analysis",
            category: "computer",
            instructor: "Dr. Andrew Ng",
            duration: "12 Weeks",
            level: "Advanced",
            rating: 4.7,
            students: 240,
            image:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Transform raw data into insights using Python/R, statistical methods, and visualization tools (Tableau, Power BI).",
            field: "Computer Engineering",
            labs: ["COVID-19 Dataset Analysis", "Financial Trend Forecasting"],
          },
          {
            id: "comp-db-304",
            title: "Business Intelligence (BI)",
            category: "computer",
            instructor: "Prof. Cynthia Dwork",
            duration: "14 Weeks",
            level: "Intermediate",
            rating: 4.6,
            students: 195,
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Build end-to-end BI solutions with ETL pipelines, OLAP cubes, and interactive dashboards for decision-making.",
            field: "Computer Engineering",
            stack: ["SQL Server SSIS", "Snowflake", "Looker"],
          },
        ],
      },
      {
        name: "Computer Science & Networking",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description:
          "Comprehensive computer science with network specialization",
        careerPaths: [
          "Network Architect",
          "Systems Analyst",
          "IT Consultant",
          "Network Security Specialist",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-cn-401",
            title: "Computer Networks",
            category: "computer",
            instructor: "Dr. Vint Cerf",
            duration: "14 Weeks",
            level: "Intermediate",
            rating: 4.7,
            students: 220,
            image:
              "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
            description:
              "Deep dive into TCP/IP stack, routing algorithms (OSPF/BGP), and network protocols with Wireshark packet analysis labs.",
            field: "Computer Engineering",
            labs: [
              "Build a LAN with VLAN segmentation",
              "Configure Cisco routers using CLI",
            ],
            certifications: ["CCNA Preparation"],
          },
          {
            id: "comp-cn-402",
            title: "Operating Systems",
            category: "computer",
            instructor: "Prof. Linus Torvalds",
            duration: "16 Weeks",
            level: "Advanced",
            rating: 4.5,
            students: 180,
            image:
              "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Kernel development, process scheduling, memory management, and file systems through hands-on Linux kernel module programming.",
            field: "Computer Engineering",
            projects: [
              "Custom shell implementation in C",
              "Memory allocator simulation",
            ],
          },
          {
            id: "comp-cn-403",
            title: "Network Security",
            category: "computer",
            instructor: "Dr. Bruce Schneier",
            duration: "12 Weeks",
            level: "Advanced",
            rating: 4.8,
            students: 210,
            image:
              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Offensive/defensive security techniques: penetration testing with Kali Linux, firewall configurations, and IDS/IPS systems.",
            field: "Computer Engineering",
            tools: ["Metasploit", "Nmap", "Snort"],
            ethics: "CEH Exam Concepts Covered",
          },
          {
            id: "comp-cn-404",
            title: "Advanced Programming",
            category: "computer",
            instructor: "Prof. Bjarne Stroustrup",
            duration: "18 Weeks",
            level: "Expert",
            rating: 4.9,
            students: 195,
            image:
              "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80",
            description:
              "Low-level programming (C++20/Rust), concurrent systems, and performance optimization for high-frequency trading algorithms.",
            field: "Computer Engineering",
            languages: ["C++", "Rust", "Assembly"],
            project: "Build a multi-threaded web server",
          },
        ],
      },
      {
        name: "Digital Marketing & E-commerce",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Online marketing strategies and e-business solutions",

        careerPaths: [
          "Digital Marketer",
          "E-commerce Manager",
          "SEO Specialist",
          "Content Strategist",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-dm-501",
            title: "Digital Marketing",
            category: "computer",
            instructor: "Ann Handley",
            duration: "10 Weeks",
            level: "Beginner",
            rating: 4.7,
            students: 420,
            image:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Master omnichannel marketing strategies across social media, email, PPC, and display advertising with Google/Facebook ad certifications.",
            field: "Computer Engineering",
            platforms: ["Google Ads", "Meta Business Suite", "HubSpot"],
            certification: "Google Digital Marketing Certificate",
          },
          {
            id: "comp-dm-502",
            title: "E-commerce",
            category: "computer",
            instructor: "Tobias Lütke",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.6,
            students: 380,
            image:
              "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Build Shopify/WooCommerce stores with conversion rate optimization (CRO), payment gateways, and global logistics management.",
            field: "Computer Engineering",
            platforms: ["Shopify", "WooCommerce", "BigCommerce"],
            project: "Launch a live dropshipping store",
          },
          {
            id: "comp-dm-503",
            title: "SEO",
            category: "computer",
            instructor: "Brian Dean",
            duration: "8 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 350,
            image:
              "https://images.unsplash.com/photo-1611162617213-6d7f115eb148?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            description:
              "Advanced technical SEO, keyword research (Ahrefs/SEMrush), and AI-powered content optimization for Google algorithm updates.",
            field: "Computer Engineering",
            tools: ["Ahrefs", "SEMrush", "Google Search Console"],
            focus: "Voice Search & Featured Snippets",
          },
          {
            id: "comp-dm-504",
            title: "Content Marketing",
            category: "computer",
            instructor: "Joe Pulizzi",
            duration: "10 Weeks",
            level: "Beginner",
            rating: 4.5,
            students: 290,
            image:
              "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
            description:
              "Storytelling frameworks and data-driven content creation for blogs, video (YouTube/TikTok), and email nurture sequences.",
            field: "Computer Engineering",
            formats: ["Blogging", "Video Scripts", "Newsletters"],
            metric: "Audience Growth Rate Tracking",
          },
        ],
      },
      {
        name: "Computer Hardware Maintenance",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Hardware repair, maintenance, and technical support",
        careerPaths: [
          "Hardware Technician",
          "IT Support Specialist",
          "Field Service Engineer",
          "Computer Repair Technician",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-hw-601",
            title: "Computer Hardware",
            category: "computer",
            instructor: "Gordon Moore",
            duration: "8 Weeks",
            level: "Beginner",
            rating: 4.6,
            students: 180,
            image:
              "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Comprehensive study of PC components (CPUs, GPUs, motherboards) with hands-on assembly labs and hardware benchmarking techniques.",
            field: "Computer Engineering",
            labs: ["Build a custom gaming PC", "Component stress testing"],
            tools: ["Multimeters", "POST cards"],
          },
          {
            id: "comp-hw-602",
            title: "Troubleshooting",
            category: "computer",
            instructor: "Steve Wozniak",
            duration: "10 Weeks",
            level: "Intermediate",
            rating: 4.7,
            students: 165,
            image:
              "https://images.unsplash.com/photo-1581093057305-25f0a6f1e0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Systematic fault diagnosis using oscilloscopes and logic analyzers. Covers common failure patterns in desktops/laptops/servers.",
            field: "Computer Engineering",
            methodologies: [
              "Divide-and-conquer approach",
              "Signal tracing techniques",
            ],
            certifications: ["CompTIA A+ Troubleshooting Module"],
          },
          {
            id: "comp-hw-603",
            title: "Technical Support",
            category: "computer",
            instructor: "Linus Sebastian",
            duration: "6 Weeks",
            level: "Beginner",
            rating: 4.5,
            students: 210,
            image:
              "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Customer service protocols, ticketing systems (Jira/Zendesk), and remote support tools (TeamViewer) for enterprise IT environments.",
            field: "Computer Engineering",
            soft_skills: ["Active listening", "Technical documentation"],
            tools: ["Remote Desktop software", "Knowledge base systems"],
          },
          {
            id: "comp-hw-604",
            title: "System Maintenance",
            category: "computer",
            instructor: "Mark Dean",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 150,
            image:
              "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Preventive maintenance schedules, thermal paste replacement, and enterprise-level UPS/battery backup system management.",
            field: "Computer Engineering",
            maintenance_types: [
              "Predictive (sensor-based)",
              "Preventive (scheduled)",
            ],
            enterprise_tools: ["SCCM", "Nagios monitoring"],
          },
        ],
      },
      {
        name: "Computer Graphics & Web Design",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Visual design and web development skills",
        careerPaths: [
          "Web Designer",
          "Graphic Designer",
          "UI/UX Designer",
          "Front-end Developer",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "comp-cg-701",
            title: "Web Design",
            category: "computer",
            instructor: "Tim Berners-Lee",
            duration: "10 Weeks",
            level: "Beginner",
            rating: 4.7,
            students: 310,
            image:
              "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
            description:
              "Modern responsive design with HTML5, CSS3, and JavaScript. Master Flexbox/Grid layouts and build accessible, mobile-first websites.",
            field: "Computer Engineering",
            projects: [
              "Portfolio website development",
              "E-commerce product page",
            ],
            tools: ["Figma", "VS Code", "Chrome DevTools"],
            certification: "W3C Front-End Web Developer",
          },
          {
            id: "comp-cg-702",
            title: "Graphic Design",
            category: "computer",
            instructor: "Paula Scher",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.6,
            students: 275,
            image:
              "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            description:
              "Visual communication principles with Adobe Creative Cloud. Create logos, branding packages, and print materials using color theory and typography systems.",
            field: "Computer Engineering",
            software: ["Photoshop", "Illustrator", "InDesign"],
            portfolio_pieces: [
              "Brand identity system",
              "Editorial layout design",
            ],
          },
          {
            id: "comp-cg-703",
            title: "User Interface Design",
            category: "computer",
            instructor: "Don Norman",
            duration: "8 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 290,
            image:
              "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Interactive UI components design with Figma/Sketch. Learn micro-interactions, design systems, and handoff to developers using Zeplin.",
            field: "Computer Engineering",
            deliverables: [
              "High-fidelity prototypes",
              "Design system documentation",
            ],
            metrics: [
              "Usability heuristics evaluation",
              "Accessibility compliance (WCAG)",
            ],
          },
          {
            id: "comp-cg-704",
            title: "User Experience Design",
            category: "computer",
            instructor: "Jakob Nielsen",
            duration: "14 Weeks",
            level: "Advanced",
            rating: 4.9,
            students: 240,
            image:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
            description:
              "End-to-end UX process: user research (journey maps), information architecture, and usability testing with Hotjar/Maze.",
            field: "Computer Engineering",
            methods: ["Card sorting", "A/B testing", "Eye-tracking studies"],
            output: ["Interactive prototypes", "UX audit reports"],
          },
        ],
      },
    ],
  },
  {
    id: "management",
    title: "Management",
    icon: "📊",

    color: "bg-green-500",
    description: "Leadership and organizational management programs",
    programs: [
      {
        name: "Assistant Manager Operation of Air Transport",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Aviation industry management and operations",
        careerPaths: [
          "Airline Operations Manager",
          "Airport Manager",
          "Flight Operations Coordinator",
        ],
        images: [
          //get images from a relevant sourcefrom unplashed
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "mgmt-av-801",
            title: "Aviation Management",
            category: "management",
            instructor: "Chesley Sullenberger",
            duration: "12 Weeks",
            level: "Advanced",
            rating: 4.8,
            students: 150,
            image:
              "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
            description:
              "Strategic airline business management covering fleet planning, aviation law (ICAO/FAA regulations), and crisis management for operational leaders.",
            field: "Management",
            focus_areas: [
              "Airline profitability models",
              "Fuel hedging strategies",
              "Crisis response protocols",
            ],
            certification: "IATA Aviation Management",
          },
          {
            id: "mgmt-av-802",
            title: "Airline Operations",
            category: "management",
            instructor: "Herb Kelleher",
            duration: "14 Weeks",
            level: "Intermediate",
            rating: 4.7,
            students: 175,
            image:
              "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
            description:
              "Day-to-day airline operations including crew scheduling, maintenance coordination, and OCC (Operations Control Center) management.",
            field: "Management",
            systems: ["Sabre AirCentre", "Lufthansa Systems NetLine"],
            simulation: "72-hour disruption management drill",
          },
          {
            id: "mgmt-av-803",
            title: "Airport Management",
            category: "management",
            instructor: "Angela Gittens",
            duration: "10 Weeks",
            level: "Intermediate",
            rating: 4.6,
            students: 140,
            image:
              "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Airport terminal operations, A-CDM (Airport Collaborative Decision Making), and stakeholder management with airlines/TSA/customs.",
            field: "Management",
            modules: [
              "Slot allocation strategies",
              "Passenger flow optimization",
              "ANSP (Air Navigation Service Provider) coordination",
            ],
            case_study: "Hub airport turnaround optimization",
          },
          {
            id: "mgmt-av-804",
            title: "Flight Operations",
            category: "management",
            instructor: "Chuck Yeager",
            duration: "16 Weeks",
            level: "Advanced",
            rating: 4.9,
            students: 125,
            image:
              "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Flight dispatch, weight & balance calculations, and MEL (Minimum Equipment List) management with Boeing/Airbus operational manuals.",
            field: "Management",
            technical_skills: [
              "NOTAM interpretation",
              "Weather minimums analysis",
              "ETOPS planning",
            ],
            tools: ["Jeppesen FliteDeck", "Lido Flight Planning"],
          },
        ],
      },
      {
        name: "Project Management",
        duration: "1-3 Years",
        level: ["ND", "HND", "Professional Degree"],
        description: "Plan, execute, and deliver successful projects",
        careerPaths: ["Project Manager", "Project Coordinator", "Project Lead"],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "mgmt-pm-901",
            title: "Project Management",
            category: "management",
            instructor: "Dr. Harold Kerzner",
            duration: "12 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 320,
            image:
              "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            description:
              "Master PMBOK 7th edition frameworks covering predictive, agile, and hybrid methodologies. Includes stakeholder analysis and organizational change management.",
            field: "Management",
            frameworks: ["PMBOK", "PRINCE2", "AgilePM"],
            certification: "CAPM Exam Prep",
            tools: ["MS Project", "Jira"],
          },
          {
            id: "mgmt-pm-902",
            title: "Project Planning",
            category: "management",
            instructor: "Dr. Rita Mulcahy",
            duration: "10 Weeks",
            level: "Intermediate",
            rating: 4.7,
            students: 280,
            image:
              "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Develop comprehensive project charters, WBS structures, and critical path schedules. Risk identification using Monte Carlo simulations.",
            field: "Management",
            deliverables: [
              "Work Breakdown Structure",
              "Network Diagrams",
              "Resource Histograms",
            ],
            techniques: ["PERT Estimation", "Risk Burn-down Charts"],
          },
          {
            id: "mgmt-pm-903",
            title: "Project Execution",
            category: "management",
            instructor: "Jeff Sutherland",
            duration: "8 Weeks",
            level: "Advanced",
            rating: 4.9,
            students: 250,
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Scrum implementation with SAFe scaling. Earned value management (EVM) and team velocity tracking using Agile metrics.",
            field: "Management",
            methodologies: ["Scrum@Scale", "Kanban", "Hybrid Agile-Waterfall"],
            metrics: ["Schedule Performance Index", "Cost Performance Index"],
          },
          {
            id: "mgmt-pm-904",
            title: "Project Delivery",
            category: "management",
            instructor: "Tom DeMarco",
            duration: "6 Weeks",
            level: "Expert",
            rating: 4.6,
            students: 210,
            image:
              "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Transition management and benefits realization. Post-implementation reviews and lessons learned documentation for PMO integration.",
            field: "Management",
            focus_areas: [
              "Organizational Change Management",
              "Benefits Transition Framework",
              "Knowledge Transfer Systems",
            ],
            templates: ["Project Closure Report", "Benefits Realization Plan"],
          },
        ],
      },
      {
        name: "Human Resource Management",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "Personnel management and organizational development",
        careerPaths: [
          "HR Manager",
          "Talent Acquisition Specialist",
          "Training and Development Manager",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1584697964192-1b6f8c0d3a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "mgmt-hr-1001",
            title: "Human Resource Management",
            category: "management",
            instructor: "Dave Ulrich",
            duration: "14 Weeks",
            level: "Advanced",
            rating: 4.8,
            students: 290,
            image:
              "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Strategic HR business partnering with workforce planning, employment law compliance, and organizational development frameworks.",
            field: "Management",
            frameworks: [
              "HR Business Partner Model",
              "SHRM Competency Model",
              "Balanced Scorecard",
            ],
            certification: "SHRM-CP Prep",
            analytics: "HR Metrics Dashboard Development",
          },
          {
            id: "mgmt-hr-1002",
            title: "Recruitment",
            category: "management",
            instructor: "Lou Adler",
            duration: "8 Weeks",
            level: "Intermediate",
            rating: 4.7,
            students: 320,
            image:
              "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Modern talent acquisition strategies including Boolean search, competency-based interviewing, and AI-powered applicant tracking systems.",
            field: "Management",
            tools: [
              "LinkedIn Recruiter",
              "Greenhouse ATS",
              "HireVue Video Interviews",
            ],
            metrics: ["Time-to-Fill Optimization", "Quality-of-Hire Analysis"],
          },
          {
            id: "mgmt-hr-1003",
            title: "Training and Development",
            category: "management",
            instructor: "Donald Kirkpatrick",
            duration: "12 Weeks",
            level: "Intermediate",

            rating: 4.6,
            students: 275,
            image:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            description:
              "Needs analysis through Kirkpatrick evaluation model. Design blended learning programs with LMS platforms and microlearning modules.",
            field: "Management",
            methodologies: [
              "70-20-10 Development Model",
              "Action Learning Projects",
            ],
            platforms: ["Cornerstone OnDemand", "Docebo LMS"],
          },
          {
            id: "mgmt-hr-1004",
            title: "Performance Management",
            category: "management",
            instructor: "Marcus Buckingham",
            duration: "10 Weeks",
            level: "Advanced",
            rating: 4.9,
            students: 240,
            image:
              "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Continuous performance coaching with OKR frameworks. Implement 360° feedback systems and calibration committees for fair evaluations.",
            field: "Management",
            systems: ["Adobe Performance Manager", "Workday HCM"],
            innovations: [
              "Real-Time Feedback Tools",
              "Strengths-Based Assessments",
            ],
          },
        ],
      },
      {
        name: "Logistics & Transport Management",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Supply chain and transportation systems management",
        careerPaths: [
          "Supply Chain Management",
          "Logistics Management",
          "Transportation Management",
        ],
        images: [
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          "Supply Chain Management",
          "Logistics Management",
          "Transportation Management",
        ],
      },
      {
        name: "Information System Management",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "IT systems and business process management",
        careerPaths: [
          "Information Technology (IT)",
          "Information Systems (IS)",
          "Information Management (IM)",
        ],
      },
      {
        name: "Local Government Management",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "Public administration and governance",
      },
      {
        name: "Port Shipping Management",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Maritime and port operations management",
      },
    ],
  },
  {
    id: "business",
    title: "Business & Finance",
    icon: "💰",
    color: "bg-yellow-500",
    description: "Financial management and business administration",
    programs: [
      {
        name: "Accountancy",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "Financial accounting, auditing, and tax management",
        carreerPaths: ["Accounting", "Auditing", "Tax Management"],
        images: [
          "https://images.unsplash.com/photo-1545972154-9bb3fb37f8c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1545972154-9bb3fb37f8c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1545972154-9bb3fb37f8c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        ],
        courses: [
          {
            id: "biz-ac-1191",
            title: "Accounting",
            category: "business",
            instructor: "Luca Pacioli",
            duration: "16 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 350,
            image:
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80",
            description:
              "Master double-entry bookkeeping, financial statement preparation (Balance Sheet, Income Statement, Cash Flow), and GAAP/IFRS compliance standards.",
            field: "Business & Finance",
            software: ["QuickBooks Online", "Xero", "Sage 50cloud"],
            certification: "ACCA Financial Accounting (FA)",
            specializations: [
              "Managerial Accounting",
              "Cost Accounting Systems",
            ],
          },
          {
            id: "biz-ac-1162",
            title: "Auditing",
            category: "business",
            instructor: "David M. Wood",
            duration: "14 Weeks",
            level: "Advanced",
            rating: 4.7,
            students: 280,
            image:
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description:
              "Conduct risk-based audits using ISA standards. Learn sampling techniques, internal control evaluation, and fraud detection methodologies.",
            field: "Business & Finance",
            standards: [
              "ISA (International Standards on Auditing)",
              "SOX Compliance",
            ],
            tools: ["CaseWare Working Papers", "TeamMate+ Audit"],
            simulations: [
              "Forensic Audit Case Study",
              "Big 4 Audit Simulation",
            ],
          },
          {
            id: "biz-ac-1103",
            title: "Tax Management",
            category: "business",
            instructor: "Richard M. Bird",
            duration: "12 Weeks",
            level: "Expert",
            rating: 4.9,
            students: 310,
            image:
              "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
            description:
              "Strategic tax planning covering corporate tax, VAT/GST implementation, and cross-border taxation treaties. IRS audit defense techniques.",
            field: "Business & Finance",
            jurisdictions: ["OECD Model Tax Convention", "BEPS Action Plans"],
            software: ["Thomson Reuters ONESOURCE", "CCH Axcess Tax"],
            planning: [
              "Transfer Pricing Strategies",
              "Tax Shield Optimization",
            ],
          },
        ],
      },
      {
        name: "Banking & Finance",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "Financial services and banking operations",
        carreerPaths: [
          "Business Analyst",
          "Financial Analyst",
          "Financial Manager",
          "Risk Manager",
          "Financial Controller",
        ],
        images: [
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        ],
        courses: [
          {
            id: "biz-ac-1109",
            title: "Accounting",
            category: "business",
            instructor: "Luca Pacioli",
            duration: "16 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 350,
            image:
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80",
            description:
              "Master double-entry bookkeeping, financial statement preparation (Balance Sheet, Income Statement, Cash Flow), and GAAP/IFRS compliance standards.",
            field: "Business & Finance",
            software: ["QuickBooks Online", "Xero", "Sage 50cloud"],
            certification: "ACCA Financial Accounting (FA)",
            specializations: [
              "Managerial Accounting",
              "Cost Accounting Systems",
            ],
          },
          {
            id: "biz-ac-1102",
            title: "Auditing",
            category: "business",
            instructor: "Luca Pacioli",
            duration: "16 Weeks",
            level: "Intermediate",
            rating: 4.8,
            students: 350,
            image:
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80",
            description:
              "Conduct risk-based audits using ISA standards. Learn sampling techniques, internal control evaluation, and fraud detection methodologies.",
            field: "Business & Finance",
            standards: [
              "ISA (International Standards on Auditing)",
              "SOX Compliance",
            ],
            tools: ["CaseWare Working Papers", "TeamMate+ Audit"],
            simulations: ["Auditing Simulations", "Auditing Case Studies"],
          },
        ],
      },
      {
        name: "International Trade",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Global commerce and import/export operations",
      },
      {
        name: "Micro Finance",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Small-scale financial services and lending",
      },
      {
        name: "Insurance",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Risk management and insurance services",
      },
    ],
  },
  {
    id: "tourism",
    title: "Tourism and Hotel Management",
    icon: "🏨",
    color: "bg-purple-500",
    description: "Hospitality and tourism industry management",
    programs: [
      {
        name: "Tourism & Travel Agency Management",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Tourism operations and travel service management",
      },
      {
        name: "Hotel Management & Catering",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description:
          "Hotel operations, hospitality, and food service management",
      },
    ],
  },
  {
    id: "education",
    title: "Science of Education",
    icon: "📚",
    color: "bg-indigo-500",
    description: "Educational leadership and instructional design",
    programs: [
      {
        name: "Didactics & Curriculum Development",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "Teaching methods and educational curriculum design",
      },
      {
        name: "Education Management & Administration",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "School administration and educational leadership",
      },
      {
        name: "Guidance & Counseling",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "Student counseling and psychological support services",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    icon: "📺",
    color: "bg-pink-500",
    description: "Media, journalism, and communication arts",
    programs: [
      {
        name: "Journalism",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "News reporting, media writing, and broadcast journalism",
      },
      {
        name: "Advertisement & Public Relations",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Marketing communication and brand management",
      },
      {
        name: "Printing, Editing & Publishing",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Print media production and editorial services",
      },
      {
        name: "Media Photography & Audio Visual",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Visual media production and multimedia content creation",
      },
    ],
  },
  {
    id: "civil",
    title: "Civil Engineering",
    icon: "🏗️",
    color: "bg-orange-500",
    description: "Construction and infrastructure development",
    programs: [
      {
        name: "Topography",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Land surveying and mapping techniques",
      },
      {
        name: "Urban Planning",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "City development and spatial planning",
      },
      {
        name: "Civil Engineering Technology",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Construction technology and structural engineering",
      },
      {
        name: "Sanitary Installation & Plumbing",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Water systems and sanitation infrastructure",
      },
      {
        name: "Building Science & Technology",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Construction methods and building materials",
      },
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture & Food Science",
    icon: "🌾",
    color: "bg-green-600",
    description: "Agricultural technology and food production",
    programs: [
      {
        name: "Food Technology",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Food processing and quality control systems",
      },
      {
        name: "Agricultural Engineering",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Farm mechanization and agricultural systems",
      },
      {
        name: "Crop Production Technology",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Modern farming techniques and crop management",
      },
      {
        name: "Animal Production Technology",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Livestock management and animal husbandry",
      },
      {
        name: "Agricultural Business Technics",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Agribusiness management and marketing",
      },
      {
        name: "Fisheries Management",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Aquaculture and marine resource management",
      },
      {
        name: "Agriculture Production Technology",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "General agricultural production methods",
      },
    ],
  },
  {
    id: "arts",
    title: "Arts and Culture",
    icon: "🎨",
    color: "bg-red-500",
    description: "Creative arts and cultural preservation",
    programs: [
      {
        name: "Gastronomic Arts",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Culinary arts and food presentation",
      },
      {
        name: "Cinematography",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Film production and visual storytelling",
      },
      {
        name: "Product Design",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Industrial and consumer product design",
      },
      {
        name: "Fashion Design",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Clothing design and fashion industry",
      },
      {
        name: "Interior Design",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Space planning and interior decoration",
      },
    ],
  },
  {
    id: "mechanical",
    title: "Mechanical Engineering",
    icon: "⚙️",
    color: "bg-gray-600",
    description: "Mechanical systems and manufacturing technology",
    programs: [
      {
        name: "Metal Construction",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Metalworking and structural fabrication",
      },
      {
        name: "Mechanical Manufacturing",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Production systems and manufacturing processes",
      },
      {
        name: "Mechanical Construction",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Machine assembly and mechanical systems",
      },
      {
        name: "Boiler Making & Welding",
        duration: "1-2 Years",
        level: ["ND", "HND"],
        description: "Welding techniques and pressure vessel construction",
      },
    ],
  },
  {
    id: "electrical",
    title: "Electrical Engineering",
    icon: "⚡",
    color: "bg-yellow-600",
    description: "Electrical systems and electronic technology",
    programs: [
      {
        name: "Electronics",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Electronic circuits and digital systems",
      },
      {
        name: "Electrotechnics",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Electrical installation and power systems",
      },
      {
        name: "Electrical Power System",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Power generation and distribution systems",
      },
      {
        name: "Maintenance of Industrial System",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Industrial equipment maintenance and repair",
      },
      {
        name: "Maintenance of Biomedical Equipment",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Medical device maintenance and calibration",
      },
    ],
  },
  {
    id: "biomedical",
    title: "Biomedical",
    icon: "🏥",
    color: "bg-red-600",
    description: "Healthcare and medical technology programs",
    programs: [
      {
        name: "Midwifery",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Maternal and infant healthcare services",
      },
      {
        name: "Nursing",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Patient care and medical assistance",
      },
      {
        name: "Physiotherapy",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Physical rehabilitation and therapy",
      },
      {
        name: "Pharmacy Technology",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Pharmaceutical preparation and dispensing",
      },
    ],
  },
  {
    id: "thermal",
    title: "Thermal and Energy Engineering",
    icon: "🔥",
    color: "bg-orange-600",
    description: "Energy systems and thermal management",
    programs: [
      {
        name: "Air Conditioning & Refrigeration",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "HVAC systems and refrigeration technology",
      },
      {
        name: "Sustainability & Renewable Energy",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree", "Masters"],
        description: "Green energy and sustainable technology",
      },
      {
        name: "Maintenance & Management of Fluid System",
        duration: "2-3 Years",
        level: ["HND", "Professional Degree"],
        description: "Hydraulic and pneumatic systems management",
      },
    ],
  },
];

// Additional data arrays for study options and contact information
export const studyOptions = [
  {
    title: "Duration",
    icon: "clock",
    options: [
      {
        name: "One Year Program",
        description: "Intensive certificate programs",
      },
      {
        name: "Two Year Program",
        description: "National and Higher National Diplomas",
      },
      {
        name: "Three Year Program",
        description: "Professional Degrees and Advanced Programs",
      },
    ],
  },
  {
    title: "Study Modes",
    icon: "users",
    options: [
      { name: "Day Classes", description: "Full-time weekday schedule" },
      { name: "Evening Classes", description: "Part-time after work hours" },
      { name: "Online Learning", description: "Remote digital education" },
    ],
  },
  {
    title: "Certificate Levels",
    icon: "graduation",
    options: [
      {
        name: "National Diploma",
        description: "Entry-level professional certification",
      },
      {
        name: "Higher National Diploma",
        description: "Advanced technical qualification",
      },
      {
        name: "Professional Degree",
        description: "Specialized professional certification",
      },
      { name: "Masters Degree", description: "Postgraduate advanced degree" },
    ],
  },
];

export const institutionInfo = {
  name: "SEVIC-HITM",
  fullName: "Vision Computerised Higher Institute of Technology & Management",
  accreditation: [
    { type: "Order No.", number: "281MINEFOP/SG/DFOP/SDGSE/SACD" },
    { type: "Order No.", number: "22-05647/LMINESUP/SG/DDESIESUUP/SDA/MF" },
  ],
  mentorship: "University of Bamenda (UBa)",
  accreditedBy: "Ministry of Higher Education (MINESUP)",
  contact: {
    phones: [
      "+237 653 462 818",
      "+237 686 615 122",
      "+237 654 765 819",
      "+237 670 692 618",
    ],
    email: "sevichitm@gmail.com",
    website: "www.sevic-hitm.com",
    address: "Chapelle Obili, Yaoundé",
  },
  features: {
    scholarships: "Partial Scholarships Available",
    programs: "65+ Programs",
    fields: "13 Fields",
    degrees: "4 Certificate Levels",
  },
};
