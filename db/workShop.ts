export interface Workshop {
    id: number;
    title: string;
    link: string;
    instructor: string;
    date: string;
    time: string;
    location: string;
    description: string;
    category: string;
}

export const workshopsData: Workshop[] = [
    { 
        id: 1,
        title: 'Python for Beginners',
        link: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        instructor: 'Dr. Sarah Chen',
        date: 'JUL 15',
        time: '10:00 AM - 12:00 PM',
        location: 'Tech Lab 101',
        description: 'Learn Python fundamentals through hands-on exercises and real-world examples. Perfect for absolute beginners.',
        category: 'Programming'
    },
    { 
        id: 2,
        title: 'Full-Stack Web Development',
        link: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        instructor: 'Prof. James Rodriguez',
        date: 'JUL 17', 
        time: '2:00 PM - 4:30 PM',
        location: 'Digital Innovation Hub',
        description: 'Build complete web applications using React, Node.js, and MongoDB in this intensive workshop.',
        category: 'Web Development'
    },
    { 
        id: 3, 
        title: 'Data Science Fundamentals',
        link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        instructor: 'Dr. Amina Khan',
        date: 'JUL 19',
        time: '9:00 AM - 1:00 PM',
        location: 'Data Analytics Center',
        description: 'Introduction to data analysis, visualization, and machine learning using Python and Jupyter notebooks.',
        category: 'Data Science'
    },
    {
        id: 4,
        title: 'Mobile App Development',
        link: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        instructor: 'Prof. Michael Johnson',
        date: 'JUL 22',
        time: '1:00 PM - 3:30 PM',
        location: 'Mobile Dev Lab',
        description: 'Create cross-platform mobile apps with React Native and Expo in this hands-on coding session.',
        category: 'Mobile Development'
    },
    {
        id: 5,
        title: 'UI/UX Design Principles',
        link: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        instructor: 'Designer Emma Wilson',
        date: 'JUL 24',
        time: '11:00 AM - 2:00 PM',
        location: 'Creative Studio A',
        description: 'Master user-centered design techniques and create intuitive digital experiences.',
        category: 'Design'
    },
    {
        id: 6,
        title: 'Cloud Computing with AWS',
        link: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        instructor: 'Cloud Architect David Park',
        date: 'JUL 26',
        time: '3:00 PM - 5:30 PM',
        location: 'Cloud Computing Lab',
        description: 'Learn to deploy and manage applications using Amazon Web Services infrastructure.',
        category: 'Cloud Computing'
    }
];