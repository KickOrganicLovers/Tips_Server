import {Document} from "mongodb";

export interface ArticleScheme extends Document{
    title?: string
    img_link?: string
    sentence?: string
    author?: string
}

export interface UserScheme extends Document{
    username?: string
    email?: string
    password?: string
}

export interface LoginScheme {
    isLoggedIn?: boolean
    loginStatus?: {
        err?: string
        username?: string
    }
}