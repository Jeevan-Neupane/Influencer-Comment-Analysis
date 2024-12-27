import axios from 'axios';
export const getVideos = async (req, res) => {
    try {
        const videoId = req.params.videoId;

        console.log(videoId);
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${process.env.G_API_KEY}&channelId=${videoId}&part=snippet,id&order=date&maxResults=10`);
        console.log("response", response);

        const videos = response.data.items.map((item) => ({
            title: item.snippet.title,
            description: item.snippet.description,
            videoId: item.id.videoId,
            thumbnail:
                item.snippet.thumbnails.high?.url ||
                item.snippet.thumbnails.default.url,
        }));
        res.json(videos);
    } catch (error) {

        res.status(500).json({ error: 'Internal Server Error' });
    }
}