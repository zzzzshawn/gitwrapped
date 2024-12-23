import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req: NextRequest) => {
    try {
        const { foregroundPath } = await req.json();  // Only take the foreground path

        // Convert the base64 encoded foreground into a buffer
        const foregroundBuffer = Buffer.from(foregroundPath, 'base64');
        const foreground = sharp(foregroundBuffer);

        // Get the metadata of the foreground (width and height)
        const { width, height } = await foreground.metadata();
        console.log(width, height);  // Log the width and height of the foreground image

        // Process the foreground image (no background, no padding)
        const processedImageBuffer = await foreground
            .resize(width, height) // You can resize if needed, or just pass the original dimensions
            .toBuffer();

        // Generate a unique name for the output image
        const uniqueName = `${uuidv4()}.png`;

        // Return the processed image as a downloadable file
        return new NextResponse(processedImageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename=${uniqueName}`,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
    }
};
