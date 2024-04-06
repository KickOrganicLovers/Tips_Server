import e from "express";
import insertArticleData from "./router/insertArticleData";
import getArticleData from "./router/getArticleData";

const server: e.Express = e()
const port: number = 5000

server.use('/insert', insertArticleData)
server.use('/get', getArticleData)

server.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
    res.send('Hello World!')
})

server.listen(port, () => {
    console.log('port' + port + 'で起動中')
})