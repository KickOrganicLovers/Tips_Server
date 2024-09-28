import e from "express";
import {read} from "../mongo/MongoController";
import {UserScheme} from "../types";
import bcrypt from "bcrypt";

const login = e.Router()

login.post('/',(req, res) => {
    const saltRounds = 10
    if(req.body.email !== undefined){
        read<UserScheme>({username: undefined, email: req.body.email, password: undefined},'lychee_db', 'user_data')
            .then((val) => {
                if(val[0] !== undefined && val[0].password !== undefined){
                    if(bcrypt.compareSync(req.body.password, val[0].password)){
                        res.json({
                            isLoggedIn: true,
                            errorMessage: undefined,
                            userStatus: {
                                userNumber: val[0].userNumber,
                                username: val[0].username,
                                profileImg: val[0].profileImg,
                                introduction: val[0].introduction
                            }
                        })
                    }else{
                        res.json({
                            isLoggedIn: false,
                            errorMessage: 'password is not correct',
                            userStatus: {
                                username: undefined
                            }
                        })
                    }
                }else {
                    res.json({
                        isLoggedIn: false,
                        errorMessage: 'user does not exist',
                        userStatus: {
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
            error: 'enter your email address',
            userStatus: {
                username: undefined
            }
        })
    }

})

export default login