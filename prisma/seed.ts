import { PrismaClient, Prisma } from '../app/generated/prisma'
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient()
// Initialize Supabase client only if environment variables are available
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_KEY 
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  : null;

async function uploadAsset(fileName: string) {
  try {
    // If Supabase is not configured, use placeholder URL
    if (!supabase) {
      console.log(`ℹ️ Supabase not configured, using placeholder URL for ${fileName}`);
      return `https://via.placeholder.com/150x150?text=${encodeURIComponent(fileName)}`;
    }

    const filePath = path.resolve(__dirname, "data", fileName);
    
    // Check if file exists before trying to read it
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Warning: File ${fileName} does not exist, using placeholder URL`);
      return `https://via.placeholder.com/150x150?text=${encodeURIComponent(fileName)}`;
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    
    // Check if file is empty or too small (likely corrupted)
    if (fileBuffer.length < 100) {
      console.warn(`⚠️ Warning: File ${fileName} appears to be corrupted or empty (${fileBuffer.length} bytes), using placeholder URL`);
      return `https://via.placeholder.com/150x150?text=${encodeURIComponent(fileName)}`;
    }
    
    const { data, error } = await supabase
      .storage
      .from("public-assets")
      .upload(fileName, fileBuffer, { upsert: true });
    if (error) throw error;
    return `${process.env.SUPABASE_PUBLIC_URL}/public-assets/${data.path}`;
  } catch (error) {
    console.warn(`⚠️ Warning: Could not upload ${fileName}: ${error}, using placeholder URL`);
    return `https://via.placeholder.com/150x150?text=${encodeURIComponent(fileName)}`;
  }
}

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'Olivia Martinez',
    email: 'olivia.martinez@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'William Thompson',
    email: 'william.thompson@example.com',
    role: 'INVESTOR'
  }, 
  {
    name: 'Sophia Rodriguez',
    email: 'sophia.rodriguez@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'Daniel Lee',
    email: 'daniel.lee@example.com',
    role: 'INVESTOR'
  },
  {
    name: 'Ava Garcia',
    email: 'ava.garcia@example.com',
    role: 'INVESTOR'
  },
];

