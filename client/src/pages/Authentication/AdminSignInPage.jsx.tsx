import React from "react"
import axios from "axios"

// TODO : use recoil for state management
// TODO : imporove the ui of the sigin Page
// TODO : convert it into tsx
// TODO : implement zod validation
function AdminSignInPage() {
    const [email, setEmail] = React.useState({});
    const [username, setUsername] = React.useState({});
    const [password, setPassword] = React.useState({});
    const [number, setNumber] = React.useState({});

    async function regiserAdminRequest() {
        const response = await axios.post("http://localhost:3000/admin/registerAdmin",{
            username: username,
            email: email,
            password: password,
            phoneNumber: number
        })
        console.log(response)
    }
    return <>
        <h1 style={{ color: "white" }}>Welcome to meetcode</h1>
        <h2 style={{ color: "white" }}>please register your account as a admin to use our website</h2>
        <input
            style={{ color: "white" }}
            type="email"
            placeholder="enter your email"
            onChange={(event) => {
                setEmail(event.target.value)
            }}
        />
        <input
            style={{ color: "white" }}
            type="text" placeholder="enter your username"
            onChange={(event) => {
                setUsername(event.target.value)
            }}
        />
        <input
            style={{ color: "white" }}
            type="password"
            placeholder="enter your password"
            onChange={(event) => {
                setPassword(event.target.value)
            }}
        />
        <input
            style={{ color: "white" }}
            type="text"
            placeholder="enter you phone number"
            onChange={(event) => {
                setNumber(event.target.value)
            }} 
        />
        <button style={{ color: "white" }} onClick={regiserAdminRequest}>SignIn</button>
    </>
}
export default AdminSignInPage;