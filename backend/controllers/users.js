import User from "../models/User.js"

export const getUser = async(req,res)=>{
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getUserFriends = async(req,res)=>{
    try {
        const { id } = req.params
        const user = await User.findById(id)
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation , location , picturePath })=>{
                return { _id , firstName , lastName , occupation , location , picturePath }
            }
        );
        res.status(200).json(formattedFriends)
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

// UPDATE
export const addRemoveFriend = async(req,res)=>{
    try {
        const { id , friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        }
        else{
            await user.friends.push(friendId)
            await friend.friends.push(id)
        }

        await user.save();
        await friend.save()

    } catch (error) {
        res.status(404).json({message:error.message})
    }
}