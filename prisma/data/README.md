# Prisma Data Directory

This directory contains sample data files and seeding scripts for the SequoiaX investment platform.

## Files

### Sample Documents
- `sample.pdf` - Placeholder term sheet document for reference

### Logo Files
- `logo1.png` through `logo10.png` - Placeholder logo files for listings
- `logoStartup*.png` - Logo files for startup listings
- `logoToken*.png` - Logo files for token listings  
- `logoGame*.png` - Logo files for game listings
- `logoProperty*.png` - Logo files for property listings

### Seed Script
- `seed.ts` - Database seeding script that creates sample data

## File Upload Issues & Solutions

### Known Issues
1. **Missing Files**: Some logo files may be missing from the data directory
2. **Corrupted Files**: Some files may be corrupted or empty (less than 100 bytes)
3. **Supabase Configuration**: Upload failures may occur if Supabase is not properly configured

### Solutions Implemented
1. **Graceful Error Handling**: The seed script now checks for file existence and file size before attempting uploads
2. **Placeholder URLs**: When files are missing or corrupted, the script uses placeholder URLs instead of failing
3. **Better Error Messages**: More descriptive error messages help identify specific issues

### Generating Placeholder Files
If you need to regenerate placeholder PNG files, run:

```bash
node scripts/generate-placeholders.js
```

This will create valid PNG placeholder files for all missing/corrupted logo files.

## Usage

### Running the Seed Script

The seed script will:
1. **Upsert 12 investors** - Creates or updates 12 sample investor accounts
2. **Create 21 listings** across 4 verticals:
   - 5 Startup listings
   - 5 Token listings  
   - 5 Game listings
   - 6 Property listings

To run the seed script:

```bash
# Using npm
npm run db:seed

# Using pnpm
pnpm db:seed

# Using yarn
yarn db:seed

# Or directly with tsx
npx tsx prisma/data/seed.ts
```

### Environment Variables Required
For file uploads to work properly, ensure these environment variables are set:

```env
# Supabase Configuration (for file uploads)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your-supabase-anon-key"
SUPABASE_PUBLIC_URL="https://your-project.supabase.co"
```

If Supabase is not configured, the script will use placeholder URLs automatically.

### Sample Data Created

#### Investors (12)
- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)
- Mike Johnson (mike.johnson@example.com)
- Sarah Wilson (sarah.wilson@example.com)
- David Brown (david.brown@example.com)
- Emily Davis (emily.davis@example.com)
- James Wilson (james.wilson@example.com)
- Olivia Martinez (olivia.martinez@example.com)
- William Thompson (william.thompson@example.com)
- Sophia Rodriguez (sophia.rodriguez@example.com)
- Daniel Lee (daniel.lee@example.com)
- Ava Garcia (ava.garcia@example.com)

#### Startup Listings (5)
1. OpenAI - AI research and deployment company
2. Stripe - Financial services and payment processing
3. SpaceX - Aerospace manufacturer and space transportation
4. Palantir - Big data analytics and AI software
5. Airbnb - Online marketplace for lodging

#### Token Listings (5)
1. Bitcoin (BTC) - $45,000 per token
2. Ethereum (ETH) - $2,800 per token
3. Cardano (ADA) - $0.45 per token
4. Solana (SOL) - $95 per token
5. Polkadot (DOT) - $7.50 per token

#### Game Listings (5)
1. CD Projekt Red - Multi-platform ($5M)
2. Rockstar Games - Multi-platform ($8M)
3. FromSoftware - Multi-platform ($3M)
4. Valve Corporation - PC ($10M)
5. Epic Games - Multi-platform ($15M)

#### Property Listings (6)
1. Empire State Building - New York, NY ($2.5B)
2. Willis Tower - Chicago, IL ($1.5B)
3. One World Trade Center - New York, NY ($3.8B)
4. Transamerica Pyramid - San Francisco, CA ($800M)
5. John Hancock Center - Chicago, IL ($900M)
6. Chrysler Building - New York, NY ($1.2B)

## Notes

- All listings are created with `PENDING` status
- Each listing is assigned to one of the created investors as the owner
- The seed script uses upsert operations to avoid duplicate entries
- All monetary values are stored as Decimal types for precision
- If file uploads fail, placeholder URLs are used automatically 