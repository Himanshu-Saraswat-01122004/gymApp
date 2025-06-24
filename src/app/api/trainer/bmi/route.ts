import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import BMI from '@/models/BMI';

import UserModel from '@/models/User';

await dbConnect();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'TRAINER') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Add cache control headers
    const response = NextResponse.json({});
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

    // Get all users who have BMI data
    const users = await UserModel.find({});
    const usersBMIData: Array<{
      userId: string;
      name: string;
      bmiData: Array<{
        weight: number;
        timestamp: string;
        bmi: number;
        category: string;
      }>;
    }> = [];

    for (const user of users) {
      const bmiDoc = await BMI.findOne({ userId: user._id });
      if (bmiDoc && user.height) {
        const bmiEntries = bmiDoc.weightEntries.map((entry: { weight: number; timestamp: string }) => {
          const bmi = (entry.weight / ((user.height / 100) ** 2)).toFixed(3);
          const category = getBMICategory(parseFloat(bmi));
          return {
            weight: entry.weight,
            timestamp: entry.timestamp,
            bmi: parseFloat(bmi),
            category
          };
        });

        usersBMIData.push({
          userId: user._id.toString(),
          name: user.name,
          bmiData: bmiEntries
        });
      }
    }

    // console.log('Fetched BMI Data:', JSON.stringify(usersBMIData, null, 2));

    return NextResponse.json(usersBMIData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error fetching BMI data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch BMI data' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}
