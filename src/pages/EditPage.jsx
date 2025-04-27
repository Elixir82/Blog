import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import confservices from '../appwrite/config'
import { Container } from '../components';
import PostForm from '../components/PostForm'
function EditPage() {
  let [post, setPost] = useState({});
  let navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    let post = confservices.getPost(slug).then(() => {
      if (post) {
        setPost(post);
      } else navigate('/');
    })
  }, [slug, navigate])
  return post ? (<div>
    <Container>
      <PostForm post={post}/>
    </Container>
  </div>
  ) : null
}

export default EditPage