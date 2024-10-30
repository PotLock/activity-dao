import { NextResponse, NextRequest } from "next/server";
import { PinataFDK } from "pinata-fdk";

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT as string,
  pinata_gateway: "",
  app_fid: process.env.APP_FID as string,
  app_mnemonic: process.env.DEVELOPER_MNEMONIC,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get('fid');
    const signerId = searchParams.get('signerId');

    if (!fid || !signerId) {
      return NextResponse.json({ isValid: false });
    }

    // Verify the signer is still valid using Pinata FDK
    const signers = await fdk.getSigners();
    const isValid = signers.signers.some(signer => signer.id === Number(signerId) && signer.status === 'active');
    
    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Error verifying auth:', error);
    return NextResponse.json({ isValid: false });
  }
}
