import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@reqgather.com' },
    update: {},
    create: {
      email: 'admin@reqgather.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isVerified: true,
      isActive: true
    }
  });

  // Create manager user
  const managerPassword = await bcrypt.hash('Manager123!', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@reqgather.com' },
    update: {},
    create: {
      email: 'manager@reqgather.com',
      password: managerPassword,
      firstName: 'Project',
      lastName: 'Manager',
      role: 'MANAGER',
      isVerified: true,
      isActive: true
    }
  });

  // Create regular user
  const userPassword = await bcrypt.hash('User123!', 12);
  const user = await prisma.user.upsert({
    where: { email: 'user@reqgather.com' },
    update: {},
    create: {
      email: 'user@reqgather.com',
      password: userPassword,
      firstName: 'Regular',
      lastName: 'User',
      role: 'USER',
      isVerified: true,
      isActive: true
    }
  });

  // Create sample projects
  const project1 = await prisma.project.upsert({
    where: { id: 'sample-project-1' },
    update: {},
    create: {
      id: 'sample-project-1',
      name: 'E-commerce Platform Redesign',
      description: 'Modernize existing e-commerce platform with new features and improved UX',
      client: 'TechCorp Inc.',
      timeline: '6 months',
      status: 'ACTIVE',
      ownerId: manager.id,
      members: {
        connect: [
          { id: user.id }
        ]
      }
    }
  });

  const project2 = await prisma.project.upsert({
    where: { id: 'sample-project-2' },
    update: {},
    create: {
      id: 'sample-project-2',
      name: 'Mobile Banking App',
      description: 'Develop a secure mobile banking application for iOS and Android',
      client: 'FinanceBank Ltd.',
      timeline: '8 months',
      status: 'ACTIVE',
      ownerId: admin.id,
      members: {
        connect: [
          { id: manager.id },
          { id: user.id }
        ]
      }
    }
  });

  const project3 = await prisma.project.upsert({
    where: { id: 'sample-project-3' },
    update: {},
    create: {
      id: 'sample-project-3',
      name: 'Healthcare Management System',
      description: 'Comprehensive healthcare management system for hospitals and clinics',
      client: 'HealthCare Solutions',
      timeline: '12 months',
      status: 'ACTIVE',
      ownerId: user.id
    }
  });

  // Log created projects
  console.log('Created projects:', {
    project1: project1.name,
    project2: project2.name,
    project3: project3.name
  });

  // Create sample activities
  await prisma.activity.createMany({
    skipDuplicates: true,
    data: [
      {
        userId: admin.id,
        type: 'PROJECT_CREATED',
        description: 'Project "Mobile Banking App" created'
      },
      {
        userId: manager.id,
        type: 'PROJECT_CREATED',
        description: 'Project "E-commerce Platform Redesign" created'
      },
      {
        userId: user.id,
        type: 'PROJECT_CREATED',
        description: 'Project "Healthcare Management System" created'
      },
      {
        userId: admin.id,
        type: 'LOGIN',
        description: 'User logged in successfully'
      },
      {
        userId: manager.id,
        type: 'LOGIN',
        description: 'User logged in successfully'
      },
      {
        userId: user.id,
        type: 'LOGIN',
        description: 'User logged in successfully'
      }
    ]
  });

  console.log('✅ Database seeding completed!');
  console.log('');
  console.log('📋 Sample Users:');
  console.log(`   Admin: admin@reqgather.com / Admin123!`);
  console.log(`   Manager: manager@reqgather.com / Manager123!`);
  console.log(`   User: user@reqgather.com / User123!`);
  console.log('');
  console.log('📁 Sample Projects:');
  console.log(`   - E-commerce Platform Redesign`);
  console.log(`   - Mobile Banking App`);
  console.log(`   - Healthcare Management System`);
  console.log('');
  console.log('🔗 Access the application at: http://localhost:3001');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
