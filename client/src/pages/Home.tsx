import { useEffect, useState } from "react"

interface Video {
  title: string;
  description: string;
  userEmail: string;
}

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([])

  // On component mount, fetch the video urls from the db
  useEffect(() => {
    const fetchVideosUrls = async () => {
      const response = await fetch("http://localhost:5000/video")

      const data = await response.json()
      console.log("videoUrls data", data)

      const videoUrls = data.map((video: { url: string }) => video.url)
      const userEmails = data.map((video: { email: string }) => video.email);

      console.log("videoUrls", videoUrls)

      const videoInfo = await fetchVideosInfo(videoUrls, userEmails);
      setVideos(videoInfo)
      console.log("videos in fetchVideoUrl func", videos)

    }
    fetchVideosUrls()
  }, [])
  const fetchVideosInfo = async (videoUrls: string[], userEmails: string[]) => {
    // YouTube Data API key
    const apiKey = "";

    const videosArr: Video[] = [];


    // Function to make a GET request to the YouTube API
    const fetchVideoInfo = async (url: string, userEmail: string) => {
      try {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : '';
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

        const response = await fetch(apiUrl);
        const data = await response.json()
        const video = await data.items[0]?.snippet
        if (video) {
          video.userEmail = userEmail; // Add userEmail to video object
          videosArr.push(video);
          console.log("fetchVideInfo data", video.title);
          console.log("fetchVideInfo videoarr", videosArr)
        }

      } catch (error) {
        console.error('Error fetching video info:', error);
      }
    };

    // 
    // Use Promise.all to wait for all asynchronous fetchVideoInfo calls to complete, then Loop through video URLs and fetch video info
    await Promise.all(videoUrls.map(async (url, index) => {
      await fetchVideoInfo(url, userEmails[index]);
    }));

    return videosArr
  };

  console.log("end videos", videos)

  return (
    <div>
      <h1>Home</h1>
      {videos && videos.map((video, index) => (
        <div key={index}>
          <h2>{video.title}</h2>
          <p>User Email: {video.userEmail}</p>
          <p>{video.description}</p>

        </div>
      ))}

    </div>
  )
}

export default Home