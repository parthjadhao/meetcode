import React from "react";

function LoginPage() {
    return <>
        <h1>Already have account</h1>
        <h3>please login as user to use our website</h3>
        <input
            style={{
                color: "white"
            }}
            type="text"
            placeholder="enter your username"
        />
        <input
            style={{
                color: "white"
            }}
            type="password"
            placeholder="enter your password"
        />
        <button style={{color: "white"}}>Login</button>
    </>
}
export default LoginPage