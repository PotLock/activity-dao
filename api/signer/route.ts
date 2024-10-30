import { NextResponse, NextRequest } from "next/server";
import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: "",
  app_fid: process.env.APP_FID as string,
  app_mnemonic: process.env.DEVELOPER_MNEMONIC,
});

export async function POST(req: NextRequest) {
  try {
    const { fid } = await req.json(); // Get FID from request body
    const res = await fdk.createSponsoredSigner();
    
    // Return both signer info and FID
    return NextResponse.json({
      ...res,
      fid: fid
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create signer" }, { status: 500 });
  }
}

// Add GET handler if needed
export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get('fid');
  if (!fid) {
    return NextResponse.json({ error: "FID is required" }, { status: 400 });
  }

  try {
    // Add your GET logic here
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch signer" }, { status: 500 });
  }
}
