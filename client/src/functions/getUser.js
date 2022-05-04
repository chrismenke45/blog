function getUser() {//async function to get User data from api from google\
    //let apiUrl = 'http://localhost:9000' //process.env.developmentAPIurl
    let userObj = JSON.parse(localStorage.getItem('blogUser'));
    let jwt = localStorage.getItem('blogJWT');
    if (jwt && userObj) {
        let now = new Date()
        let expires = new Date(userObj.expiresIn)
        if (now.getTime() < expires.getTime()) {
            return [jwt, userObj, null]
        } else {
            localStorage.setItem('blogJWT', null);
            localStorage.setItem('blogUser', null);
            return [null, null, 'Expired Token']
        }
       
    } else {
        return [null, null, 'Not signed in']
    }
}
export default getUser;