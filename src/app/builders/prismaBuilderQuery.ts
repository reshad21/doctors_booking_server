/* eslint-disable @typescript-eslint/no-explicit-any */
export const builderQuery = <TWhereInput, TOrderByInput>({
  searchFields = [],
  searchTerm = '',
  filter = {} as TWhereInput,
  orderBy = {} as TOrderByInput,
  page = 1,
  limit = 10,
}: {
  searchFields?: string[];
  searchTerm?: string;
  filter?: TWhereInput;
  orderBy: TOrderByInput;
  page: number;
  limit: number;
}) => {
  const skip = (page - 1) * limit;
  const take = limit;

  const searchConditions =
    searchFields.length > 0 && searchTerm
      ? {
          OR: searchFields.map((field) => ({
            [field]: { contains: searchTerm },
          })),
        }
      : {};

  const where = {
    ...filter,
    ...(Object.keys(searchConditions).length > 0 && searchConditions),
  };

  // --------- Normalize orderBy and add deterministic tiebreaker ----------
  const normalizeEntry = (k: string, v: any): Record<string, 'asc' | 'desc'> => {
    const dir = typeof v === 'string' && (v.toLowerCase() === 'asc' || v.toLowerCase() === 'desc')
      ? (v.toLowerCase() as 'asc' | 'desc')
      : 'desc';
    return { [k]: dir };
  };

  let finalOrderByArray: Array<Record<string, 'asc' | 'desc'>> = [];

  // if user passed an array (e.g. from client), keep it
  if (Array.isArray(orderBy) && (orderBy as any[]).length > 0) {
    finalOrderByArray = (orderBy as any[]).map((e) => {
      const key = Object.keys(e)[0];
      const dir = (e as any)[key];
      return normalizeEntry(key, dir);
    });
  } else if (orderBy && typeof orderBy === 'object' && Object.keys(orderBy).length > 0) {
    // If orderBy is an object: support multiple keys by preserving order of keys
    finalOrderByArray = Object.entries(orderBy as any).map(([k, v]) => normalizeEntry(k, v));
  } else {
    // default
    finalOrderByArray = [{ createdAt: 'desc' }];
  }

  // add a deterministic tiebreaker if none of the order keys is id/createdAt
  const hasTiebreaker = finalOrderByArray.some((o) => {
    const key = Object.keys(o)[0].toLowerCase();
    return key === 'id' || key === 'createdat' || key === 'created_at';
  });

  if (!hasTiebreaker) {
    // use the same direction as the primary sort for the tiebreaker
    const primaryDir = Object.values(finalOrderByArray[0])[0] as 'asc' | 'desc';
    finalOrderByArray.push({ id: primaryDir });
  }

  // Use object if only one ordering present, otherwise send array (Prisma accepts both)
  const finalOrderBy = finalOrderByArray.length === 1 ? finalOrderByArray[0] : finalOrderByArray;

  const query = {
    skip,
    take: Number(take),
    where,
    orderBy: finalOrderBy,
  };

  return query;
};
