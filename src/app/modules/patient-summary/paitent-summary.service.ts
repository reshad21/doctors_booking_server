import prisma from '../../../db/db.config';

const getAmountByStatusAndPeriod = async (from: Date, to: Date) => {
  const statuses = ['NEW', 'OLD', 'REPORT'];
  const result: Record<string, number> = {};
  for (const status of statuses) {
    const amount = await prisma.visit.aggregate({
      _sum: { fee: true },
      where: {
        createdAt: { gte: from, lt: to },
        patient: { status: status as 'NEW' | 'OLD' | 'REPORT' },
      },
    });
    result[status.toLowerCase()] = amount._sum?.fee ?? 0;
  }
  return result;
};

const getPatientSummaryFromDB = async () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
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
  const dailyAmount = await getAmountByStatusAndPeriod(today, tomorrow);
  const weeklyAmount = await getAmountByStatusAndPeriod(weekStart, nextWeek);
  const monthlyAmount = await getAmountByStatusAndPeriod(monthStart, nextMonth);
  const yearlyAmount = await getAmountByStatusAndPeriod(yearStart, nextYear);

  // Helper to get status counts
  const getStatusCounts = async (from: Date) => {
    const total = await prisma.patient.count({
      where: { createdAt: { gte: from } },
    });
    const newCount = await prisma.patient.count({
      where: { createdAt: { gte: from }, status: 'NEW' },
    });
    const oldCount = await prisma.patient.count({
      where: { createdAt: { gte: from }, status: 'OLD' },
    });
    const reportCount = await prisma.patient.count({
      where: { createdAt: { gte: from }, status: 'REPORT' },
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

  // Total patients
  const totalPatients = await prisma.patient.count(
    {
  where: { visitStatus: 'VISITED' },
}
  );
  // Today's patients
  const todaysPatients = await prisma.patient.count({
    where: {
      createdAt: { gte: today },
       visitStatus: 'VISITED'
  
  },
    
  });
  // Monthly patients
  const monthlyPatients = await prisma.patient.count({
    where: { createdAt: { gte: monthStart } , visitStatus: 'VISITED' },
  });

  // Percentages by status
  const dailyStatus = await getStatusCounts(today);
  const weeklyStatus = await getStatusCounts(weekStart);
  const monthlyStatus = await getStatusCounts(monthStart);
  const yearlyStatus = await getStatusCounts(yearStart);

  return {
    totalPatients,
    todaysPatients,
    monthlyPatients,
    dailyStatus,
    weeklyStatus,
    monthlyStatus,
    yearlyStatus,
    dailyAmount,
    weeklyAmount,
    monthlyAmount,
    yearlyAmount,
  };
};

export const PatientSummaryService = {
  getPatientSummaryFromDB,
};
