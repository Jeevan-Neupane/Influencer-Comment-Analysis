import { Router } from "express";
const route = Router();

const videos = [
    {
        title: 'Introduction to JavaScript',
        date: '2023-11-01',
        views: 1500
    },
    {
        title: 'Node.js Crash Course',
        date: '2024-02-15',
        views: 2200
    },
    {
        title: 'React Hooks Tutorial',
        date: '2023-12-10',
        views: 1800
    },
    {
        title: 'Python Basics for Beginners',
        date: '2024-01-05',
        views: 3000
    },
    {
        title: 'Machine Learning Fundamentals',
        date: '2023-12-20',
        views: 2500
    },
    {
        title: 'Web Development with HTML & CSS',
        date: '2023-11-20',
        views: 2000
    },
    {
        title: 'Vue.js Crash Course',
        date: '2024-03-01',
        views: 1200
    },
    {
        title: 'Docker for Beginners',
        date: '2024-02-10',
        views: 2800
    },
    {
        title: 'GraphQL Introduction',
        date: '2024-01-20',
        views: 1700
    },
    {
        title: 'Angular Tutorial Series',
        date: '2023-12-05',
        views: 2300
    }
];

// Route to fetch sorted video data
route.get('/videos', (req, res) => {
    // Sort videos by date and then by views
    const sortedVideos = videos.sort((a, b) => {
        if (a.date === b.date) {
            return a.views - b.views; // Sort by views if dates are the same
        }
        return a.date.localeCompare(b.date); // Sort by date
    });

    res.json({ videos: sortedVideos });
});


export default route;