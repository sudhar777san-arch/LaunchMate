


export type Student = {
  id: string;
  name: string;
  avatarUrl: string;
  college: string;
  skills: string[];
  online: boolean;
  location: { lat: number; lng: number; name: string };
  bio: string;
  projects: Pick<Project, 'id' | 'name' | 'description' | 'imageUrl'>[];
  connections: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  votes: number;
  team: Pick<Student, 'id' | 'name' | 'avatarUrl'>[];
};

export type Campus = {
    id: string;
    name: string;
    location: string;
    imageUrl: string;
    posts: CampusPost[];
};

export type CampusPost = {
    id: string;
    author: Pick<Student, 'id' | 'name' | 'avatarUrl'>;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
};

export type ResourceDomain = {
  id: string;
  name: string;
  description: string;
  iconName: 'Palette' | 'Database' | 'Code' | 'Bot' | 'Cpu' | 'ShieldCheck';
  playlists: ResourcePlaylist[];
}

export type ResourcePlaylist = {
  id: string;
  title: string;
  author: string;
  url: string;
  description: string;
}

export const currentUser: Student = {
    id: '1',
    name: 'Suresh K',
    avatarUrl: 'https://picsum.photos/seed/1/200/200',
    college: 'MIT',
    skills: ['TypeScript', 'React', 'Node.js', 'AI/ML', 'System Design'],
    online: true,
    location: { lat: 42.3601, lng: -71.0942, name: 'Cambridge, USA' },
    bio: "Aspiring full-stack developer and AI enthusiast. Passionate about building products that make a difference. Currently exploring the intersection of generative AI and user experience. Let's connect and build something amazing!",
    projects: [
        { id: 'p1', name: 'EcoTrack', description: 'An app to monitor and reduce personal carbon footprint.', imageUrl: 'https://picsum.photos/seed/101/600/400'},
        { id: 'p2', name: 'HealthAI', description: 'AI-powered diagnostic tool for preliminary health screening.', imageUrl: 'https://picsum.photos/seed/102/600/400' },
    ],
    connections: ['2', '3', '4'],
};

