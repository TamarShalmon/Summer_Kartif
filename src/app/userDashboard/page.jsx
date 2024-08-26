import { getAuthSession } from "@/utils/auth";
import UserPosts from "@/components/userPosts/UserPosts";
import { redirect } from 'next/navigation';

const UserDashboard = async ({ searchParams }) => {
    const session = await getAuthSession();
    
    if (!session) {
        redirect('/login'); // Redirect to login page if not authenticated
    }

    const page = parseInt(searchParams.page) || 1;

    return (
        <div>
            <UserPosts page={page} />
        </div>
    );
};

export default UserDashboard;