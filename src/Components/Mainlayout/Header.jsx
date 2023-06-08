import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { logout, searchUser } from '../../Redux/User/UserAction'
import { Avatar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { getUserfromLocalStorage } from '../../Utils/Utils'



const capitalizeTxt =(txt)=>{
    return txt.charAt(0).toUpperCase() + txt.slice(1); 
  }

function Sidenav() {
    const dispatch = useDispatch()
  const navigate = useNavigate()

  const [search,setSearch] = useState("")
  const currentUser = getUserfromLocalStorage

  const userState = useSelector(state => state.user)
  const { userSearch,isSearchSuccess} = userState

  const [userDetails,setUserDetails] = useState([])




  const fetchUsers = async(query)=>{
    await setSearch(capitalizeTxt(query))
    await dispatch(searchUser(query))
    if(isSearchSuccess){
      await setUserDetails(userSearch)
    }
  } 
  return (
    <header style={{
         height: search.length > 0
           ? "auto" : "50px"
      }}>
        <div className='searchbar' style={{marginLeft:'480px', marginTop:'10px'}}>
            <input className='search' placeholder='Search' type="text" value={search} onChange={(e)=>fetchUsers(e.target.value)} />

        {
          search.length > 0
          ?
          <ul className="collection">
            {
              currentUser && userDetails.length >0
              ?
              userDetails.map(item=>{
                return(
                  <Link key={item._id} to={"/profile/" + item._id}>
                    <li className="collection-item" onClick={()=>setSearch('')}>
                      <img src={item.pic} alt='profile' width="25px" height="25px" style={{ borderRadius: '50%' }}/>&nbsp;
                      {item.name}
                    </li>
                  </Link>
                )
              })
              :
              <p>User not found</p>
            }
          </ul>
          :

          null
        }
       
        </div>
    <div className='sidenav'>
        <Link to="/home">
        <img
            className="instagram_logo"
            src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
            alt="Instagram Logo"
            />
        </Link>
         

        <div className='nav_button'>
            <Link to="/home">
                <button className='side_button'>
                    <HomeIcon />
                    <span>Home</span>
                </button>
            </Link>
            
            <Link to='/home'>
                <button className='side_button'>
                    <SearchIcon />
                    <span>Search</span>
                </button>
            </Link>
            
            <Link to='/explore'>
                <button className='side_button'>
                    <ExploreIcon />
                    <span>Explore</span>
                </button>
            </Link>
            
            <Link to='/reels'>
                <button className='side_button'>
                    <SlideshowIcon />
                    <span>Reels</span>
                </button>
            </Link>
            
            <Link to='/Messages'>
                <button className='side_button'>
                    <ChatIcon />
                    <span>Messages</span>
                </button>
            </Link>
            
            <Link to='/Notifications'>
                <button className='side_button'>
                    <FavoriteBorderIcon />
                    <span>Notifications</span>
                </button>
            </Link>
            
            <Link to='/createPosts'>
                <button className='side_button'>
                    <AddCircleOutlineIcon />
                        <span>Create</span>
                </button>
            </Link>
            

        <div className="sidenav__more">
            <Link to="/Profile">
                <button className="side_button">
                    <Avatar style={{ marginRight: "10px" , width: '30px', height: '30px'  }}>
                    </Avatar>
                    <span className="sidenav__buttonText">Profile</span>
                </button>
            </Link>

            <Link to='/Login'>
                <button className="side_button">
                    <MenuIcon />
                    <span className="sidenav__buttonText" type='submit'
                    onClick={async()=>{
                        await dispatch(logout()); 
                        await navigate("/"); 
                        await window.location.reload(true)
                      }}
                    >Logout</span>
                </button>
            </Link>
            
        </div>
        <div className="sidenav__profile">
            
        </div>
        </div>

        
      
    </div>
    </header>
  )
}

export default Sidenav