import PostForm from "@/components/postForm/PostForm";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const getPost = async (slug) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }
  return res.json();
};

const EditPage = async ({ params }) => {
  const { slug } = params;
  const session = await getAuthSession();

  if (!session) {
    redirect('/login');
  }

  if (!session?.user?.approved) {
    redirect("/pendingApproval");
  }

  const post = await getPost(slug);
  // console.log("slug:", slug)

  return (
    <div>
      <PostForm mode="edit" post={post} />
    </div>
  );
};

export default EditPage;