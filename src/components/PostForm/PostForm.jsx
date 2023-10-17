import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, RTE } from "../index";
import appwriteService from "../../../Appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const PostForm = ({ post }) => {
  const { register, handleSubmit, control, setValue, watch, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  console.log(post);
  const submit = async (data) => {
    // if post : means user wants to update the post
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post?.featuredImg);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImg: file ? file.$id : undefined,
        });

        if (dbPost) {
          toast.success("Updated..", {
            icon: "😉",
          });
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImg = fileId;

          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
            author: userData?.name || "Unknown",
          });

          if (dbPost) {
            toast.success("Uploaded..", {
              icon: "😎",
            });
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "")
        .replace(/\s/g, "-")
        .substring(0, 35);
    }
    return "";
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <Toaster />
      {userData && (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
          <div className="md:w-2/3 lg:w-2/3 px-2">
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
              // {post }
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="md:w-1/3 lg:w-1/3 px-2 mt-4">
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4 file-input w-full max-w-xs p-0"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFilePreview(post.featuredImg)}
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
            <Button
              type="submit"
              className="w-full"
              text={post ? "Update" : "Submit"}
            >
              {/* {post ? "Update" : "Submit"} */}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default PostForm;
