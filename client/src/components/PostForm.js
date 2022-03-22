function PostForm() {
    return (
        <main>
            <form>
                <label forhtml='post_title'>Title:</label>
                <input type='text' name='post_title' placeholder="Title"></input>
                <label forhtml='post_text'>Text:</label>
                <textarea name='post_text'>Text</textarea>
                <label forhtml='img'>Image</label>
                <input type='file' name='img' accept='image/*'></input>
            </form>
        </main>
    );
}

export default PostForm;