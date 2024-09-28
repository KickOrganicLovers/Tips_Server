import {Document} from "mongodb";

export interface ArticleScheme extends Document{
    title?: string
    img_link?: string
    sentence?: string
    author?: string
}

export interface UserScheme extends Document{
    email?: string
    password?: string
    userNumber?: number
    username?: string
    profileImg?: string
    introduction?: string

}

export interface LoginScheme {
    isLoggedIn: boolean
    error?: string
    userStatus: UserScheme
}
