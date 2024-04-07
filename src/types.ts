import {Document} from "mongodb";

export interface ArticleScheme extends Document{
    title: string
    img_link: string
    sentence: string
    author: string
}