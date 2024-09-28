import e from "express";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import fs from "fs";
import {AWS_Info} from "../env";
import {read, update} from "../mongo/MongoController";
import {Upload} from "@aws-sdk/lib-storage";

const editUserProfile = e.Router()

editUserProfile.post('/', (req, res) => {
    if(req.body.from === 'postImgToServer'){
        const userNumber = req.body.data.userNumber
        const imgAsBase64WithPrefix = req.body.data.img
        const imgAsBase64 = imgAsBase64WithPrefix.replace(/^data:image\/\w+;base64,/, '')
        const imgAsBuffer = Buffer.from(imgAsBase64, 'base64')
        const S3ClientInput = AWS_Info
        const client = new S3Client(S3ClientInput)



        const uploadFile = () => {

            const upload = new Upload({
                client: client,
                params: {
                    Bucket: 'tipsimgcontainer',
                    Key: userNumber + '-profile.jpeg',
                    Body: imgAsBuffer,
                    ContentType: 'image/jpeg'
                }
            })

            upload.on("httpUploadProgress", (progress) => {
                console.log(`Progress: ${progress.loaded}/${progress.total}`);
            });

            upload.done().then(() => {
                res.json({
                    imgUrl: `https://tipsimgcontainer.s3.${AWS_Info.region}.amazonaws.com/${userNumber + '-profile.jpeg'}?${new Date().toISOString()}`
                })
            })
        }


        const sendFile = () => {

            const input = {
                Bucket: 'tipsimgcontainer',
                Key: userNumber + '-profile.jpeg',
                Body: imgAsBuffer,
                ContentType: 'image/jpeg'
            }

            const command = new PutObjectCommand(input)

            client.send(command)
                .then((val) => {
                    console.log(val)
                    res.json({
                        imgUrl: `https://${input.Bucket}.s3.${AWS_Info.region}.amazonaws.com/${input.Key}`
                    })
                })
                .catch((err) => {
                    throw err
                })
        }


        uploadFile()






    }else if(req.body.from === 'postUserStatusToServer'){
        console.log('Hello from postUserStatusToServer')
        update({$set: req.body.data}, {userNumber: req.body.data.userNumber}, 'lychee_db', 'user_data', {}).then((val) => {
            console.log('Fuck from postUserStatusToServer')
            res.json({isUpdated: val})
        }).catch((e) => {
            console.log('Error from postUserStatusToServer' + e)
        })
    }
})

export default editUserProfile