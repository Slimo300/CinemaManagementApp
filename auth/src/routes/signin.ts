import express, {Request, Response} from "express";
import { body } from "express-validator";

import { validateRequest } from "@spellcinema/lib";

import { User } from "../models/User";
import { Password } from "../services/Password";
import { TokenService } from "../services/Token";

const loginRouter = (TokenService: TokenService): express.Router => {
    const router = express.Router();

    router.post("/api/users/signin", [
        body("email").isEmail().withMessage("Provide valid email"),
        body("password").notEmpty().withMessage("Password cannot be blank"),
        validateRequest
    ], async (req: Request, res: Response) => {
    
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send({"err": "Email or password invalid"});
            return;
        }
    
        const passwordsMatch = await Password.compare(user.password, password);
        if (!passwordsMatch) {
            res.status(400).send({"err": "Email or password invalid"});
            return;
        }
    
        const { accessToken, refreshToken } = await TokenService.NewTokenPairForUser({
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            sameSite: "strict",
        });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            sameSite: "lax",
        })
    
        res.send({});
    });
    
    return router;
} 


export { loginRouter };