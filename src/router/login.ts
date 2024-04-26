import e from "express";
import {read} from "../mongo/CRUDhandler";
import {UserScheme} from "../types";
import bcrypt from "bcrypt";

const login = e.Router()

login.post('/',(req, res) => {
    const saltRounds = 10
    if(req.body.email !== undefined){
        read<UserScheme>('lychee_db', 'user_data', {username: undefined, email: req.body.email, password: undefined})
            .then((val) => {
                if(val[0] !== undefined && val[0].password !== undefined){
                    if(bcrypt.compareSync(req.body.password, val[0].password)){
                        res.json({
                            isLoggedIn: true,
                            loginStatus: {
                                error: undefined,
                                username: val[0].username
                            }
                        })
                    }else{
                        res.json({
                            isLoggedIn: false,
                            loginStatus: {
                                error: 'password is not correct',
                                username: undefined
                            }
                        })
                    }
                }else {
                    res.json({
                        isLoggedIn: false,
                        loginStatus: {
                            error: 'user does not exist',
                            username: undefined
                        }
                    })
                }
        }).catch((err) => {
            throw err
        })
    }else{
        res.json({
            isLoggedIn: false,
            loginStatus: {
                error: 'enter your email address',
                username: undefined
            }
        })
    }

})

export default login