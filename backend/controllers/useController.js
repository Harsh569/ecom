import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/userModel.js'
import generateToken from "../utils/generateToken.js";
//auth user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 10*24*60*60*1000
        })
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token,
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

//registers user
const registerUser = asyncHandler(async (req, res)=>{
    const { name, email, password } = req.body
    const userExist = await User.findOne({email})
    console.log(userExist)
    if (userExist)
        {
            res.status(400).json("user already exist")
            throw new Error("User Already Exist")
        }
    const user = await User.create({
        name,
        email,
        password
    })

    if(user)
        {
            generateToken(res, user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        }
        else{
            res.status(400).json("Invalid user Data")
            throw new Error("Invalid user Data")
        }
})


//logout user
const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwt','', {
        httpOnly:true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: 'Logged Out successfully'
    })
})

//get user profile
const getUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findOne(req.user._id)
    if (user)
        {
            res.status(200).json({
                _id: user._id,
                name:user.name,
                email: user.email,
                isAdmin:user.isAdmin
            })
        }
        else{
            res.status(400).json("User not Found")
            throw new Error("User not Found")
        }

})


//update user profile
const updateUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findOne(req.user._id)

    if (user)
        {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if(req.body.password)
                {
                    user.password = req.body.password
                }
                const updatedUser = await User.save()
                res.status(200).json({
                    _id:updateUser._id,
                    name: updateUser.name,
                    email:updateUser.email,
                    isAdmin: updateUser.isAdmin,

                })
        }
        else{
            res.status(404).json("User not Found")
            throw new Error("User not Found")
        }
})


//get users
const getUsers = asyncHandler(async (req, res)=>{
    res.send('get users')
})


//delete user
const deleteUser = asyncHandler(async (req, res)=>{
    res.send('delete user')
})


//get users by ID
const getUsersByID = asyncHandler(async (req, res)=>{
    res.send('get users by ID')
})


//update users
const updateUser = asyncHandler(async (req, res)=>{
    res.send('update users')
})

export {
    authUser,registerUser,logoutUser,getUserProfile,getUsers, deleteUser, getUsersByID, updateUser,updateUserProfile
}