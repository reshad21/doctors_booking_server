// /* eslint-disable @typescript-eslint/no-explicit-any */
// import prisma from '../../../db/db.config';
// import { User } from '../../types/user.type';
// import { getDoctorIdForUser } from '../../utils/getDoctorId';

// const getAmountByStatusAndPeriod = async (from: Date, to: Date, chamberId?: string) => {
//   const statuses = ['NEW', 'OLD', 'REPORT'];
//   const result: Record<string, number> = {};
  
//   for (const status of statuses) {
//     const whereClause: any = {
//       createdAt: { gte: from, lt: to },
//       patient: { status: status as 'NEW' | 'OLD' | 'REPORT' },
//     };
    
//     // Add chamber filter if provided and not "all"
//     if (chamberId && chamberId !== 'all') {
//       whereClause.patient.chamberId = chamberId;
//     }
    
//     const amount = await prisma.visit.aggregate({
//       _sum: { fee: true },
//       where: whereClause,
//     });
//     result[status.toLowerCase()] = amount._sum?.fee ?? 0;
//   }
//   return result;
// };

// const getPatientSummaryFromDB = async (user: User, chamberId:string) => {
  
  
//   const doctorId = await getDoctorIdForUser(user);
//   const now = new Date();
//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const weekStart = new Date(today);
//   weekStart.setDate(today.getDate() - today.getDay());
//   const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);
//   const nextWeek = new Date(weekStart);
//   nextWeek.setDate(weekStart.getDate() + 7);
//   const nextMonth = new Date(
//     monthStart.getFullYear(),
//     monthStart.getMonth() + 1,
//     1,
//   );
//   const yearStart = new Date(today.getFullYear(), 0, 1);
//   const nextYear = new Date(today.getFullYear() + 1, 0, 1);

//   // Amounts by period and status
//   const dailyAmount = await getAmountByStatusAndPeriod(today, tomorrow, chamberId);
//   const weeklyAmount = await getAmountByStatusAndPeriod(weekStart, nextWeek, chamberId);
//   const monthlyAmount = await getAmountByStatusAndPeriod(monthStart, nextMonth, chamberId);
//   const yearlyAmount = await getAmountByStatusAndPeriod(yearStart, nextYear, chamberId);

//   // Helper to get status counts with chamber filter
//   const getStatusCounts = async (from: Date) => {
//     const baseWhere: any = { createdAt: { gte: from } };
    
//     // Add chamber filter if provided and not "all"
//     if (chamberId && chamberId !== 'all') {
//       baseWhere.chamberId = chamberId;
//     }

//     const total = await prisma.patient.count({
//       where: baseWhere,
//     });
    
//     const newCount = await prisma.patient.count({
//       where: { ...baseWhere, status: 'NEW' },
//     });
    
//     const oldCount = await prisma.patient.count({
//       where: { ...baseWhere, status: 'OLD' },
//     });
    
//     const reportCount = await prisma.patient.count({
//       where: { ...baseWhere, status: 'REPORT' },
//     });
    
//     return {
//       total,
//       new: { count: newCount, percent: total ? (newCount / total) * 100 : 0 },
//       old: { count: oldCount, percent: total ? (oldCount / total) * 100 : 0 },
//       report: {
//         count: reportCount,
//         percent: total ? (reportCount / total) * 100 : 0,
//       },
//     };
//   };

//   // Helper for patient counts with visit status and chamber filter
//   const getPatientCounts = async (additionalWhere: any = {}) => {
//     const baseWhere: any = { doctorId, ...additionalWhere };
    
//     // Add chamber filter if provided and not "all"
//     if (chamberId && chamberId !== 'all') {
//       baseWhere.chamberId = chamberId;
//     }
    
//     return await prisma.patient.count({ where: baseWhere });
//   };

//   // Total patients
//   const totalPatients = await getPatientCounts({ visitStatus: 'VISITED' });
  
//   // Today's patients
//   const todaysPatients = await getPatientCounts({
//     createdAt: { gte: today },
//     visitStatus: 'VISITED',
//   });
  
//   // Monthly patients
//   const monthlyPatients = await getPatientCounts({
//     createdAt: { gte: monthStart },
//     visitStatus: 'VISITED',
//   });

//   // Today's pending patients
//   const todaysPendingPatients = await getPatientCounts({
//     createdAt: { gte: today },
//     visitStatus: { not: 'VISITED' },
//   });

//   // Percentages by status
//   const dailyStatus = await getStatusCounts(today);
//   const weeklyStatus = await getStatusCounts(weekStart);
//   const monthlyStatus = await getStatusCounts(monthStart);
//   const yearlyStatus = await getStatusCounts(yearStart);

//   return {
//     totalPatients,
//     todaysPatients,
//     todaysPendingPatients,
//     monthlyPatients,
//     dailyStatus,
//     weeklyStatus,
//     monthlyStatus,
//     yearlyStatus,
//     dailyAmount,
//     weeklyAmount,
//     monthlyAmount,
//     yearlyAmount,
//     // Include the chamber filter info in response
//     filter: {
//       // chamber: chamberName || 'all',
//       chamberId: chamberId || 'all'
//     }
//   };
// };
// export const PatientSummaryService = {
//   getPatientSummaryFromDB,
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../db/db.config';
import { User } from '../../types/user.type';
import { getDoctorIdForUser } from '../../utils/getDoctorId';

