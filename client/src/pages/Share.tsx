import { useState, FormEvent, useContext } from "react"
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/share.module.css"
import { API_URL } from "../Constants";

const Share = () => {
  const [url, setUrl] = useState<string>("")
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)

  const { user } = useContext(UserContext)
  const userId = user?.id
  const email = user?.email


  // On form submit, check if url is valid and then add to db
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsFormSubmitted(true)


    // if url is valid, add to db
    if (url.startsWith("https://www.youtube.com")) {
      const response = await fetch(`${API_URL}/video/share`, {
        method: "POST",
        body: JSON.stringify({ userId, email, url }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",

      })
      const data = await response.json()
      console.log("data", data, userId)
      setIsUrlValid(true)
      setUrl("")

    } else {
      setIsFormSubmitted(true)

      setIsUrlValid(false)
      console.log("Url is not valid")

    }

  }

  return (
    <div className={styles.share}>
      <h1>Share a YouTube video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">YouTube Url: </label>
          <input name="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        {!isFormSubmitted ? <span></span>: isFormSubmitted && isUrlValid?  <span className={styles.green}>Success!</span>: <span className={styles.red}>Failed! The url is not valid.</span>}



        <div className={styles.buttonContainer}>
          <button className="button">Share</button>
        </div>
      </form>

    </div>
  )
}

export default Share