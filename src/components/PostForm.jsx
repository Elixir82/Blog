import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import confservices from '../appwrite/config'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import RTE from './RTE'
import Button from './Button'
import Select from './Select'
function PostForm({ post }) {
  let { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  let navigate = useNavigate();
  let userdata = useSelector((state) => (state.auth.userdata));
  // console.log(userdata);
  let submit = async (data) => {
    console.log(data.image[0]);
    if (post) {
      let file = data.image[0] ? await confservices.uplaodFile(data.image[0]) : null;
      if (file) {
        await confservices.deleteFile(post.featuredimage);
      }

      let dbpost = await confservices.updatePost(post.$id, { ...data, featuredimage: file ? file.$id : undefined });

      if (dbpost) {
        navigate(`/post/${dbpost.$id}`)
      }
    } else {
      let file = await confservices.uplaodFile(data.image[0]);
      // console.log(userdata);
      if (file) {
        const fileed = file.$id;
        data.featuredimage = fileed;
        let newpost = await confservices.createPost({ ...data, userId: userdata.$id })
        if (newpost) {
          navigate(`post/${newpost.$id}`)
        }
      }
      
    }
  }

  let slugtransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return '';
  })

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugtransform(value.title,{shouldValidate: true}));
      }
    })

    return (() => {
      subscription.unsubscribe();
    })
  }, [watch, slugtransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugtransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredimage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
    </form>
  )
}

export default PostForm