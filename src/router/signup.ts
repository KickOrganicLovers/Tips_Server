import e from "express";
import {count, create, read} from "../mongo/MongoController";
import {UserScheme} from "../types";
import  bcrypt from 'bcrypt'

const signup = e.Router()

signup.post('/', (req, res) => {
    const data: UserScheme = {
        email: req.body.data.email,
        password: req.body.data.email,
        username: req.body.data.username,
        userNumber: undefined,
        profileImg: 'https://tipsimgcontainer.s3.ap-northeast-1.amazonaws.com/initial-profile.jpeg',
        introduction: undefined,
    }
    if(req.body.from === 'checkIfItAlreadyExists'){
        read<UserScheme>({username: data.username, email: data.email, password: data.password},'lychee_db', 'user_data')
            .then((val) => {
                res.json({isExists: val[0] !== undefined})
            })
    }else if(req.body.from === 'signup'){
        const saltRounds = 10
        data.password = bcrypt.hashSync(req.body.data.password, saltRounds)
        read<UserScheme>({username: data.username, email: undefined, password: undefined},'lychee_db', 'user_data', )
            .then((val0) => {
                if(val0[0] === undefined){
                    read<UserScheme>({username: undefined, email: data.email, password: undefined},'lychee_db', 'user_data')
                        .then((val1) => {
                            if(val1[0] === undefined){
                                count('lychee_db', 'user_data').then((val2) => {
                                    data.userNumber = ++val2
                                    create<UserScheme>(data, 'lychee_db', 'user_data')
                                        .then((val3) => {
                                            res.json({isInserted: val3})
                                        })

                                })
                            }
                        })
                }
            })
    }
})

export default signup