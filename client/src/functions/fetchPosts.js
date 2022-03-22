//import 'dotenv/config'

async function fetchPosts() {//async function to get Posts data from api\
    let apiUrl = 'http://localhost:9000' //process.env.developmentAPIurl
    const response = await fetch(`${apiUrl}/api/posts`);
    const posts = await response.json();
    return posts.post_list
  }
  export default fetchPosts;