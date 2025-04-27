import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import confservices from '../appwrite/config'
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    // console.log(slug);
    const navigate = useNavigate();

    const userData = useSelector(state => state.auth.userdata);

    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        if (post && userData) {
            setIsAuthor(post.userId === userData.$id);
        }
        console.log("UserData in:", userData);
    }, [post, userData]);

    // console.log(userData.$id)

    useEffect(() => {
        if (slug) {
            // console.log(slug);
            confservices.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);
    const state = useSelector(state => state);
    console.log("Full Redux State:", state);
    useEffect(() => {
        console.log("Post useEffect fired");
        console.log("UserData:", userData);
        console.log("Post:", post);
        if (userData && post) {
            console.log("userData.$id:", userData.$id);
            console.log("post.userId:", post.userId);
            console.log("isAuthor result:", post.userId === userData.$id);
        }
    }, [post, userData]);


    const deletePost = () => {
        confservices.deletePost(post.$id).then((status) => {
            if (status) {
                confservices.deleteFile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {/* {"This console before image"} */}
                    <img
                        src={confservices.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {/* { "This console after image"} */}

                </div>
                <div>
                    {isAuthor && (
                        <div className="absolute right-6 top-6">

                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}