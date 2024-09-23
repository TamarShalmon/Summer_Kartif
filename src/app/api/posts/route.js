import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");
  const region = searchParams.get("region");


  const POST_PER_PAGE = 9;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
      ...(region && { region }),

    },
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
  };


  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};




// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const slug = uuidv4(); // Generate a unique ID for the slug  

    // Fetch the category image if the main image is not provided
    let mainImage = body.mainImage;

    if (!mainImage) {
      const category = await prisma.category.findUnique({
        where: {
          slug: body.catSlug
        },
        select: {
          img: true
        }
      });

      mainImage = category?.img || null;
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        ...body,
        slug,
        userEmail: session.user.email,
        mainImage: mainImage,
        additionalImages: body.additionalImages || [],
        entryFee: body.entryFee || null,
        parking: body.parking || null,
        shadedSeating: body.shadedSeating || null,
        waterDepth: body.waterDepth || null,
        recommendedGear: body.recommendedGear || null,
        difficulty: body.difficulty || null,
        duration: body.duration || null,
        season: body.season || null,
      },
    });

    revalidatePath("/");
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};