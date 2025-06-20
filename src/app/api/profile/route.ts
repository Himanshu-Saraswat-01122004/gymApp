import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

// GET handler to fetch user profile data
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ email: session.user.email }).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user.toObject(), { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH handler to update user profile data
export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await request.json();
    const { age, gender, height, weight, goals, benchPress, squat, deadlift } = body;

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          age: age ? Number(age) : undefined,
          gender,
          height: height ? Number(height) : undefined,
          weight: weight ? Number(weight) : undefined,
          goals,
          benchPress,
          squat,
          deadlift,
        },
      },
      { new: true, runValidators: true, select: '-password' } // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser.toObject() }, { status: 200 });
  } catch (error) {
    console.error('Error updating user profile:', error);
    // Check for validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
