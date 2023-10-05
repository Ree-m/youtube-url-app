import { useState, FormEvent, useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import styles from "../styles/header.module.css"
import { API_URL } from "../Constants";

const Header = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { user, setUser } = useContext(UserContext)
    const [toggelMenu, setToggleMenu] = useState<boolean>(false)

    console.log("api url", API_URL)
    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await fetch(`${API_URL}/user/profile`, {
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
        const response = await fetch(`${API_URL}/user/login`, {
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
        const response = await fetch(`${API_URL}/user/add`, {
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

        await fetch(`${API_URL}/user/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",

        })
        setUser({ email: "", id: "" })
        console.log("logout", user)

    }
    if (user.id === "" && user.email === "") {
        return (
            <div className={styles.header}>
                <div className={styles.logo}>
                    <i><AiFillHome /></i>
                    <Link to={"/"}><h1>Funny Movies</h1></Link>
                </div>
                <form className={styles.form}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={handleLogin} className="button">Login</button>
                    <button type="submit" onClick={handleSignUp} className="button">Register</button>

                </form>
                <i className={styles.menuIcon} onClick={() => setToggleMenu(!toggelMenu)}><AiOutlineMenu /></i>
                {toggelMenu && <div className={styles.mobileMenu}>
                    <form>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" onClick={handleLogin} className="button">Login</button>
                        <button type="submit" onClick={handleSignUp} className="button">Register</button>

                    </form>
                </div>}


            </div>
        )
    }

    else {
        return (
            <div className={styles.headerLoggedIn}>

                <div className={styles.logo}>
                    <i><AiFillHome /></i>
                    <Link to={"/"}><h1>Funny Movies</h1></Link>
                </div>

                <div className={styles.nav}>
                    <Link to={"/share"} className="button">Share a movie</Link>
                    <button onClick={handleLogout} className="button">{`Logout ${user.email}`}</button>

                </div>




            </div>
        )
    }

}

export default Header