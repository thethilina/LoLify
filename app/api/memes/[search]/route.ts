import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Meme from "@/lib/models/meme";
import { request } from "http";
import mongoose from "mongoose";
import { Types } from "mongoose";

export const GET = async (request: Request, context: { params: any }) => {
  const searchText = context.params?.search;

  try {
    if (!searchText) {
      return new NextResponse(
        JSON.stringify({ message: "Search text shouldn't be empty" }),
        { status: 400 }
      );
    }

    await connect();

    const results = await Meme.find({
      $or: [
        { memetitle: { $regex: searchText, $options: "i" } },
        { taglines: { $regex: searchText, $options: "i" } },
      ],
    });

    if (!results || results.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No meme found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(results), { status: 200 });
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({ error: "Error searching memes", details: e.message }),
      { status: 500 }
    );
  }
};