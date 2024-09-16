export interface DataForTable {
  id: number;
  date: string;
  description: string;
  usedDays?: number;
  earnedDays?: number;
  balance: number;
}

export const DATA_FOR_TABLE: DataForTable[] = [
  {
    id: 1,
    date: "23/05/2024",
    description: "Accrual for 23/05/2024 to 20/11/2024",
    earnedDays: 3,
    balance: 3,
  },
  {
    id: 2,
    date: "23/05/2024",
    description: "Accrual for 23/05/2024 to 20/11/2024",
    usedDays: -6,
    balance: 3,
  },
  {
    id: 3,
    date: "23/05/2024",
    description: "Accrual for 23/05/2024 to 20/11/2024",
    earnedDays: 3,
    balance: 3,
  },
  {
    id: 4,
    date: "23/05/2024",
    description: "Accrual for 23/05/2024 to 20/11/2024",
    earnedDays: 3,
    balance: 3,
  },
  {
    id: 5,
    date: "23/05/2024",
    description: "Accrual for 23/05/2024 to 20/11/2024",
    usedDays: -6,
    balance: 3,
  },
  {
    id: 6,
    date: "23/05/2024",
    description: "Accrual for 23/05/2024 to 20/11/2024",
    earnedDays: 3,
    balance: 3,
  },
];
