import React from "react"
// TODO: this page will only get open if token get expired
// add onClick on event Login button
// in onClick write a logic that automatically signin if token is present or valid
// if token is not valid and present than open this page
function AdminLoginPage() {

    const [username,setUsername]=React.useState({});
    const [password,setPassword]=React.useState({});

    async function adminLoginRequest() {
        //TODO: send todo to the login route and get token back
    }

    return <>
        <h1>Already have account</h1>
        <h3>please login as admin to use our website</h3>
        <input
            style={{
                color: "white"
            }}
            type="text"
            placeholder="enter your username"
            onChange={(event)=>{
                setUsername(event.target.value)
            }}
        />
        <input
            style={{
                color: "white"
            }}
            type="password"
            placeholder="enter your password"
            onChange={(event)=>{
                setPassword(event.target.value)
            }}
        />
        <button style={{color: "white"}} onClick={adminLoginRequest}>Login</button>
    </>
}
export default AdminLoginPage