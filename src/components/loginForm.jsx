import { useState } from "react";

export function LoginForm({onLogin}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        if (onLogin){
            onLogin({username,password});
        }
    };
        return (
            <table>
            <tbody>
                <tr>
                    <td>
                        
                        Username: {">"}
                        <input 
                        id="loginFormUsername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        />
                    </td>
                
                </tr>
                <tr>
                    <td>
                    Password: {">"}
                        <input
                        id="loginFormPassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        />
                    </td>
                </tr>
                <tr>
                <td>
                    <input type="button" id ="loginFormLoginButton" onClick={handleLogin} value = "login"/>
                </td>
                </tr>
            </tbody>
            </table>
        );
}