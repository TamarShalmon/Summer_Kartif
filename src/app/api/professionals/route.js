import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export const GET = async () => {
    try {
        const professionals = await prisma.professionalList.findMany({
            select: {
                id: true,
                title: true
            }
        });

        return new NextResponse(JSON.stringify(professionals), { status: 200 });
    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), {
            status: 500,
        });
    }
};