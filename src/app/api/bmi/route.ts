import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import BMI from '@/models/BMI';
import mongoose from 'mongoose';
import  UserModel  from '@/models/User';

await dbConnect();

export async function POST(request: Request) {
  try {
    const { weight } = await request.json();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = session.user.id;
    let bmiDoc = await BMI.findOne({ userId });

    if (!bmiDoc) {
      // Get user's height from User model
      const user = await UserModel.findById(userId);
      if (!user || !user.height) {
        return NextResponse.json({ error: 'User height not found' }, { status: 400 });
      }

      bmiDoc = new BMI({ userId, height: user.height });
    }

    // Add new weight entry with current timestamp
    bmiDoc.weightEntries.push({
      weight,
      timestamp: new Date()
    });
    await bmiDoc.save();

    return NextResponse.json({ message: 'Weight entry added successfully' });
  } catch (error) {
    console.error('Error adding weight entry:', error);
    return NextResponse.json({ error: 'Failed to add weight entry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const bmiDoc = await BMI.findOne({ userId }).sort({ timestamp: -1 });

    if (!bmiDoc) {
      return NextResponse.json({ error: 'No BMI data found' }, { status: 404 });
    }

    return NextResponse.json({ 
      height: bmiDoc.height,
      weightEntries: bmiDoc.weightEntries
    });
  } catch (error) {
    console.error('Error fetching BMI data:', error);
    return NextResponse.json({ error: 'Failed to fetch BMI data' }, { status: 500 });
  }
}
