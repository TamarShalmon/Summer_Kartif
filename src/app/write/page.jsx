import PostForm from "@/components/postForm/PostForm";
import { getAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";

const WritePage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect('/login');
  }

  if (!session?.user?.approved) {
    redirect("/pendingApproval");
  }

  return (
    <div>
      <PostForm mode="create" />
    </div>
  );
};

export default WritePage;