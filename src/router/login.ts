import e from "express";

const login = e.Router()

login.post('/',(req, res) => {
    console.log('this is server')
    console.log(req.body)
    res.json({
        isLoggedIn: true,
        loginStatus: {
            error: '',
            username: 'Lychee'
        }
    })
})

export default login