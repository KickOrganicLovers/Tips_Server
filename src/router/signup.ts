import e from "express";
import {create, read} from "../mongo/CRUDhandler";
import {UserScheme} from "../types";

const signup = e.Router()

signup.post('/', (req, res) => {
    const data: UserScheme = {
        username: req.body.data.username,
        email: req.body.data.email,
        password: req.body.data.password
    }
    if(req.body.from === 'checkIfItAlreadyExists'){
        read<UserScheme>('lychee_db', 'user_data', {username: data.username, email: data.email, password: data.password})
            .then((val) => {
                res.json({isExists: val[0] !== undefined})
            })
    }else if(req.body.from === 'signup'){
        read<UserScheme>('lychee_db', 'user_data', {username: data.username, email: undefined, password: undefined})
            .then((val0) => {
                if(val0[0] === undefined){
                    read<UserScheme>('lychee_db', 'user_data', {username: undefined, email: data.email, password: undefined})
                        .then((val1) => {
                            if(val1[0] === undefined){
                                create<UserScheme>(data, 'lychee_db', 'user_data')
                                    .then((val2) => {
                                        res.json({isInserted: val2})
                                    })
                            }
                        })
                }
            })
    }
})

export default signup