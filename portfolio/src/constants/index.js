import {
    
    frontend,
    backend,
    ux,
    prototyping,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    cpp,
    git,
    figma,
    docker,
    postgresql,
    python,
    rubyrails,
    graphql,
    komikult,
    leaderboard,
    math,
    movie,
    nyeusi,
    space,
    coverhunt,
    dcc,
    kelhel,
    microverse,
  } from '../assets';
  
  export const navLinks = [
    {
      id: 'about',
      title: 'About',
    },
    {
      id: 'projects',
      title: 'Projects',
    },
    {
      id: 'contact',
      title: 'Contact',
    },
  ];
  
  const services = [
    {
      title: 'Frontend Developer',
      icon: frontend,
    },
    {
      title: 'Backend Developer',
      icon: backend,
    },
    {
      title: 'Machine Learning',
      icon: ux,
    },
    {
      title: 'Software Prototyping',
      icon: prototyping,
    },
  ];
  
  const technologies = [
    {
      name: 'HTML 5',
      icon: html,
    },
    {
      name: 'CSS 3',
      icon: css,
    },
    {
      name: 'JavaScript',
      icon: javascript,
    },
    {
      name: 'TypeScript',
      icon: typescript,
    },
    {
      name: 'React JS',
      icon: reactjs,
    },
    {
      name: 'Redux Toolkit',
      icon: redux,
    },
    // {
    //   name: 'Tailwind CSS',
    //   icon: tailwind,
    // },
    {
      name: 'Node JS',
      icon: nodejs,
    },
    // {
    //   name: 'Rails',
    //   icon: rubyrails,
    // },
    // {
    //   name: 'graphql',
    //   icon: graphql,
    // },
    {
      name: 'postgresql',
      icon: postgresql,
    },
    {
      name: 'git',
      icon: git,
    },
    // {
    //   name: 'figma',
    //   icon: figma,
    // },
    {
        name: 'C++',
        icon: cpp,
    },
    {
        name: 'python',
        icon: python,
    },
    {
      name: 'docker',
      icon: docker,
    },
  ];
  
  const experiences = [
    // {
    //   title: 'Front-End Developer',
    //   company_name: 'Cover Hunt',
    //   icon: coverhunt,
    //   iconBg: '#333333',
    //   date: 'Aug 2021 - Feb 2022',
    // },
    // {
    //   title: 'Mentor (Volunteer)',
    //   company_name: 'Microverse',
    //   icon: microverse,
    //   iconBg: '#333333',
    //   date: 'Mar 2022 - May 2022',
    // },
    {
        title: 'Member',
        company_name: 'Drishti-A Revolutionary Concept',
        icon: microverse,
        iconBg: '#333',
        date: 'June 2020 - March 2021'

    },
    {
        title: 'ML Mentor',
        company_name: 'Drishti-A Revolutionary Concept',
        icon: microverse,
        iconBg: '#333',
        date: 'Sept 2021 - March 2022'

    },
    {
      title: 'Web Developer',
      company_name: 'Orbitz IT Solution',
      icon: kelhel,
      iconBg: '#333333',
      date: 'May 2022 - Jul 2022',
    },
    // {
    //   title: 'Full Stack Developer',
    //   company_name: 'Diversity Cyber Council',
    //   icon: dcc,
    //   iconBg: '#333333',
    //   date: 'Sep 2022 - Present',
    // },
  ];
  
  const projects = [
    {
      id: 'project-1',
      name: 'WorkHunt.tech',
      description: 'A Job portal suited for your needs',
      tags: [
        {
          name: 'react',
          color: 'blue-text-gradient',
        },
        {
          name: 'mongodb',
          color: 'green-text-gradient',
        },
        {
          name: 'tailwind',
          color: 'pink-text-gradient',
        },
      ],
      image: komikult,
      repo: 'https://github.com/shaqdeff/KomiKult',
      demo: 'https://shaqdeff.github.io/KomiKult/',
    },
    {
      id: 'project-2',
      name: 'Tunex',
      description:
        'A Webapp which gives out recommendations based on your mood. Mood is determined with the help of facial expression',
      tags: [
        {
          name: 'react',
          color: 'blue-text-gradient',
        },
        {
          name: 'restapi',
          color: 'green-text-gradient',
        },
        {
          name: 'scss',
          color: 'pink-text-gradient',
        },
      ],
      image: leaderboard,
      repo: 'https://github.com/hp77-creator/TUNEX',
      demo: 'https://shaqdeff.github.io/Leaderboard/',
    },
    {
      id: 'project-3',
      name: 'IPL Winner Predictor',
      description: 'Trained an ML Model to predict IPL winner on the basis of past data',
      tags: [
        {
          name: 'nextjs',
          color: 'blue-text-gradient',
        },
        {
          name: 'supabase',
          color: 'green-text-gradient',
        },
        {
          name: 'css',
          color: 'pink-text-gradient',
        },
      ],
      image: math,
      repo: 'https://github.com/shaqdeff/Math-Magicians',
      demo: 'https://inspiring-medovik-37d3b3.netlify.app/',
    },
    // {
    //   id: 'project-4',
    //   name: 'Movie Metro',
    //   description: `A single-page application that allows users to search for any movie or show's ratings and its details.`,
    //   tags: [
    //     {
    //       name: 'nextjs',
    //       color: 'blue-text-gradient',
    //     },
    //     {
    //       name: 'supabase',
    //       color: 'green-text-gradient',
    //     },
    //     {
    //       name: 'css',
    //       color: 'pink-text-gradient',
    //     },
    //   ],
    //   image: movie,
    //   repo: 'https://github.com/shaqdeff/Movie-Metro',
    //   demo: 'https://movie-metro.netlify.app/',
    // },
    // {
    //   id: 'project-5',
    //   name: 'Nyeusi Fest Site',
    //   description:
    //     'This is a demo concert website for a music festival called Nyeusi.',
    //   tags: [
    //     {
    //       name: 'nextjs',
    //       color: 'blue-text-gradient',
    //     },
    //     {
    //       name: 'supabase',
    //       color: 'green-text-gradient',
    //     },
    //     {
    //       name: 'css',
    //       color: 'pink-text-gradient',
    //     },
    //   ],
    //   image: nyeusi,
    //   repo: 'https://github.com/shaqdeff/Nyeusi-Fest-Site',
    //   demo: 'https://shaqdeff.github.io/Nyeusi-Fest-Site/',
    // },
  ];

const achievements = [
    {
        id: 'ach-1',
        title: 'Winner at DotSlash 2k23',
        description: 'Hackathon winner at National level hackathon hosted by ACM-SVNIT',
        image: komikult,
    },
    {
      id: 'ach-2',
      title: 'Pre-Seed Funded OSEM',
      description: 'Took Final Year Project to Incubation center of College and got a grant',
      image: nyeusi,
    }
]
  
  export { services, technologies, experiences, projects, achievements };