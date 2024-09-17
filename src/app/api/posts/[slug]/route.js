import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// DELETE a post
export const DELETE = async (req, { params }) => {
  const session = await getAuthSession();
  const { slug } = params;

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { comments: true },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }, { status: 404 })
      );
    }

    if (post.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authorized!" }, { status: 403 })
      );
    }

    // Delete all comments associated with the post
    await prisma.comment.deleteMany({
      where: { postSlug: slug },
    });

    // Now delete the post
    await prisma.post.delete({
      where: { slug },
    });
    router.refresh("/");

    return new NextResponse(JSON.stringify({ message: "Post Deleted!" }, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!", error: err.message }, { status: 500 })
    );
  }
};


// UPDATE a post
export const PUT = async (req, { params }) => {
  const session = await getAuthSession();
  const { slug } = params;

  if (!session) {
      return new NextResponse(
          JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
  }

  try {
      const body = await req.json();
      // console.log("Received body:", body); // Log the received data

      const { title, desc, catSlug, mainImage, additionalImages, region  } = body;

      const post = await prisma.post.findUnique({
          where: { slug },
          // include: { cat: true }, // Include the current category to get its image
          select: {
            userEmail: true,
            catSlug: true
          },
        });

      if (!post || post.userEmail !== session.user.email) {
          return new NextResponse(
              JSON.stringify({ message: "Not Authorized!" }, { status: 403 })
          );
      }

      let updatedMainImage = mainImage;

    // Check if the category was changed and no mainImage was provided
    if (catSlug && catSlug !== post.catSlug && !mainImage) {
      const newCategory = await prisma.category.findUnique({
        where: { slug: catSlug },
        select: { img: true },
      });

      if (newCategory && newCategory.img) {
        updatedMainImage = newCategory.img;
      }
    }

      const updatedPost = await prisma.post.update({
          where: { slug },
          data: {
              title,
              desc,
              catSlug,
              mainImage: updatedMainImage,
              additionalImages,
              region,
          },
      });

      return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
  } catch (err) {
      console.error("Server error:", err); // Detailed error logging
      return new NextResponse(
          JSON.stringify({ message: "Something went wrong!", error: err.message }, { status: 500 })
      );
  }
};