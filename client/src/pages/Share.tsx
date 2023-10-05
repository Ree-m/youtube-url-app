import { useState, FormEvent, useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/share.module.css"
import { API_URL } from "../Constants";

const Share = () => {
  const [url, setUrl] = useState<string>("")
  const { user } = useContext(UserContext)
  const userId = user?.id
  const email = user?.email

  // On form submit, add url to db
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }

    const response = await fetch(`${API_URL}/video/share`, {
      method: "POST",
      body: JSON.stringify({ userId, email, url }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",

    })
    const data = await response.json()
    console.log("data", data, userId)
    setUrl("")
  }
  return (
    <div className={styles.share}>
      <h1>Share a YouTube video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">YouTube Url: </label>
          <input name="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className={styles.buttonContainer}>
          <button className="button">Share</button>
        </div>
      </form>

    </div>
  )
}

export default Share