export const students: Student[] = [
  currentUser,
  {
    id: '2',
    name: 'Maria Garcia',
    avatarUrl: 'https://picsum.photos/seed/2/200/200',
    college: 'Stanford',
    skills: ['Python', 'Data Science', 'PyTorch', 'Computer Vision'],
    online: false,
    location: { lat: 37.4275, lng: -122.1697, name: 'Stanford, USA' },
    bio: 'Data scientist focused on creating ethical AI solutions. I believe in data-driven decisions.',
    projects: [],
    connections: ['1', '5']
  },
  {
    id: '3',
    name: 'Chen Wei',
    avatarUrl: 'https://picsum.photos/seed/3/200/200',
    college: 'Tsinghua University',
    skills: ['Go', 'Kubernetes', 'Distributed Systems', 'Cloud Native'],
    online: true,
    location: { lat: 39.9042, lng: 116.4074, name: 'Beijing, China' },
    bio: 'Backend engineer obsessed with performance and scalability. Building the infrastructure of tomorrow.',
    projects: [],
    connections: ['1']
  },
  {
    id: '4',
    name: 'Priya Patel',
    avatarUrl: 'https://picsum.photos/seed/4/200/200',
    college: 'IIT Bombay',
    skills: ['UX/UI Design', 'Figma', 'Prototyping', 'User Research'],
    online: true,
    location: { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India' },
    bio: 'Designer creating intuitive and beautiful user experiences. I design for humans.',
    projects: [],
    connections: ['1', '6']
  },
  {
    id: '5',
    name: 'Sam O\'Connell',
    avatarUrl: 'https://picsum.photos/seed/5/200/200',
    college: 'University of Waterloo',
    skills: ['Rust', 'WebAssembly', 'Game Development', 'Bevy Engine'],
    online: false,
    location: { lat: 43.4643, lng: -80.5204, name: 'Waterloo, Canada' },
    bio: 'Building the next generation of web and gaming experiences with Rust and Wasm.',
    projects: [],
    connections: ['2']
  },
  {
    id: '6',
    name: 'Fatima Al-Jamil',
    avatarUrl: 'https://picsum.photos/seed/6/200/200',
    college: 'ETH Zurich',
    skills: ['Robotics', 'C++', 'ROS', 'Control Systems'],
    online: true,
    location: { lat: 47.3769, lng: 8.5417, name: 'Zurich, Switzerland' },
    bio: 'Robotics engineer working on autonomous systems. Making machines smarter.',
    projects: [],
    connections: ['4']
  },
];

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'EcoTrack',
    description: 'A mobile app to monitor and reduce your personal carbon footprint using AI-powered suggestions.',
    imageUrl: 'https://picsum.photos/seed/101/600/400',
    tags: ['Mobile', 'AI/ML', 'Sustainability'],
    votes: 128,
    team: [
        { id: '1', name: 'Suresh K', avatarUrl: 'https://picsum.photos/seed/1/200/200' },
        { id: '4', name: 'Priya Patel', avatarUrl: 'https://picsum.photos/seed/4/200/200' },
    ],
  },
  {
    id: 'p2',
    name: 'HealthAI',
    description: 'AI-powered diagnostic tool for preliminary health screening based on user-reported symptoms.',
    imageUrl: 'https://picsum.photos/seed/102/600/400',
    tags: ['Healthcare', 'AI/ML', 'Web App'],
    votes: 256,
    team: [
        { id: '2', name: 'Maria Garcia', avatarUrl: 'https://picsum.photos/seed/2/200/200' },
    ],
  },
  {
    id: 'p3',
    name: 'CodeCollab',
    description: 'A real-time collaborative coding platform with integrated video chat and version control.',
    imageUrl: 'https://picsum.photos/seed/103/600/400',
    tags: ['Developer Tools', 'Real-time', 'SaaS'],
    votes: 98,
    team: [
        { id: '1', name: 'Suresh K', avatarUrl: 'https://picsum.photos/seed/1/200/200' },
        { id: '3', name: 'Chen Wei', avatarUrl: 'https://picsum.photos/seed/3/200/200' },
    ],
  },
  {
    id: 'p4',
    name: 'Artify',
    description: 'Generate unique digital art using generative adversarial networks (GANs).',
    imageUrl: 'https://picsum.photos/seed/104/600/400',
    tags: ['Art', 'AI/ML', 'Web App'],
    votes: 450,
    team: [
      { id: '2', name: 'Maria Garcia', avatarUrl: 'https://picsum.photos/seed/2/200/200' },
    ],
  },
   {
    id: 'p5',
    name: 'UrbanNav',
    description: 'An augmented reality navigation app for complex urban environments and subway systems.',
    imageUrl: 'https://picsum.photos/seed/105/600/400',
    tags: ['AR/VR', 'Mobile', 'Maps'],
    votes: 310,
    team: [
        { id: '5', name: 'Sam O\'Connell', avatarUrl: 'https://picsum.photos/seed/5/200/200' },
        { id: '6', name: 'Fatima Al-Jamil', avatarUrl: 'https://picsum.photos/seed/6/200/200' },
    ],
  },
  {
    id: 'p6',
    name: 'SoundWave',
    description: 'A platform for musicians to collaborate on tracks in real-time from anywhere in the world.',
    imageUrl: 'https://picsum.photos/seed/106/600/400',
    tags: ['Music', 'Real-time', 'Web App'],
    votes: 180,
    team: [
      { id: '3', name: 'Chen Wei', avatarUrl: 'https://picsum.photos/seed/3/200/200' },
    ],
  }
];

