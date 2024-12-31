import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
      const regions = await prisma.regionList.findMany({
        select: {
          id: true,
          title: true
        }
      });
      
      return new NextResponse(JSON.stringify(regions), { status: 200 });
    } catch (err) {
      console.error(err);
      return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), {
        status: 500,
      });
    }
  };