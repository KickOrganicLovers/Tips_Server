import e from "express";
import {read} from "../mongo/CRUDhandler";
import {ArticleScheme} from "../types";

const getArticleData = e.Router()

getArticleData.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000')
    read<ArticleScheme>().then((val) => {
        res.json(val)
    })
})

export default getArticleData