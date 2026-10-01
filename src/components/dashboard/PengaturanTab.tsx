import React, { useState } from 'react';
import { 
  Settings, 
  Coins, 
  MapPin, 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  Plus, 
  Edit2, 
  Trash, 
  Save, 
  User, 
  Mail, 
  Bell 
} from 'lucide-react';

export const PengaturanTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'poin' | 'droppoint' | 'mitra' | 'admin'>('poin');
  const [showToast, setShowToast] = useState<string | null>(null);

  // 1. Point conversion state
  const [pointRatios, setPointRatios] = useState({
    plastik: 10,
    kertas: 10,
    logam: 30,
    kaca: 15,
  });

  // 2. Drop Point Management state (2 Lokasi Fisik FEB)
  const [dropPointList, setDropPointList] = useState([
    { id: 'dp-1', name: 'Drop Point 1: Pelataran Gedung SFD FEB', operator: 'Rian Hidayat', hours: '08:00 - 16:30 WIB', status: 'Aktif' },
    { id: 'dp-2', name: 'Drop Point 2: Area Kantin Blok M FEB', operator: 'Siti Rahma', hours: '08:30 - 17:00 WIB', status: 'Aktif' },
  ]);

  // 3. Reward Partners state (Mitra Kampus FEB)
  const [partnerList, setPartnerList] = useState([
    { id: 'mit-1', name: 'Stand Kantin Blok M FEB', type: 'Kantin Kampus', voucher: 'Voucher Makan Kantin FEB Rp 15.000', status: 'Aktif' },
    { id: 'mit-2', name: 'Edura Cafe / Edura Store FEB', type: 'Kantin Kampus', voucher: 'Voucher Diskon Kopi Edura 25%', status: 'Aktif' },
    { id: 'mit-3', name: 'FEB Mart (Koperasi Mahasiswa FEB)', type: 'Koperasi', voucher: 'Voucher Belanja FEB Mart Rp 10.000', status: 'Aktif' },
    { id: 'mit-4', name: 'Daksin Fotokopi (Mitra Percetakan FEB)', type: 'Tempat Percetakan', voucher: 'Voucher Cetak & Fotokopi Rp 10.000', status: 'Aktif' },
    { id: 'mit-5', name: 'Green Fund FEB (Penghijauan FEB)', type: 'Donasi Lingkungan', voucher: 'Alokasi Pohon & Smart Bin FEB', status: 'Aktif' },
  ]);

  // 4. Admin details state
  const [adminData, setAdminData] = useState({
    name: 'Dr. Amanda Clarissa, M.Pd.',
    nip: '19850412 201012 2 001',
    email: 'amanda.clarissa@unj.ac.id',
    unit: 'Fakultas Ekonomi dan Bisnis',
    role: 'Super Administrator Green Campus FEB',
    dailyEmailReport: true,
  });

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleSavePoints = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('✅ Nilai konversi poin berhasil diperbarui ke seluruh timbangan drop point!');
  };

  const handleSaveAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('✅ Informasi profil administrator fakultas berhasil disimpan!');
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tabs */}
      <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
            Konfigurasi Sistem RE-FLOW
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Pengaturan Sistem & Operasional
          </h2>
          <p className="text-xs text-slate-500">
            Kelola rasio konversi poin, titik kumpul Drop Point, mitra penukaran reward, dan kredensial administrator
          </p>
        </div>

        {/* Sub-nav pills */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          {[
            { id: 'poin', label: '1. Nilai Konversi Poin', icon: Coins },
            { id: 'droppoint', label: '2. Manajemen Drop Point', icon: MapPin },
            { id: 'mitra', label: '3. Mitra Reward & Green Fund', icon: Store },
            { id: 'admin', label: '4. Akun Administrator', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`py-2 px-3.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Pengaturan Nilai Konversi Poin */}
      {activeSubTab === 'poin' && (
        <div className="glass-aero-card rounded-3xl p-6 border border-white shadow-sm space-y-5 max-w-2xl">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Form Penyesuaian Rasio Konversi Poin
            </h3>
            <p className="text-xs text-slate-500">
              Tentukan berapa RE-FLOW Points yang diperoleh mahasiswa untuk setiap 1 kg sampah anorganik terpilah
            </p>
          </div>

          <form onSubmit={handleSavePoints} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-1.5">
                <label className="text-xs font-bold text-cyan-900 flex items-center justify-between">
                  <span>Plastik (PET / PP)</span>
                  <span className="text-[10px] text-cyan-700 font-semibold">Saat ini: {pointRatios.plastik} pt/kg</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pointRatios.plastik}
                    onChange={(e) => setPointRatios({ ...pointRatios, plastik: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-white border border-cyan-300 font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-xs font-bold text-cyan-800">pt/kg</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-lime-50/70 border border-lime-200 space-y-1.5">
                <label className="text-xs font-bold text-lime-900 flex items-center justify-between">
                  <span>Kertas & Kardus</span>
                  <span className="text-[10px] text-lime-700 font-semibold">Saat ini: {pointRatios.kertas} pt/kg</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pointRatios.kertas}
                    onChange={(e) => setPointRatios({ ...pointRatios, kertas: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-white border border-lime-300 font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                  <span className="text-xs font-bold text-lime-800">pt/kg</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
                <label className="text-xs font-bold text-sky-900 flex items-center justify-between">
                  <span>Logam & Kaleng</span>
                  <span className="text-[10px] text-sky-700 font-semibold">Saat ini: {pointRatios.logam} pt/kg</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pointRatios.logam}
                    onChange={(e) => setPointRatios({ ...pointRatios, logam: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-white border border-sky-300 font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <span className="text-xs font-bold text-sky-800">pt/kg</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <label className="text-xs font-bold text-emerald-900 flex items-center justify-between">
                  <span>Botol Kaca</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Saat ini: {pointRatios.kaca} pt/kg</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={pointRatios.kaca}
                    onChange={(e) => setPointRatios({ ...pointRatios, kaca: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl bg-white border border-emerald-300 font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-emerald-800">pt/kg</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md flex items-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Nilai Konversi Poin</span>
            </button>
          </form>
        </div>
      )}

      {/* 2. Manajemen Drop Point */}
      {activeSubTab === 'droppoint' && (
        <div className="glass-aero-card rounded-3xl p-6 border border-white shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Lokasi Fisik Titik Kumpul (Drop Point)
              </h3>
              <p className="text-xs text-slate-500">
                Kelola titik penimbangan fisik dan penugasan operator verifikasi di area kampus
              </p>
            </div>
            <button
              onClick={() => triggerToast('➕ Form penambahan Drop Point baru dibuka')}
              className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Drop Point</span>
            </button>
          </div>

          <div className="space-y-3">
            {dropPointList.map((dp) => (
              <div key={dp.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h4 className="text-xs font-bold text-slate-900">{dp.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-100 text-emerald-800">
                      {dp.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>Petugas Operator: <strong className="text-slate-700">{dp.operator}</strong></span>
                    <span>·</span>
                    <span>Jam Operasional: {dp.hours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerToast(`✏️ Edit data ${dp.name}`)}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Manajemen Mitra Reward */}
      {activeSubTab === 'mitra' && (
        <div className="glass-aero-card rounded-3xl p-6 border border-white shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Mitra Penukaran Reward & Green Fund
              </h3>
              <p className="text-xs text-slate-500">
                Kelola tenant kantin kampus, koperasi, jasa percetakan, dan alokasi dana penghijauan
              </p>
            </div>
            <button
              onClick={() => triggerToast('➕ Form penambahan Mitra Reward dibuka')}
              className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Mitra</span>
            </button>
          </div>

          <div className="space-y-3">
            {partnerList.map((mitra) => (
              <div key={mitra.id} className="p-4 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {mitra.type}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{mitra.name}</h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Voucher yang berlaku: <span className="font-semibold text-slate-700">{mitra.voucher}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    {mitra.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Pengaturan Akun Administrator Fakultas */}
      {activeSubTab === 'admin' && (
        <div className="glass-aero-card rounded-3xl p-6 border border-white shadow-sm space-y-5 max-w-2xl">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Kredensial Akun Administrator Fakultas
            </h3>
            <p className="text-xs text-slate-500">
              Informasi profil pengelola tingkat fakultas dan pengaturan notifikasi harian
            </p>
          </div>

          <form onSubmit={handleSaveAdmin} className="space-y-4 text-xs font-bold">
            <div className="space-y-1">
              <label className="text-slate-700 block">Nama Lengkap & Gelar:</label>
              <input
                type="text"
                value={adminData.name}
                onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 block">NIP Pegawai:</label>
                <input
                  type="text"
                  value={adminData.nip}
                  onChange={(e) => setAdminData({ ...adminData, nip: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 block">Email Dinas:</label>
                <input
                  type="email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between font-normal">
              <div>
                <span className="font-bold text-slate-900 block">Laporan Email Harian</span>
                <span className="text-[11px] text-slate-500">Kirim rekapitulasi setoran Drop Point setiap pukul 17:00 WIB</span>
              </div>
              <input
                type="checkbox"
                checked={adminData.dailyEmailReport}
                onChange={(e) => setAdminData({ ...adminData, dailyEmailReport: e.target.checked })}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md flex items-center gap-2 active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Profil Administrator</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}
    </div>
  );
};
