import React, {useState} from "react";
import axios from "axios";

const Login = ({ setUser }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const SubmitLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://www.spellcinema.com/api/users/login", {
                email: email,
                password: password
            })
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <div className="container">
            <h1 className="pt-4 text-center">Login</h1>
            <form className="pt-2 d-flex row align-items-center" onSubmit={SubmitLogin}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn violet btn-primary pt-2">Submit</button>
                <div className="pt-4 text-center text-primary"><a href="/register">or Register</a></div>
                {/* <div className="pt-4 text-center text-primary"><a href="#">Forgot your password?</a></div> */}
            </form>
        </div>
    )
};

export default Login;