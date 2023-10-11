import{
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material"
import {Box, Typography, Divider, useTheme} from "@mui/material";
import UserImage from "components/UserImage"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper";
import { UseSelector } from "react-redux"
import { UseEffect, useState } from "react"
import {useNavigate } from "react-redux"

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelevtor((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`,
    {
      method: "GET",
      header:{ Authorization : `Bearer ${token}`},
    })
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  if(!user){
    return null;
  }

  const { 
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impression,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      
    </WidgetWrapper>
  )
  
}