import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../backend/lib/mongodb.js';

export async function GET() {
  try {
    const client = await clientPromise;
    
    const db = client.db('sample_mflix'); 
    
    const movies = await db.collection('movies').find({})
      .limit(10)
      .toArray();
    
    const movieCount = await db.collection('movies').countDocuments();
    
    return NextResponse.json({ 
      success: true, 
      movies: movies.map(movie => ({
        id: movie._id,
        title: movie.title,
        year: movie.year,
        plot: movie.plot,
        genres: movie.genres,
        runtime: movie.runtime,
        rated: movie.rated,
        poster: movie.poster
      })),
      totalCount: movieCount
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movies', details: error.message },
      { status: 500 }
    );
  }
}