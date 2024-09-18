import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  // console.log("postSlug:", postSlug);

  try {
    // console.log("Fetching comments for postSlug:", postSlug);
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    // console.log("Prisma query result:", comments);
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    console.error("Error fetching comments:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!", error: err.message }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    // console.log("Received body:", body); // Log

    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });

    // console.log("Comment created:", comment); // Log
    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    // console.log("Error creating comment:", err); // Log
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// DELETE A COMMENT
export const DELETE = async (req) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("id");

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found!" }, { status: 404 })
      );
    }

    if (comment.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authorized!" }, { status: 403 })
      );
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Comment has been deleted" }, { status: 200 })
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};