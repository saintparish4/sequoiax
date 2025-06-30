# Database Seeding

This directory contains the database seeding script that populates the database with sample data.

## Prerequisites

Before running the seed script, make sure you have the following environment variables set in your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/sequoiax"

# Supabase Configuration (for file uploads)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your-supabase-anon-key"
SUPABASE_PUBLIC_URL="https://your-project.supabase.co"
```

## Running the Seed Script

To run the seed script:

```bash
npm run db:seed
# or
npx tsx prisma/seed.ts
```

## What the Seed Script Does

1. Creates 12 sample users with the INVESTOR role
2. Creates 5 sample startups with logos and documents uploaded to Supabase
3. Creates 5 sample tokens with logos and documents uploaded to Supabase
4. Creates 5 sample games with logos and documents uploaded to Supabase
5. Creates 6 sample properties with logos and documents uploaded to Supabase

## File Structure

The seed script expects the following files in the `data/` directory:

- `logoStartup*.png` - Logo files for startups
- `logoToken*.png` - Logo files for tokens
- `logoGame*.png` - Logo files for games
- `logoProperty*.png` - Logo files for properties
- `sample.pdf` - Sample document file

If any files are missing, the script will use placeholder URLs instead. 