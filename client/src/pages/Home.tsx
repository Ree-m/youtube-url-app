import { useEffect, useState } from "react"
interface Snippet{
  title:string,
  description:string
}
interface Video {
  id:string,
  snippet:Snippet
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
        console.log("uncut data", data)
        const video = await data.items[0]
        if (video) {
          video.userEmail = userEmail; // Add userEmail to video object
          videosArr.push(video);
          console.log("fetchVideInfo data", video);
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
          <h2>{video.snippet.title}</h2>
          <p>User Email: {video.userEmail}</p>
          <p>{video.snippet.description}</p>

          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />


        </div>
      ))}

    </div>
  )
}

export default Home