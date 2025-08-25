/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

export async function seedMedicines() {
  const count = await prisma.medicineInput.count();

  if (count > 0) {
    console.log(`⚡ Medicines already exist (${count} records). Skipping seeding...`);
    return;
  }

  console.log('🌱 No medicine data found. Seeding...');

  const rawMedicines = fs.readFileSync('./medicine.json', 'utf-8');
  const data = JSON.parse(rawMedicines);

  const medicines = data.map((item: any) => ({
    serialNo: item.Serial_NO,
    nameManufacturer: item.Name_Manufacturer,
    brandName: item.Revised_Brand_Name,
    genericName: item.Generic_Name,
    strength: item.Strength,
    dosageDescription: item.Dosage_Description,
    price: parseFloat(item.Price || '0'),
    useFor: item['Use For'],
    dar: item.DAR,
  }));

  const chunkSize = 1000;
  for (let i = 0; i < medicines.length; i += chunkSize) {
    const chunk = medicines.slice(i, i + chunkSize);
    await prisma.medicineInput.createMany({
      data: chunk,
      skipDuplicates: true,
    });
    console.log(`Inserted ${i + chunk.length} records...`);
  }

  console.log('✅ Seeding complete');
}
