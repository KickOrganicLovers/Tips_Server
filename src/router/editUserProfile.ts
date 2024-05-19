import e from "express";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import fs from "fs";
import {AWS_Info} from "../env";

const editUserProfile = e.Router()

editUserProfile.get('/', (req, res) => {
    console.log('fuck')
    const S3ClientInput = AWS_Info
    const client = new S3Client(S3ClientInput)

    const img = fs.readFileSync('public/img/girl.jpg')

    const input = {
        Bucket: 'tipsimgcontainer',
        Key: 'girl.jpg',
        Body: img,
        ContentType: 'image/jpeg'
    }

    const command = new PutObjectCommand(input)

    client.send(command)
        .then((val) => {
            console.log(val)
        })
        .catch((err) => {

        })
})

export default editUserProfile