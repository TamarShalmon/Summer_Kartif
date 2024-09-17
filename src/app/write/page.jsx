
import WritePost from "@/components/writePost/WritePost";
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

const WritePage = async ({ params }) => {
  const { slug } = params;

  const session = await getAuthSession();

  if (!session) {
    redirect('/login');
  }

  if (!session?.user?.approved) {
    redirect("/pending-approval");;
  }


  const post = await getPost(slug);
  // console.log("slug:", slug)

  return (
    <div>
      <WritePost post={post} />
    </div>
  );
};

export default WritePage;