const getAmountByStatusAndPeriod = async (from: Date, to: Date, chamberId?: string) => {
  const statuses = ['NEW', 'OLD', 'REPORT'];
  const result: Record<string, number> = {};
  
  for (const status of statuses) {
    const whereClause: any = {
      createdAt: { gte: from, lt: to },
      patient: { status: status as 'NEW' | 'OLD' | 'REPORT' },
    };
    
    // Add chamber filter if provided and not "all"
    if (chamberId && chamberId !== 'all') {
      whereClause.patient.chamberId = chamberId;
    }
    
    const amount = await prisma.visit.aggregate({
      _sum: { fee: true },
      where: whereClause,
    });
    result[status.toLowerCase()] = amount._sum?.fee ?? 0;
  }
  return result;
};

const getPatientSummaryFromDB = async (user: User, chamberId:string) => {
  const doctorId = await getDoctorIdForUser(user);
  const now = new Date();
  
  // Adjust for timezone offset to ensure consistent dates
  const timezoneOffset = now.getTimezoneOffset() * 60000; // offset in milliseconds
  const localDate = new Date(now.getTime() - timezoneOffset);
  
  const today = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(weekStart);
  nextWeek.setDate(weekStart.getDate() + 7);
  const nextMonth = new Date(
    monthStart.getFullYear(),
    monthStart.getMonth() + 1,
    1,
  );
  const yearStart = new Date(today.getFullYear(), 0, 1);
  const nextYear = new Date(today.getFullYear() + 1, 0, 1);

  // Amounts by period and status
  const dailyAmount = await getAmountByStatusAndPeriod(today, tomorrow, chamberId);
  const weeklyAmount = await getAmountByStatusAndPeriod(weekStart, nextWeek, chamberId);
  const monthlyAmount = await getAmountByStatusAndPeriod(monthStart, nextMonth, chamberId);
  const yearlyAmount = await getAmountByStatusAndPeriod(yearStart, nextYear, chamberId);

  // Helper to get status counts with chamber filter
  const getStatusCounts = async (from: Date) => {
    const baseWhere: any = { createdAt: { gte: from } };
    
    // Add chamber filter if provided and not "all"
    if (chamberId && chamberId !== 'all') {
      baseWhere.chamberId = chamberId;
    }

    const total = await prisma.patient.count({
      where: baseWhere,
    });
    
    const newCount = await prisma.patient.count({
      where: { ...baseWhere, status: 'NEW' },
    });
    
    const oldCount = await prisma.patient.count({
      where: { ...baseWhere, status: 'OLD' },
    });
    
    const reportCount = await prisma.patient.count({
      where: { ...baseWhere, status: 'REPORT' },
    });
    
    return {
      total,
      new: { count: newCount, percent: total ? (newCount / total) * 100 : 0 },
      old: { count: oldCount, percent: total ? (oldCount / total) * 100 : 0 },
      report: {
        count: reportCount,
        percent: total ? (reportCount / total) * 100 : 0,
      },
    };
  };

  // Helper for patient counts with visit status and chamber filter
  const getPatientCounts = async (additionalWhere: any = {}) => {
    const baseWhere: any = { doctorId, ...additionalWhere };
    
    // Add chamber filter if provided and not "all"
    if (chamberId && chamberId !== 'all') {
      baseWhere.chamberId = chamberId;
    }
    
    return await prisma.patient.count({ where: baseWhere });
  };

  // Total patients
  const totalPatients = await getPatientCounts({ visitStatus: 'VISITED' });
  
  // Today's patients
  const todaysPatients = await getPatientCounts({
    createdAt: { gte: today },
    visitStatus: 'VISITED',
  });
  
  // Monthly patients
  const monthlyPatients = await getPatientCounts({
    createdAt: { gte: monthStart },
    visitStatus: 'VISITED',
  });

  // Today's pending patients
  const todaysPendingPatients = await getPatientCounts({
    createdAt: { gte: today },
    visitStatus: { not: 'VISITED' },
  });

  // Percentages by status
  const dailyStatus = await getStatusCounts(today);
  const weeklyStatus = await getStatusCounts(weekStart);
  const monthlyStatus = await getStatusCounts(monthStart);
  const yearlyStatus = await getStatusCounts(yearStart);

  return {
    totalPatients,
    todaysPatients,
    todaysPendingPatients,
    monthlyPatients,
    dailyStatus,
    weeklyStatus,
    monthlyStatus,
    yearlyStatus,
    dailyAmount,
    weeklyAmount,
    monthlyAmount,
    yearlyAmount,
    // Include the chamber filter info in response
    filter: {
      // chamber: chamberName || 'all',
      chamberId: chamberId || 'all'
    }
  };
};

export const PatientSummaryService = {
  getPatientSummaryFromDB,
};