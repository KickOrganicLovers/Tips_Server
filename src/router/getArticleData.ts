import e from "express";
import {read} from "../mongo/CRUDhandler";
import {ArticleScheme} from "../types";

const getArticleData = e.Router()

getArticleData.get('/', (req, res) => {
    read<ArticleScheme>().then((val) => {
        res.send(val[1].title)
    })
})

export default getArticleData