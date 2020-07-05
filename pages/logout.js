import React,{useContext} from 'react'
import { AuthContext } from './_app';

function logout() {
    const userContext = useContext(AuthContext);
    useEffect(() => {
        userContext.setauthData(null);
        window.localStorage.removeItem('userData');
        
    }, [])
    return (
        <div>
            Successfully logout
        </div>
    )
}

export default logout
