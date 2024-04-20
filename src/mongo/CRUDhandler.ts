import {MongoClient, WithId, Collection, InsertOneResult, OptionalUnlessRequiredId} from "mongodb";
import {Document} from "mongodb";

const uri: string = 'mongodb+srv://lychee:0201@db0.gqsq0ec.mongodb.net/'
const def_dbName: string = 'lychee_db'
const def_collectionName: string = 'article_data'
export async function create<T extends Document>(data: T, dbName?: string, collectionName?: string, options?: object) : Promise<boolean> {
    if(!data) {
        console.log('put data on argument')
        return false
    }else {
        const D: string = !(dbName == undefined) ? dbName : def_dbName
        const C: string = !(collectionName == undefined) ? collectionName : def_collectionName

        const client: MongoClient = await MongoClient.connect(uri, options)
        const col: Collection<T> = client.db(D).collection<T>(C)
        const doc: InsertOneResult<T> = await  col.insertOne(data as OptionalUnlessRequiredId<T>)
        return doc.acknowledged;
    }
}

export async function read<T extends Document>(dbName?: string, collectionName?: string,  search_req?: T, options?: object) {
    const D: string = !(dbName == undefined) ? dbName : def_dbName
    const C: string = !(collectionName == undefined) ? collectionName : def_collectionName
    const search_condition: any = {};

    if (search_req !== undefined) {
        for (const key in search_req) {
            if (search_req[key] !== undefined) {
                search_condition[key] = search_req[key];
            }
        }
    }


    const client: MongoClient = await MongoClient.connect(uri, options)
    const col: Collection<T> = client.db(D).collection<T>(C)
    const data: WithId<T>[] = await col.find<WithId<T>>(search_condition).toArray()
    console.log(data)
    console.log(typeof data)
    return data
}