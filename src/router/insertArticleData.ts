import e from "express";
import {create} from "../mongo/CRUDhandler";
import {ArticleScheme} from "../types";

const insertArticleData = e.Router()

insertArticleData.get('/', (req, res) => {
    const test: ArticleScheme = {
        title: 'testarticle',
        img_link: '',
        author: 'lychee',
        sentence: 'This is test article'
    }
    res.send('this is access router')

    create<ArticleScheme>(test).then((val) => {
        if(val){
            console.log('create successfully')
        }else{
            console.log('creating failed')
        }
    })




})

export default insertArticleData