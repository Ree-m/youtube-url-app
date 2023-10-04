import { useState, FormEvent, useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const Header = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { user, setUser } = useContext(UserContext)



    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await fetch("http://localhost:5000/user/profile", {
                method: "GET",
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.log("error")
            }
        };

        fetchProfileData();
    }, []);

    const handleLogin = async (e: FormEvent) => {
        console.log("user first", user)

        e.preventDefault()
        const response = await fetch("http://localhost:5000/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        })
        if (response.ok) {
            const data = await response.json()
            setUser(data)
            setEmail("")
            setPassword("")
            console.log("data", data)
            console.log("user last", user)
        } else {
            console.log("error login")
            alert("Invalid login credentials.")

        }

    }

    const handleSignUp = async (e: FormEvent) => {
        console.log("user first", user)

        e.preventDefault()
        const response = await fetch("http://localhost:5000/user/add", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        })
        try {
            const data = await response.json()
            console.log("signup data", data)
            if (data.message == "User already exists.") {
                alert("User already exists")
            } else if (data) {
                setUser(data)
                setEmail("")
                setPassword("")
                console.log("data", data)
                console.log("user last", user)
            }

        } catch (error) {
            console.log("error signup")
            alert("Registeration failed.Try again later.")

        }


    }



const handleLogout = async () => {
    console.log("before logout", user)

    await fetch("http://localhost:5000/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",

    })
    setUser({ email: "", id: "" })
    console.log("logout", user)

}
if (user.id === "" && user.email === "") {
    return (
        <div>
            <Link to={"/"}><h1>Funny Movies</h1></Link>
            <form>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onClick={handleLogin}>Login</button>
                <button type="submit" onClick={handleSignUp}>Register</button>

            </form>

        </div>
    )
}

else {
    return (
        <div>
            <Link to={"/"}><h1>Funny Movies</h1></Link>
            <p>{user.email}</p>
            <button onClick={handleLogout}>Logout</button>
            <Link to={"/share"}>Share a movie</Link>

        </div>
    )
}

}

export default Header