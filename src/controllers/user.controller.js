import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js"
import { User } from '../models/user.model.js'
import {uploadOnCloudaniry} from '../utils/cloudinary.js'
import {ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req, res) => {

    // get user details from fronted 

    // validation - not empty 

    // check if user already exists  : username ,email 

    // check for images , check for avatar 
    // upload them to cloudinary , avatar 
    // save the image url in the database 
    // create user object - create entry in db  
    // remove passward and refresh token field from response  
    // check for user creation 
    // return res 


    const { fullName, username, email, passward } = req.body; // form se data lene ke liye 
    console.log(fullName, email, passward);


    if (
        [fullName, email, username, passward].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required ");
    }

    const existedUser = await User.findOne({
        $or: [{username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is requried");
    }

  const avatar =   await uploadOnCloudaniry(avatarLocalPath);
 const coverImage = await uploadOnCloudaniry(coverImageLocalPath);

if(!avatar){
    throw new ApiError(400,"Avatar file is requried");
}

const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage :coverImage?.url || "",
    email,
    passward,
    username,
})

 const createdUser = await User.findById(user._id).select(
    "-passward -refreshToken "
 )
 if(!createdUser){
    throw new ApiError(500,"Servor error");
 }

 return res.status(201).json(
    new ApiResponse(200 , createdUser,"User created successfully ")
 )


})

export { registerUser }