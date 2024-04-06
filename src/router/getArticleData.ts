import e from "express";
import {read} from "../mongo/CRUDhandler";

const getArticleData = e.Router()

getArticleData.get('/', (req, res) => {
    read().then((val) => {
        res.send(val[1].title)
    })
})

export default getArticleData