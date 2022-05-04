import {
    Link
} from "react-router-dom"

function Header(props) {
    const { setLoaded, user, setUser } = props

    const googleSignIn = () => {
        let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
        window.open((apiUrl + '/auth/google'), "_self")
    }
    const googelLogOut = () => {
        setUser(null);
        localStorage.setItem('blogUser', null);
        localStorage.setItem('blogJWT', null);
    }
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/' onClick={() => setLoaded(false)} className="link">
                        <h1>My Thoughts</h1>
                    </Link>

                </li>
                {(user && user[1] && user[1].admin) ? (
                    <li>
                        <Link to='/posts/create' onClick={() => setLoaded(false)} className="link">
                            <h1>Create Post</h1>
                        </Link>
                    </li>
                ) : (
                    null
                )}
                {(user && user[1] && user[1].admin) ? (
                    <li className="profileWrapper">
                        <img src={user[1].photo} alt="user" className="profilePicture"></img>
                
                        <h3>Welcome {user[1].firstName}!</h3>
                        <button onClick={googelLogOut}>Log Out</button>
                        
                    </li>
                ) : (
                    <li>
                        <button onClick={googleSignIn}>Sign In</button>
                    </li>
                )}

            </ul >
        </nav >
    );
}

export default Header;