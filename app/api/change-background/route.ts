import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const POST = async (req: NextRequest) => {
    try {
        const { foregroundPath, backgroundPath } = await req.json();

        // Resolve background path
        const resolvedBackgroundPath = path.join(process.cwd(), 'public', backgroundPath);

        // Convert the base64 foreground image to a buffer
        const foregroundBuffer = Buffer.from(foregroundPath, 'base64');
        const foreground = sharp(foregroundBuffer);

        // Get the metadata (width, height) of the foreground image
        const { width, height } = await foreground.metadata();

        // Load and resize the background image to match the foreground's dimensions
        const background = sharp(resolvedBackgroundPath);
        const resizedBackground = await background.resize(width!, height!).toBuffer();

        // Composite the foreground and resized background
        const processedImageBuffer = await sharp(resizedBackground)
            .composite([{ input: foregroundBuffer, blend: 'over' }]) // Overlay foreground over the resized background
            .toBuffer();

        // Generate a unique name for the resulting image
        const uniqueName = `${uuidv4()}.png`;

        // Return the final processed image as a response
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
