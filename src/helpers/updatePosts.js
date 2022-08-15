

const update = () => {
    contentService.getAllPosts()
        .then(res => {
            setPosts(res);
        })
        .catch(err => {
            // console.error(err);
        })
}