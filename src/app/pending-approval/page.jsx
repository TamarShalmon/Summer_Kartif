"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PendingApprovalPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session.user.approved) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>טוען...</div>;
  }

  return (
    <div>
      <h1>ממתין לאישור</h1>
      <p>החשבון שלך נוצר בהצלחה ומחכה לאישור מנהל. אנא נסה להתחבר שוב מאוחר יותר.</p>
    </div>
  );
};

export default PendingApprovalPage;