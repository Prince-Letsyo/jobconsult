export const finalPushArray = (fromDb, checker) =>
  [
    ...new Map(
      [...fromDb, ...checker].map((obj) => [obj.sector, obj])
    ).values(),
  ].map((a) => a.id);
