import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET,
});


const uploadOnCloudaniry = async (localFilePath) =>{

try {
    if(!localFilePath) return null;
    // upload the file in cloudnary
const response =   await  cloudinary.uploader.upload(localFilePath , {
        resource_type:"auto"
    });
    // file has been uploaded successfully
    console.log('file uploaded on cloudnary',response.url);
    return response ;
    console.log(response)
} catch (error) {
    fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed 
    return null;
}


}

export {uploadOnCloudaniry}