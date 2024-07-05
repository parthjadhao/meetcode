import React from "react";

function SignInPage(params) {
    return <>
        <h1 style={{ color: "white" }}>Welcome to meetcode</h1>
        <h2 style={{ color: "white" }}>please register your account as a user to use our website</h2>
        <input style={{ color: "white" }} type="email" placeholder="enter your email" />
        <input style={{ color: "white" }} type="text" placeholder="enter your username" />
        <input style={{ color: "white" }} type="password" placeholder="enter your password" />
        <input style={{ color: "white" }} type="text" placeholder="enter you phone number" />
        <button style={{ color: "white" }}>SignIn</button>
    </>
}

export default SignInPage