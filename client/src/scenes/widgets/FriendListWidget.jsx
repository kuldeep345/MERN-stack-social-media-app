import {Box, Typography, useTheme } from "@mui/material"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const FriendListWidget = ({ userId }) => {
   
    const { palette } = useTheme()
    const token = useSelector((state) => state.token)
    const data = useSelector((state) => state.user.friends)
    const [ friends , setFriends ] = useState([])

    const getFriends = async ()=>{
        const Allfriends = await Promise.all(data.map(async id => {
            const friend = await fetch(`http://localhost:3001/users/${id}`,{
                method:"GET",
                headers:{ Authorization:`Bearer ${token}` }
            })
            return friend.json() 
        }))
        setFriends(Allfriends)
    }

    useEffect(() => {
   getFriends()
    }, []) //eslint-disable-line react-hooks/exhaustive-deps    
   
    console.log(friends)
    return (
        <WidgetWrapper>
            <Typography 
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{mb:"1.5rem"}}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends?.map((friend)=>(
                    <Friend 
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    picturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )

}

export default FriendListWidget


