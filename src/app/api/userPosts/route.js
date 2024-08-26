import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "לא מחובר!" }, { status: 401 })
    );
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const POST_PER_PAGE = 9;

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        where: {
          userEmail: session.user.email,
        },
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
      prisma.post.count({
        where: {
          userEmail: session.user.email,
        },
      }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    console.error("API Error:", err);  
    return new NextResponse(
      JSON.stringify({ message: "משהו השתבש!" }, { status: 500 })
    );
  }
};