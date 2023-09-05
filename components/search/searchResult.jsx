import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useRouter} from "next/router";
import { formatWideAddress } from '../../util/addresssUtils';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import styles from '../../styles/Navbar.module.css';
import Link from  '@mui/material/Link';


function SearchResult({loading, data, query, setQuery, setFocus}){
    const router = useRouter();
    if(loading){
        <CircularProgress/>
    }
    // if(!query){
    //     return
    // }
    if(query){
        return(
            <>
                <div>
                    <Paper elevation={3} sx={{overflow:"scroll", maxHeight:"200px", width:"500px"}}>
                        <List>
                        {data &&
                            data.searchUsers.map((user) => (
                                <React.Fragment key={user._id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar src={user.profile_pic}/>
                                    </ListItemAvatar>
                                    <ListItemText 
                                    primary={
                                        <Link className={styles.searchLink} onClick={()=>{
                                            setFocus(false);
                                            setQuery("");
                                            router.push("/");
                                        }} >
                                            <h3>{user.username}</h3>
                                        </Link>
                                    } 
                                    secondary={
                                        formatWideAddress(user.address)
                                        } />
                                </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </div>
            </>
        );
       
    }
    
}

export default SearchResult;