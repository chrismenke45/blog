import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function PostForm(props) {
    //const { post } = props
    const { post, loaded, getPost, setLoaded, title, user } = props
    const [postInfo, setPostInfo] = useState(
        {
            post_title: '',
            post_text: '',
            img: null,
        }
    )
    let navigate = useNavigate()

    const { id } = useParams()



    useEffect(() => {
        if (!(user && user[1] && user[1].admin)) {
            navigate('/', { replace: true })
        }
        if (title === "Update Post") {
            getPost(id)
        } else {
            setPostInfo({
                post_title: '',
                post_text: '',
            })
            setLoaded(true)
        }
    }, [loaded]);

    useEffect(() => {
        setPostInfo({
            post_title: (post ? post.post_title : ''),
            post_text: (post ? post.post_text : ''),
        })
    }, [post]);

    const handleTitleChange = (e) => {
        setPostInfo({ ...postInfo, post_title: e.target.value })
    }

    const handleTextChange = (e) => {
        setPostInfo({ ...postInfo, post_text: e.target.value })
    }

    
    const submitHandler = (e) => {
        e.preventDefault();
        //e.target.reset();

        let url = process.env.REACT_APP_developmentAPIurl + (title === "Update Post" ? '/api/posts/' + id.toString() + '/update' : '/api/posts/create')
        //
        let formData = new FormData()
        //let formData = new URLSearchParams()
        formData.append('post_text', postInfo.post_text)
        formData.append('post_title', postInfo.post_title)
        if (postInfo.img !== null) {
            formData.append('img', postInfo.img)
        }
        const options = {
            method: (title === "Update Post" ? 'PUT' :'POST'),
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `bearer ${(user ? user[0] : null)}`
            }
        };
        delete options.headers['Content-Type'];
        fetch(url, options)
            .then(() => {
                navigate('/', { replace: true })
            })
            .catch(error => {
                console.error('Error:', error)
            })
        navigate('/', { replace: true })

    }
    return (
        <main className='mainInfo'>
            <h1>{title}</h1>
            {!loaded ? <div className="spin"></div> : (
                <form onSubmit={submitHandler}className='postDisplay'>
                    <div className='formGroup'>
                        <label forhtml='post_title'>Title:</label>
                        <input type='text' name='post_title' value={postInfo.post_title} onChange={e => handleTitleChange(e)} placeholder="Title"></input>
                    </div>
                    <div className='formGroup'>
                        <label forhtml='post_text'>Text:</label>
                        <textarea name='post_text' value={postInfo.post_text} onChange={e => handleTextChange(e)}></textarea>
                    </div>
                    <div className='formGroup'>
                        {title === "Update Post" ? (
                            <label forhtml='img'>Replace Old Image:</label>
                        ) : (
                            <label forhtml='img'>Image:</label>
                        )}
                        <input type='file' name='img' onChange={e => setPostInfo({ ...postInfo, img: e.target.files[0] })} accept='image/*'></input>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            )
            }
        </main>
    );
}

export default PostForm;