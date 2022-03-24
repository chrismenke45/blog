
async function fetchPosts() {//async function to get Posts data from api\
    //let apiUrl = 'http://localhost:9000' //process.env.developmentAPIurl
    let apiUrl = process.env.REACT_APP_productionAPIurl || process.env.REACT_APP_developmentAPIurl
    const response = await fetch(`${apiUrl}/api/posts`);
    const posts = await response.json();
    return posts
  }
  export default fetchPosts;