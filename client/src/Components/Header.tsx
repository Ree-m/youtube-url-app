import { useState, useContext, FormEvent } from "react"
import { UserContext } from "./UserContext";
// import { initialUserState } from "./UserContext";
interface UserData {
    id: string,
    email: string
}
const Header = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    // const { user, setUser } = useContext(UserContext);
    const [user, setUser] = useState<UserData | null>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        })
        const data = await response.json()
        setUser(data)
        setEmail("")
        setPassword("")
        console.log("data", data)
        console.log("user", user)
    }
    const handleLogout = async () => {
        console.log("before logout", user)

        await fetch("http://localhost:5000/user/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        })
        setUser(null)
        console.log("logout", user)

    }
    if (!user) {
        return (
            <div>
                <h1>Funny Movies</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Login/Register</button>
                </form>

            </div>
        )
    }

    else {
        return (
            <div>
                <h1>Funny Movies</h1>
                <p>{user.email}</p>
                <p>haha</p>
                <button onClick={handleLogout}>Logout</button>

            </div>
        )
    }

}

export default Header