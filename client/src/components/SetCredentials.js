import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'




function SetCredentials(props) {
    let url = 'http://localhost:9000'
    function getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? decodeURI(value[1]) : null;
    }
let navigate = useNavigate()
    useEffect(() => {
        //let token = JSON.parse(localStorage.getItem('blogJWTcm'))
        //console.log(getCookie('jwt'))
        console.log('user', decodeURIComponent(getCookie('user')))
        localStorage.setItem('blogJWT', getCookie('jwt'))
        localStorage.setItem('blogUser', decodeURIComponent(getCookie('user')))
        navigate('/')
    }, []);
    return (
        <div>
            <h1> SetCred</h1>
            <Link to='/'><button>Home</button></Link>
        </div>
    );
}

export default SetCredentials;