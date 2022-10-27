import React,{useEffect, useState} from 'react'
import { useAuth, upload } from './firebase';

const Profile = () => {
    const currentUser = useAuth();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL,setPhotoURL] = useState('https://cdn-icons-png.flaticon.com/512/1160/1160040.png?w=740&t=st=1666002039~exp=1666002639~hmac=01b04354df76d7da1f5c38d4ef7c4022b1ffc920d67ccb9f9a927cab3476f713');

    function handleChange(e) {
        if (e.target.files[0]){
            setPhoto(e.target.files[0])
        }
    }
    function handleClick(){
        upload(photo, currentUser, setLoading);
    }

    useEffect(() => {
        if(currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    },[currentUser])    
    return (
    <div className='fields'>
        <input type='file' onChange={handleChange} />
        <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
        <img src={photoURL} alt='Avatar' className='avatar'/>
    </div>
  )
}

export default Profile