export const campuses: Campus[] = [
    {
        id: 'mit',
        name: 'MIT Innovation Hub',
        location: 'Cambridge, USA',
        imageUrl: 'https://picsum.photos/seed/201/800/400',
        posts: [
            { id: 'post1', author: currentUser, content: 'Anyone interested in a weekend hackathon focused on quantum computing? Got a crazy idea for a quantum-resistant encryption algorithm.', timestamp: '2 hours ago', likes: 15, comments: 4 },
            { id: 'post2', author: {id: '99', name: 'Jane Doe', avatarUrl: 'https://picsum.photos/seed/99/200/200'}, content: 'Looking for a co-founder with a strong background in robotics for a new venture in automated logistics. DM me if interested!', timestamp: '1 day ago', likes: 42, comments: 12 },
        ]
    },
    {
        id: 'stanford',
        name: 'Stanford Launchpad',
        location: 'Stanford, USA',
        imageUrl: 'https://picsum.photos/seed/202/800/400',
        posts: [
             { id: 'post3', author: students[1], content: 'Just published a new paper on Computer Vision techniques for satellite imagery analysis. Check it out on my profile!', timestamp: '5 hours ago', likes: 50, comments: 8 },
             { id: 'post5', author: {id: '98', name: 'John Smith', avatarUrl: 'https://picsum.photos/seed/98/200/200'}, content: 'We are looking for beta testers for our new project management tool. It is designed for student teams. Any one interested?', timestamp: '2 days ago', likes: 23, comments: 5 },

        ]
    },
    {
        id: 'iit-bombay',
        name: 'IIT Bombay Catalyst',
        location: 'Mumbai, India',
        imageUrl: 'https://picsum.photos/seed/203/800/400',
        posts: [
             { id: 'post4', author: students[3], content: 'Hosted a workshop on "Designing for Accessibility". The turnout was amazing! Thanks everyone for participating.', timestamp: '3 days ago', likes: 88, comments: 21 },
             { id: 'post6', author: {id: '97', name: 'Emily White', avatarUrl: 'https://picsum.photos/seed/97/200/200'}, content: 'I am looking for a project partner for my class project. The project is about building a drone that can deliver small packages. I have the hardware, I need someone to help me with the software.', timestamp: '4 days ago', likes: 34, comments: 9 },

        ]
    },
];

export const resourceDomains: ResourceDomain[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Build beautiful and interactive user interfaces.',
    iconName: 'Palette',
    playlists: [
      { id: 'pl1', title: 'React JS Full Course', author: 'BroCode', url: 'https://www.youtube.com/watch?v=CgkZ7MvWUAA', description: 'A comprehensive playlist covering React from basics to advanced topics.' },
      { id: 'pl2', title: 'Next.js 14 Full Course', author: 'Dave Gray', url: 'https://www.youtube.com/watch?v=6h649f2fB9Q&list=PL0Zuz27SZ-6Pk-QJIdGd1tGZEzy9RTgt', description: 'Learn the latest version of the most popular React framework.' },
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Power applications with robust server-side logic.',
    iconName: 'Database',
    playlists: [
      { id: 'pl3', title: 'Node.js and Express.js', author: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', description: 'Master backend development with Node.js and Express in this comprehensive course.' },
    ]
  },
    {
    id: 'fullstack',
    name: 'Full-Stack',
    description: 'Develop both the client and server side of applications.',
    iconName: 'Code',
    playlists: [
        { id: 'pl4', title: 'MERN Stack Course', author: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=F9gB5b4jgOI', description: 'Learn to build full-stack applications with MongoDB, Express, React, and Node.js.' },
    ]
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    description: 'Explore the world of artificial intelligence and machine learning.',
    iconName: 'Bot',
    playlists: [
        { id: 'pl5', title: 'Machine Learning for Everybody', author: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=i_LwzRVP7bg', description: 'A beginner-friendly introduction to the concepts of Machine Learning.' },
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Analyze data to extract meaningful insights.',
    iconName: 'Cpu',
    playlists: [
        { id: 'pl6', title: 'Data Science Full Course', author: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=ua-CiDNNj30', description: 'A comprehensive playlist covering all aspects of data science, from Python basics to advanced machine learning.' },
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Protect systems and data from cyber threats.',
    iconName: 'ShieldCheck',
    playlists: [
        { id: 'pl7', title: 'Ethical Hacking Full Course', author: 'freeCodeCamp.org', url: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE&list=PLWKjhJtqVAbnklGh3FNRLECx_2D_vK3mu', description: 'Learn the fundamentals of cybersecurity and ethical hacking in this full-length course.' },
    ]
  }
]
