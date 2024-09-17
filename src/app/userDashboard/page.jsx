import { getAuthSession } from "@/utils/auth";
import UserPosts from "@/components/userPosts/UserPosts";
import { redirect } from 'next/navigation';

const UserDashboard = async ({ searchParams }) => {
    const session = await getAuthSession();
    
    if (!session) {
        redirect('/login'); // Redirect to login page if not authenticated
    }

    if (!session?.user?.approved) {
        redirect("/pendingApproval");;
      }

    const page = parseInt(searchParams.page) || 1;
    const { id } = searchParams;


    return (
        <div>
            <UserPosts page={page} id={id} />
        </div>
    );
};

export default UserDashboard;