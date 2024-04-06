import {MongoClient} from "mongodb";
import {ArticleScheme} from "../types";

const uri: string = 'mongodb+srv://lychee:0201@db0.gqsq0ec.mongodb.net/'
const def_dbName: string = 'lychee_db'
const def_collectionName: string = 'article_data'
export async function create<T>(data: T, dbName?: string, collectionName?: string, options?: object) : Promise<boolean> {
    if(!data) {
        console.log('put data on argument')
        return false
    }else {
        const D: string = !(dbName == undefined) ? dbName : def_dbName
        const C: string = !(collectionName == undefined) ? collectionName : def_collectionName

        const client = await MongoClient.connect(uri, options)
        const col = client.db(D).collection(C)
        const doc = await  col.insertOne(data)
        if(doc.acknowledged){
            return true
        }else{
            return false
        }
    }
}

export async function read(dbName?: string, collectionName?: string, options?: object) {
    const D: string = !(dbName == undefined) ? dbName : def_dbName
    const C: string = !(collectionName == undefined) ? collectionName : def_collectionName

    const client = await MongoClient.connect(uri, options)
    const col = client.db(D).collection<ArticleScheme>(C)
    const data: ArticleScheme[] = await col.find().toArray()
    console.log(data)
    return data
}