const startupData: Omit<Prisma.StartupCreateInput, 'owner'>[] = [
  {
    name: 'OpenAI',
    description: 'AI research and deployment company focused on developing safe artificial general intelligence',
    website: 'https://openai.com',
    targetAmount: 5000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'Stripe',
    description: 'Financial services and software as a service company that provides payment processing software',
    website: 'https://stripe.com',
    targetAmount: 3000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  }, 
  {
    name: 'SpaceX',
    description: 'Aerospace manufacturer and space transportation services company',
    website: 'https://spacex.com',
    targetAmount: 10000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'Palantir',
    description: 'Software company that specializes in big data analytics and artificial intelligence',
    website: 'https://palantir.com',
    targetAmount: 4000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'Airbnb',
    description: 'Online marketplace for lodging, primarily homestays for vacation rentals',
    website: 'https://airbnb.com',
    targetAmount: 2500000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
];

const tokenData: Omit<Prisma.TokenCreateInput, 'owner'>[] = [
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    supply: BigInt(21000000),
    price: 45000.00,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    supply: BigInt(120000000),
    price: 2800.00,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },  
  {
    name: 'Cardano',
    ticker: 'ADA',
    supply: BigInt(45000000000),
    price: 0.45,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },  
  {
    name: 'Solana',
    ticker: 'SOL',
    supply: BigInt(500000000),
    price: 95.00,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  }, 
  {
    name: 'Polkadot',
    ticker: 'DOT',
    supply: BigInt(1000000000),
    price: 7.50,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
];

const gameData: Omit<Prisma.GameCreateInput, 'owner'>[] = [
  {
    title: 'CD Projekt Red',
    platform: 'Multi-platform',
    price: 5000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    title: 'Rockstar Games',
    platform: 'Multi-platform',
    price: 8000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    title: 'FromSoftware',
    platform: 'Multi-platform',
    price: 3000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    title: 'Valve Corporation',
    platform: 'PC',
    price: 10000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    title: 'Epic Games',
    platform: 'Multi-platform',
    price: 15000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
];

const propertyData: Omit<Prisma.PropertyCreateInput, 'owner'>[] = [
  {
    name: 'Empire State Building',
    location: 'New York, NY',
    price: 2500000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'Willis Tower',
    location: 'Chicago, IL',
    price: 1500000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'One World Trade Center',
    location: 'New York, NY',
    price: 3800000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },  
  {
    name: 'Transamerica Pyramid',
    location: 'San Francisco, CA',
    price: 800000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'John Hancock Center',
    location: 'Chicago, IL',
    price: 900000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
  {
    name: 'Chrysler Building',
    location: 'New York, NY',
    price: 1200000000,
    status: 'PENDING',
    logoUrl: '',
    docUrl: ''
  },
];  

export async function main() {
  console.log('🌱 Starting database seeding...');
  
  console.log('👥 Seeding users...');
  const createdUsers = [];
  for (const u of userData) {
      try {
          const user = await prisma.user.create({
              data: u
          });
          createdUsers.push(user);
          console.log(`✅ Created user: ${user.name} (${user.email})`);
      } catch {
          // If user already exists, skip and continue
          console.log(`⚠️ User ${u.email} already exists, skipping...`);
          // Find existing user by email (using findFirst since email isn't unique)
          const existingUser = await prisma.user.findFirst({
              where: { email: u.email }
          });
          if (existingUser) {
              createdUsers.push(existingUser);
          }
      }
  }
  console.log(`🎉 Successfully seeded ${userData.length} users`);
  
  console.log('🚀 Seeding startups...');
  for (let i = 0; i < startupData.length; i++) {
      // Upload assets for startup
      const startupName = startupData[i].name.replace(/\s+/g, '');
      const logoUrl = await uploadAsset(`logoStartup${startupName}.png`);
      const docUrl = await uploadAsset('sample.pdf');
      
      const startup = await prisma.startup.upsert({
          where: { name: startupData[i].name },
          update: {
              description: startupData[i].description,
              website: startupData[i].website,
              targetAmount: startupData[i].targetAmount,
              status: startupData[i].status,
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          },
          create: {
              ...startupData[i],
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          }
      });
      console.log(`✅ Upserted startup: ${startup.name}`);
  }
  console.log(`🎉 Successfully seeded ${startupData.length} startups`);
  
  console.log('🪙 Seeding tokens...');
  for (let i = 0; i < tokenData.length; i++) {
      // Upload assets for token
      const tokenName = tokenData[i].name.replace(/\s+/g, '');
      const logoUrl = await uploadAsset(`logoToken${tokenName}.png`);
      const docUrl = await uploadAsset('sample.pdf');
      
      const token = await prisma.token.upsert({
          where: { ticker: tokenData[i].ticker },
          update: {
              name: tokenData[i].name,
              supply: tokenData[i].supply,
              price: tokenData[i].price,
              status: tokenData[i].status,
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          },
          create: {
              ...tokenData[i],
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          }
      });
      console.log(`✅ Upserted token: ${token.name} (${token.ticker})`);
  }
  console.log(`🎉 Successfully seeded ${tokenData.length} tokens`);
  
  console.log('🎮 Seeding games...');
  for (let i = 0; i < gameData.length; i++) {
      // Upload assets for game
      const gameTitle = gameData[i].title.replace(/\s+/g, '');
      const logoUrl = await uploadAsset(`logoGame${gameTitle}.png`);
      const docUrl = await uploadAsset('sample.pdf');
      
      const game = await prisma.game.upsert({
          where: { title: gameData[i].title },
          update: {
              platform: gameData[i].platform,
              price: gameData[i].price,
              status: gameData[i].status,
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          },
          create: {
              ...gameData[i],
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          }
      });
      console.log(`✅ Upserted game: ${game.title}`);
  }
  console.log(`🎉 Successfully seeded ${gameData.length} games`);
  
  console.log('🏢 Seeding properties...');
  for (let i = 0; i < propertyData.length; i++) {
      // Upload assets for property
      const propertyName = propertyData[i].name.replace(/\s+/g, '');
      const logoUrl = await uploadAsset(`logoProperty${propertyName}.png`);
      const docUrl = await uploadAsset('sample.pdf');
      
      const property = await prisma.property.upsert({
          where: { name: propertyData[i].name },
          update: {
              location: propertyData[i].location,
              price: propertyData[i].price,
              status: propertyData[i].status,
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          },
          create: {
              ...propertyData[i],
              logoUrl,
              docUrl,
              owner: {
                  connect: { id: createdUsers[i % createdUsers.length].id }
              }
          }
      });
      console.log(`✅ Upserted property: ${property.name}`);
  }
  console.log(`🎉 Successfully seeded ${propertyData.length} properties`);
  
  console.log('✨ Database seeding completed successfully!');
}

main()
  .then(async () => {
      await prisma.$disconnect();
      console.log('🔌 Database connection closed');
  })
  .catch(async (e) => {
      console.error('❌ Error during seeding:', e);
      await prisma.$disconnect();
      process.exit(1);
  }); 