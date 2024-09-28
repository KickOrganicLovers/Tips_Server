import e from "express";
import {read} from "../mongo/MongoController";
import {ArticleScheme} from "../types";

const getArticleData = e.Router()

getArticleData.get('/', (req, res) => {
    console.log('hello')
    read<ArticleScheme>().then((val) => {
        res.json(val)
    })
})

export default getArticleData