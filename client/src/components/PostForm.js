function PostForm() {
    return (
        <main>
            <form>
                <div className='formGroup'>
                <label forhtml='post_title'>Title:</label>
                <input type='text' name='post_title' placeholder="Title"></input>
                </div>
                <div className='formGroup'>
                <label forhtml='post_text'>Text:</label>
                <textarea name='post_text'>Text</textarea>
                </div>
                <div className='formGroup'>
                <label forhtml='img'>Image</label>
                <input type='file' name='img' accept='image/*'></input>
                </div>
            </form>
        </main>
    );
}

export default PostForm;