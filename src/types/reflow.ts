export type WasteCategory = 'Plastik' | 'Kertas/Kardus' | 'Logam' | 'Botol Kaca';

export interface WasteItemInfo {
  id: WasteCategory;
  name: string;
  subtext: string;
  pointsPerKg: number;
  icon: string;
  color: string;
  co2PerKg: number; // kg CO2 saved per kg
}

export interface DepositHistory {
  id: string;
  type: WasteCategory;
  weightKg: number;
  date: string;
  pointsEarned: number;
  location: string;
  verifiedBy: string;
}

export interface PointTransaction {
  id: string;
  type: 'deposit' | 'redeem' | 'contribute';
  title: string;
  date: string;
  points: number; // positive or negative
  category?: WasteCategory | string;
  iconType: 'deposit' | 'redeem' | 'contribute';
  details?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  merchant: 'Kantin Kampus' | 'Koperasi' | 'Tempat Percetakan' | 'Merchandise';
  merchantType: 'kantin' | 'koperasi' | 'percetakan' | 'merchandise';
  nominalText: string;
  pointsCost: number;
  imagePlaceholder: string;
  badge?: string;
  description: string;
  terms: string;
  codePrefix: string;
}

export interface EcoBadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  currentVal?: number;
  targetVal?: number;
  statusText?: string;
  color: string;
  earnedDate?: string;
  rarity?: 'Umum' | 'Langka' | 'Epik' | 'Legendaris';
}

export interface StudentRank {
  rank: number;
  name: string;
  faculty: string;
  major: string;
  wasteKg: number;
  points: number;
  isCurrentUser?: boolean;
  avatar: string;
  change?: number; // e.g. +2
}

export interface ProdiRank {
  rank: number;
  name: string;
  faculty: string;
  facultyCode: string;
  wasteKg: number;
  points: number;
  change: number;
  percentage: number;
  activeStudents: number;
  isUserFaculty?: boolean;
}

export interface DropPointLocation {
  id: string;
  name: string;
  faculty: string;
  openHours: string;
  operatorName: string;
}

export interface UserVoucher {
  id: string;
  category: 'kantin' | 'kopi' | 'koperasi' | 'percetakan';
  title: string;
  merchant: string;
  location: string;
  validUntil: string;
  code: string;
  status: 'aktif' | 'terpakai' | 'kadaluwarsa';
  usedAt?: string;
  nominalText: string;
  terms: string;
}

