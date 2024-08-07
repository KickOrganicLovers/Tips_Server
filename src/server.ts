import e from "express";
import insertArticleData from "./router/insertArticleData";
import getArticleData from "./router/getArticleData";
import login from "./router/login";
import cors from 'cors'
import signup from "./router/signup";
import editUserProfile from "./router/editUserProfile";

const server: e.Express = e()
const port: number = 5005

server.use(cors())

server.use(e.json())
server.use(e.urlencoded({extended: true}))

server.use('/insert', insertArticleData)
server.use('/get', getArticleData)
server.use('/login', login)
server.use('/signup', signup)
server.use('/editUserProfile', editUserProfile)
server.get('/', (req, res) => {
    res.send('Hello World!')
})

server.listen(port, () => {
    console.log('port' + port + 'で起動中')
})