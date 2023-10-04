import { useState, FormEvent, useContext } from "react"
import { UserContext } from "../contexts/UserContext";

const Share = () => {
  const [url, setUrl] = useState<string>("")
  const { user } = useContext(UserContext)
  const userId = user?.id
const email=user?.email

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!userId) {
      console.error("User ID is missing.");
      return;
    }

    const response = await fetch("http://localhost:5000/video/share", {
      method: "POST",
      body: JSON.stringify({  userId,email,url }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",

    })
    const data = await response.json()
    console.log("data", data,userId)
    setUrl("")
  }
  return (
    <div>
      <h1>Share a youtube movie</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <button>Share</button>
      </form>

    </div>
  )
}

export default Share