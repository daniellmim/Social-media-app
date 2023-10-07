import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(e) {
        res.status(404).json({error: e});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends =friends.map(
            ({_id, firstname, lastname, occupation, location, picturePath}) => {
                return {_id, firstname, lastname, occupation, location, picturePath};
            }
        );
        res.status(200).send(formattedFriends);
    }catch(e) {
        res.status(404).json({error: e});
    }
}

// UPDATE
export const addRemoveFriends = async (req, res) =>{
    try {
        const {id, friendID} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendID);

        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter((id) => id !== friend.id);
            friend.friends = friend.friends.filter((id) => id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await friend.save();
        await user.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends =friends.map(
            ({_id, firstname, lastname, occupation, location, picturePath}) => {
                return {_id, firstname, lastname, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
        
    }catch(e) {

    }
}