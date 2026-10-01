import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  CheckCircle2, 
  Building, 
  Check, 
  Sparkles,
  Layers,
  Leaf
} from 'lucide-react';

export const LaporanTab: React.FC = () => {
  const [reportType, setReportType] = useState<'periodik' | 'jenis' | 'emisi' | 'reward'>('periodik');
  const [period, setPeriod] = useState('bulan_april_2025');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  const handleDownloadPDF = () => {
    triggerToast('📄 Dokumen PDF resmi siap diunduh! Menyimpan ke perangkat...');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,ID,Tanggal,Kategori,BeratKg,Poin,Prodi,DropPoint\nSET-001,2025-04-25,Plastik,2.5,25,S1 Pendidikan Administrasi Perkantoran,Drop Point 1: Pelataran Gedung SFD FEB\nSET-002,2025-04-24,Kertas,3.8,38,S1 Akuntansi,Drop Point 2: Area Kantin Blok M FEB\nSET-003,2025-04-23,Logam,1.4,42,S1 Manajemen,Drop Point 1: Pelataran Gedung SFD FEB";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_REFLOW_${reportType}_April2025.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('📊 Data spreadsheet CSV berhasil diekspor!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Generator Options */}
      <div className="glass-aero-card rounded-3xl p-5 border border-white shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest block">
            Pusat Audit & Pelaporan Sirkular
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-0.5">
            Generator Laporan Fakultas
          </h2>
          <p className="text-xs text-slate-500">
            Cetak dokumen audit resmi kampus, rekapitulasi tonase sampah, dan metrik reduksi emisi karbon
          </p>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Pilihan Jenis Laporan */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              1. Pilih Format & Jenis Laporan:
            </label>
            <div className="space-y-2">
              {[
                { id: 'periodik', label: 'Laporan Periodik Setoran (Bulanan / Semesteran)', desc: 'Rekapitulasi total timbangan & tren mingguan' },
                { id: 'jenis', label: 'Laporan Rekapitulasi Sampah Per Jenis', desc: 'Breakdown spesifik Plastik, Kertas, Logam, Kaca' },
                { id: 'emisi', label: 'Laporan Audit Dampak Lingkungan (Emisi Karbon)', desc: 'Kalkulasi reduksi CO₂e dan efisiensi sirkular' },
                { id: 'reward', label: 'Laporan Distribusi Reward & Green Fund', desc: 'Audit penukaran kupon mitra dan donasi kampus' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setReportType(item.id as any)}
                  className={`p-3 rounded-2xl cursor-pointer transition-all border text-xs ${
                    reportType === item.id
                      ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">{item.label}</span>
                    {reportType === item.id && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Periode & Aksi */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                2. Tentukan Periode Waktu Laporan:
              </label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full p-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              >
                <option value="bulan_april_2025">Bulan Ini: April 2025 (1 - 30 April)</option>
                <option value="bulan_maret_2025">Bulan Lalu: Maret 2025</option>
                <option value="semester_genap">Semester Genap 2024/2025 (Januari - Juni)</option>
                <option value="tahunan_2025">Tahun Akademik 2024/2025 Lengkap</option>
              </select>
            </div>

            {/* Tombol Aksi Utama */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                3. Aksi Unduh & Cetak:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={handleDownloadPDF}
                  className="py-3 px-3 rounded-2xl gloss-pill-btn font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh PDF</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="py-3 px-3 rounded-2xl gloss-pill-cyan font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ekspor Excel</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="py-3 px-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 font-extrabold text-xs text-slate-700 shadow-sm flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 text-[11px] text-emerald-900 font-medium">
              💡 Dokumen resmi mencakup metadata verifikasi, rekapitulasi timbangan terdaftar, dan tanda tangan koordinator.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Preview Ringkas Dokumen Laporan Resmi Kampus */}
      <div className="glass-aero-card rounded-3xl p-6 sm:p-8 border border-white shadow-lg space-y-6 bg-white max-w-4xl mx-auto print:shadow-none print:border-none">
        {/* Kop Surat Resmi Kampus */}
        <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest block">
            Kementerian Pendidikan Tinggi, Sains, dan Teknologi
          </span>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight uppercase">
            Universitas Negeri Jakarta
          </h2>
          <h3 className="text-xs sm:text-sm font-extrabold text-emerald-800 uppercase">
            Fakultas Ekonomi dan Bisnis · Satgas Kampus Hijau & Sirkular Ekonomi (RE-FLOW FEB)
          </h3>
          <p className="text-[10px] text-slate-500 font-medium">
            Gedung SFD FEB Lt. 1, Kampus A UNJ, Rawamangun, Jakarta Timur · Email: green.feb@unj.ac.id
          </p>
        </div>

        {/* Judul Laporan & Metadata */}
        <div className="text-center space-y-1">
          <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase underline tracking-wide">
            {reportType === 'periodik' && 'Laporan Audit Periodik Pengelolaan Sampah Kampus FEB'}
            {reportType === 'jenis' && 'Laporan Rekapitulasi Sampah Per Kategori Material FEB'}
            {reportType === 'emisi' && 'Laporan Audit Dampak Lingkungan & Reduksi Emisi Karbon FEB'}
            {reportType === 'reward' && 'Laporan Sirkulasi RE-FLOW Points & Green Fund FEB'}
          </h3>
          <span className="text-xs font-semibold text-slate-600 block">
            Nomor: 042/UN39.FEB/GREEN-FLOW/IV/2025 · Periode: April 2025
          </span>
        </div>

        {/* Ringkasan Eksekutif */}
        <div className="grid grid-cols-3 gap-3 text-center border-y border-slate-200 py-3 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] font-bold block uppercase">Total Tonase Terkelola</span>
            <span className="text-base font-black text-slate-900">248.5 kg</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold block uppercase">Reduksi Karbon (CO₂e)</span>
            <span className="text-base font-black text-emerald-700">372.8 kg CO₂e</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold block uppercase">Poin Didistribusikan</span>
            <span className="text-base font-black text-cyan-700">86.420 pt</span>
          </div>
        </div>

        {/* Tabel Ringkasan Sampah Terkelola */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 block">
            A. Rekapitulasi Penimbangan per Jenis Sampah:
          </span>
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-600">
              <tr>
                <th className="p-2 border-b">No</th>
                <th className="p-2 border-b">Kategori Sampah</th>
                <th className="p-2 border-b text-right">Berat (kg)</th>
                <th className="p-2 border-b text-right">Persentase</th>
                <th className="p-2 border-b text-right">Faktor Reduksi CO₂</th>
                <th className="p-2 border-b">Status Penyaluran Daur Ulang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr>
                <td className="p-2">1</td>
                <td className="p-2 font-bold text-cyan-800">Plastik (PET/PP)</td>
                <td className="p-2 text-right tabular-nums">104.4 kg</td>
                <td className="p-2 text-right tabular-nums">42%</td>
                <td className="p-2 text-right tabular-nums">187.9 kg CO₂e</td>
                <td className="p-2 text-emerald-700 font-semibold">Tersalurkan ke Mitra Industri</td>
              </tr>
              <tr>
                <td className="p-2">2</td>
                <td className="p-2 font-bold text-lime-800">Kertas & Arsip</td>
                <td className="p-2 text-right tabular-nums">69.6 kg</td>
                <td className="p-2 text-right tabular-nums">28%</td>
                <td className="p-2 text-right tabular-nums">83.5 kg CO₂e</td>
                <td className="p-2 text-emerald-700 font-semibold">Tersalurkan ke Pabrik Kertas</td>
              </tr>
              <tr>
                <td className="p-2">3</td>
                <td className="p-2 font-bold text-sky-800">Logam & Kaleng</td>
                <td className="p-2 text-right tabular-nums">44.7 kg</td>
                <td className="p-2 text-right tabular-nums">18%</td>
                <td className="p-2 text-right tabular-nums">71.5 kg CO₂e</td>
                <td className="p-2 text-emerald-700 font-semibold">Tersalurkan ke Peleburan Lokal</td>
              </tr>
              <tr>
                <td className="p-2">4</td>
                <td className="p-2 font-bold text-emerald-800">Botol Kaca</td>
                <td className="p-2 text-right tabular-nums">29.8 kg</td>
                <td className="p-2 text-right tabular-nums">12%</td>
                <td className="p-2 text-right tabular-nums">29.8 kg CO₂e</td>
                <td className="p-2 text-emerald-700 font-semibold">Tersalurkan ke Bank Sampah Kaca</td>
              </tr>
              <tr className="bg-slate-50 font-black">
                <td className="p-2" colSpan={2}>TOTAL AKUMULASI</td>
                <td className="p-2 text-right">248.5 kg</td>
                <td className="p-2 text-right">100%</td>
                <td className="p-2 text-right">372.8 kg CO₂e</td>
                <td className="p-2 text-emerald-800">100% Terverifikasi</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tanda Tangan Koordinator */}
        <div className="pt-6 flex justify-between items-end text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Dicetak Otomatis oleh Sistem:</span>
            <span className="font-mono text-slate-600 text-[10px]">RE-FLOW Core Engine v2.4 · 29 Apr 2025</span>
          </div>

          <div className="text-center space-y-1">
            <span className="text-slate-600 block">Jakarta, 29 April 2025</span>
            <span className="text-slate-700 font-bold block">Koordinator Satgas Green Campus FEB</span>
            <div className="w-24 h-12 mx-auto flex items-center justify-center font-serif italic text-slate-300">
              [Tanda Tangan Digital]
            </div>
            <span className="font-black text-slate-900 block underline">Dr. Amanda Clarissa, M.Pd.</span>
            <span className="text-[10px] text-slate-500 font-mono block">NIP. 19850412 201012 2 001</span>
          </div>
        </div>
      </div>

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
