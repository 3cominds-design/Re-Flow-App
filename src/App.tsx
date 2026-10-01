import React, { useState } from 'react';
import { 
  initialUser, 
  initialDepositHistory, 
  initialPointTransactions, 
  initialRewards,
  initialUserVouchers
} from './data/mockData';
import { DepositHistory, PointTransaction, RewardItem, UserVoucher } from './types/reflow';

// Components
import { AeroBackgroundBubbles } from './components/AeroBackgroundBubbles';
import { HeaderNavbar } from './components/HeaderNavbar';
import { BottomNavBar, NavTab } from './components/BottomNavBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { SetorScreen } from './components/screens/SetorScreen';
import { PointsScreen } from './components/screens/PointsScreen';
import { RedeemScreen } from './components/screens/RedeemScreen';
import { ContributeScreen } from './components/screens/ContributeScreen';
import { MyVouchersScreen } from './components/screens/MyVouchersScreen';
import { PointsHistoryScreen } from './components/screens/PointsHistoryScreen';
import { RankingBadgeScreen } from './components/screens/RankingBadgeScreen';
import { FacultyDashboard } from './components/screens/FacultyDashboard';
import { FlowchartView } from './components/screens/FlowchartView';
import { NotificationModal } from './components/NotificationModal';
import { ProfileModal } from './components/ProfileModal';
import { CampaignModal } from './components/CampaignModal';
import { TriggerFloatingToast } from './components/TriggerFloatingToast';

// Icons
import { Smartphone, Monitor, GitFork, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & View Mode State
  // 'mobile' | 'faculty' | 'flowchart'
  const [viewMode, setViewMode] = useState<'mobile' | 'faculty' | 'flowchart'>('mobile');
  const [mobileTab, setMobileTab] = useState<NavTab>('beranda');
  const [activeSubScreen, setActiveSubScreen] = useState<'none' | 'redeem' | 'contribute' | 'vouchers' | 'history'>('none');
  const [rankingDefaultTab, setRankingDefaultTab] = useState<'ranking' | 'badge'>('ranking');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // App Business State
  const [user, setUser] = useState(initialUser);
  const [depositHistory, setDepositHistory] = useState<DepositHistory[]>(initialDepositHistory);
  const [transactions, setTransactions] = useState<PointTransaction[]>(initialPointTransactions);
  const [userVouchers, setUserVouchers] = useState<UserVoucher[]>(initialUserVouchers);

  // Modals
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showCampaignModal, setShowCampaignModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Use voucher at cashier
  const handleUseVoucher = (voucherId: string) => {
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
    
    setUserVouchers((prev) =>
      prev.map((v) => (v.id === voucherId ? { ...v, status: 'terpakai' as const, usedAt: dateStr } : v))
    );
  };

  // Navigate to My Vouchers, optionally saving newly redeemed voucher
  const handleGoToMyVouchers = (reward?: RewardItem) => {
    if (reward) {
      const newVoucher: UserVoucher = {
        id: `vch-${Date.now()}`,
        category: reward.merchantType === 'merchandise' ? 'koperasi' : (reward.merchantType as any),
        title: reward.title,
        merchant: reward.merchant,
        location: reward.merchantType === 'kantin' ? 'Stand Kantin Blok M FEB' : 'FEB UNJ',
        validUntil: '30 Nov 2026',
        code: `${reward.codePrefix}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'aktif',
        nominalText: reward.nominalText,
        terms: reward.terms,
      };
      setUserVouchers((prev) => [newVoucher, ...prev]);
    }
    setActiveSubScreen('vouchers');
  };

  // Add new deposit from Setor Screen
  const handleAddDeposit = (newDeposit: DepositHistory) => {
    setDepositHistory([newDeposit, ...depositHistory]);

    // Update user stats
    const updatedPoints = user.points + newDeposit.pointsEarned;
    const updatedWasteKg = Number((user.totalWasteKg + newDeposit.weightKg).toFixed(1));
    setUser({
      ...user,
      points: updatedPoints,
      totalWasteKg: updatedWasteKg,
      co2SavedKg: Number((user.co2SavedKg + newDeposit.weightKg * 1.5).toFixed(1)),
    });

    // Add to transaction history
    const newTx: PointTransaction = {
      id: `tx-${Date.now()}`,
      type: 'deposit',
      title: `Setor sampah (${newDeposit.type} ${newDeposit.weightKg} kg)`,
      date: newDeposit.date,
      points: newDeposit.pointsEarned,
      category: newDeposit.type,
      iconType: 'deposit',
      details: `${newDeposit.location} · ${newDeposit.verifiedBy}`,
    };
    setTransactions([newTx, ...transactions]);

    triggerToast(`🎉 Berhasil! +${newDeposit.pointsEarned} RE-FLOW Points ditambahkan ke akunmu.`);
  };

  // Redeem Reward
  const handleRedeemReward = (reward: RewardItem) => {
    if (user.points < reward.pointsCost) return;

    const newPoints = user.points - reward.pointsCost;
    setUser({
      ...user,
      points: newPoints,
    });

    const newTx: PointTransaction = {
      id: `tx-${Date.now()}`,
      type: 'redeem',
      title: `Redeem (${reward.title})`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      points: -reward.pointsCost,
      iconType: 'redeem',
      details: `Voucher digital ${reward.title}`,
    };
    setTransactions([newTx, ...transactions]);

    triggerToast(`✨ Voucher ${reward.title} siap digunakan! Sisa saldo: ${newPoints} pt.`);
  };

  // Confirm Contribution to Green Fund
  const handleConfirmContribution = (points: number, rupiah: number, projectTitle: string = 'Campus Green Fund') => {
    if (user.points < points) return;

    const newPoints = user.points - points;
    setUser({
      ...user,
      points: newPoints,
    });

    const newTx: PointTransaction = {
      id: `tx-${Date.now()}`,
      type: 'contribute',
      title: `Contribute (${projectTitle})`,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      points: -points,
      iconType: 'contribute',
      details: `Donasi Rp ${rupiah.toLocaleString('id-ID')} untuk ${projectTitle}`,
    };
    setTransactions([newTx, ...transactions]);

    triggerToast(`🌱 Terima kasih! Donasi ${points} poin ke ${projectTitle} telah berhasil.`);
  };

  // Navigation handlers from flowchart or quick actions
  const handleNavigateFromFlowchart = (screenId: string) => {
    setViewMode('mobile');
    if (screenId === 'setor') {
      setMobileTab('setor');
      setActiveSubScreen('none');
    } else if (screenId === 'points') {
      setMobileTab('points');
      setActiveSubScreen('none');
    } else if (screenId === 'redeem') {
      setMobileTab('points');
      setActiveSubScreen('redeem');
    } else if (screenId === 'contribute') {
      setMobileTab('points');
      setActiveSubScreen('contribute');
    } else if (screenId === 'ranking') {
      setMobileTab('ranking');
      setRankingDefaultTab('ranking');
      setActiveSubScreen('none');
    } else if (screenId === 'faculty') {
      setViewMode('faculty');
    }
  };

  return (
    <div className="min-h-screen relative font-sans flex flex-col selection:bg-emerald-200">
      {/* Frutiger Aero Ambient Bubbles */}
      <AeroBackgroundBubbles />

      {/* Top Universal Prototype Bar: Switch between Student Mobile, Faculty Dashboard, Flowchart */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-200/70 shadow-sm px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Brand and Tag */}
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base text-emerald-800 tracking-tight flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              RE-FLOW Prototype
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100/90 font-bold px-2 py-0.5 rounded-full border border-emerald-300 hidden sm:inline-block">
              Frutiger Aero Green Economy
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => {
                setViewMode('mobile');
                setActiveSubScreen('none');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>1-6. Mobile Mahasiswa</span>
            </button>

            <button
              onClick={() => setViewMode('faculty')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'faculty'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>7. Faculty Dashboard</span>
            </button>

            <button
              onClick={() => setViewMode('flowchart')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'flowchart'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Flowchart Alur</span>
            </button>
          </div>

          {/* Phone Frame Toggle (when in mobile mode on wider screens) */}
          {viewMode === 'mobile' && (
            <button
              onClick={() => setIsPhoneFrame(!isPhoneFrame)}
              className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 hidden lg:flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 bg-white"
            >
              <span>{isPhoneFrame ? 'Perluas Layar' : 'Bingkai iPhone'}</span>
            </button>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT ROUTING */}
      {viewMode === 'faculty' ? (
        <FacultyDashboard onBackToStudentView={() => setViewMode('mobile')} />
      ) : viewMode === 'flowchart' ? (
        <div className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full">
          <FlowchartView
            onBack={() => setViewMode('mobile')}
            onNavigateScreen={handleNavigateFromFlowchart}
          />
        </div>
      ) : (
        /* Mobile Mahasiswa App Container */
        <div className="flex-1 flex justify-center py-0 sm:py-6 px-0 sm:px-4">
          <div
            className={`w-full bg-[#f4fbf8] transition-all relative ${
              isPhoneFrame
                ? 'sm:max-w-[420px] sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.25),0_0_0_12px_#0f172a,0_0_0_14px_#334155] sm:border-4 sm:border-slate-800 min-h-[820px] overflow-hidden'
                : 'max-w-md'
            }`}
          >
            {/* Phone Top Notch for realistic mockup */}
            {isPhoneFrame && (
              <div className="hidden sm:flex justify-between items-center px-6 pt-3 pb-1 text-[11px] font-bold text-slate-700 select-none">
                <span>9:41</span>
                {/* Speaker pill notch */}
                <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-800 -mr-1" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">5G</span>
                  <div className="w-4 h-2.5 rounded-sm border border-slate-700 p-0.5 flex items-center">
                    <div className="h-full w-full bg-emerald-600 rounded-2xs" />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Header / Navbar (as defined in item 1 of user brief) */}
            <HeaderNavbar
              user={user}
              unreadNotificationsCount={2}
              onOpenNotifications={() => setShowNotifications(true)}
              onOpenProfile={() => setShowProfileModal(true)}
            />

            {/* Sub-Screen or Tab Routing */}
            <main className="px-4 pt-3">
              {activeSubScreen === 'history' ? (
                <PointsHistoryScreen
                  transactions={transactions}
                  userPoints={user.points}
                  onBack={() => setActiveSubScreen('none')}
                  onNavigateVouchers={() => setActiveSubScreen('vouchers')}
                />
              ) : activeSubScreen === 'vouchers' ? (
                <MyVouchersScreen
                  vouchers={userVouchers}
                  onBack={() => setActiveSubScreen('none')}
                  onUseVoucher={handleUseVoucher}
                  onNavigateHistory={() => setActiveSubScreen('history')}
                />
              ) : activeSubScreen === 'redeem' ? (
                <RedeemScreen
                  userPoints={user.points}
                  onBack={() => setActiveSubScreen('none')}
                  onRedeemReward={handleRedeemReward}
                  onGoToMyVouchers={handleGoToMyVouchers}
                />
              ) : activeSubScreen === 'contribute' ? (
                <ContributeScreen
                  userPoints={user.points}
                  userName={user.name}
                  userFaculty={user.faculty}
                  onBack={() => setActiveSubScreen('none')}
                  onConfirmContribution={handleConfirmContribution}
                />
              ) : mobileTab === 'beranda' ? (
                <HomeScreen
                  user={user}
                  onNavigateSetor={() => setMobileTab('setor')}
                  onNavigatePoints={() => setMobileTab('points')}
                  onNavigateRanking={() => {
                    setRankingDefaultTab('ranking');
                    setMobileTab('ranking');
                  }}
                  onOpenCampaignModal={() => setShowCampaignModal(true)}
                />
              ) : mobileTab === 'setor' ? (
                <SetorScreen
                  depositHistory={depositHistory}
                  onBack={() => setMobileTab('beranda')}
                  onAddDeposit={handleAddDeposit}
                  onNavigatePoints={() => setMobileTab('points')}
                />
              ) : mobileTab === 'points' ? (
                <PointsScreen
                  userPoints={user.points}
                  userName={user.name}
                  userFaculty={user.faculty}
                  transactions={transactions}
                  onBack={() => setMobileTab('beranda')}
                  onRedeemReward={handleRedeemReward}
                  onConfirmContribution={handleConfirmContribution}
                  onNavigateVouchers={() => setActiveSubScreen('vouchers')}
                  onNavigateHistory={() => setActiveSubScreen('history')}
                />
              ) : mobileTab === 'ranking' ? (
                <RankingBadgeScreen
                  defaultMainTab={rankingDefaultTab}
                  onBack={() => setMobileTab('beranda')}
                />
              ) : (
                /* Profil Tab */
                <div className="space-y-4 pb-20">
                  <div className="pt-2">
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                      Profil Mahasiswa
                    </h1>
                  </div>

                  {/* ID Card */}
                  <div 
                    className="rounded-3xl p-5 text-white shadow-xl relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0284c7 100%)'
                    }}
                  >
                    <div 
                      className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-3xl"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)'
                      }}
                    />

                    <div className="relative z-10 flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md shrink-0">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider block">
                          {user.campusGreenLevel}
                        </span>
                        <h2 className="text-lg font-extrabold text-white leading-tight">
                          {user.fullName}
                        </h2>
                        <p className="text-xs text-emerald-100 font-medium mt-0.5">
                          NIM: {user.nim} · {user.facultyShort}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-sm">
                        <span className="text-[10px] text-emerald-100 uppercase font-semibold block">Total Sampah Disetor</span>
                        <span className="text-base font-bold text-white">{user.totalWasteKg} kg</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-sm">
                        <span className="text-[10px] text-emerald-100 uppercase font-semibold block">Emisi Karbon Dicegah</span>
                        <span className="text-base font-bold text-white">{user.co2SavedKg} kg CO₂</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setActiveSubScreen('vouchers')}
                      className="w-full py-3.5 px-4 rounded-2xl glass-aero-card hover:border-emerald-400 font-bold text-xs text-slate-900 flex items-center justify-between transition-all group shadow-sm"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">🎟️</span>
                        <span className="font-extrabold text-emerald-950">Voucher Saya (Kantin, Kopi & Toko FEB)</span>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          {userVouchers.filter((v) => v.status === 'aktif').length} Aktif
                        </span>
                      </span>
                      <span className="text-emerald-700 font-black group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </button>
                    <button
                      onClick={() => setViewMode('faculty')}
                      className="w-full py-3 px-4 rounded-2xl glass-aero-card hover:border-emerald-300 font-bold text-xs text-emerald-900 flex items-center justify-between transition-all"
                    >
                      <span>💻 Buka Faculty Green Dashboard</span>
                      <span>&rarr;</span>
                    </button>
                    <button
                      onClick={() => setViewMode('flowchart')}
                      className="w-full py-3 px-4 rounded-2xl glass-aero-card hover:border-cyan-300 font-bold text-xs text-cyan-900 flex items-center justify-between transition-all"
                    >
                      <span>🔄 Lihat Flowchart Alur Sistem RE-FLOW</span>
                      <span>&rarr;</span>
                    </button>
                    <button
                      onClick={() => setShowCampaignModal(true)}
                      className="w-full py-3 px-4 rounded-2xl glass-aero-card hover:border-amber-300 font-bold text-xs text-amber-900 flex items-center justify-between transition-all"
                    >
                      <span>🌍 Panduan & Kampanye Green Campus</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              )}
            </main>

            {/* Bottom Navigation Bar (5 tabs) */}
            <BottomNavBar
              activeTab={mobileTab}
              onChangeTab={(tab) => {
                setMobileTab(tab);
                setActiveSubScreen('none');
              }}
            />
          </div>
        </div>
      )}

      {/* Floating Dynamic Trigger Toast (Hook Model: Social proof & habit streak) */}
      <TriggerFloatingToast
        onQuickAction={() => {
          setViewMode('mobile');
          setMobileTab('setor');
          setActiveSubScreen('none');
        }}
      />

      {/* Floating Toast Notification for Actions */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-sm px-4 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        onOpenFacultyDashboard={() => {
          setViewMode('faculty');
          setShowProfileModal(false);
        }}
        onOpenFlowchart={() => {
          setViewMode('flowchart');
          setShowProfileModal(false);
        }}
        onOpenMyVouchers={() => {
          setViewMode('mobile');
          setActiveSubScreen('vouchers');
          setShowProfileModal(false);
        }}
      />

      <CampaignModal
        isOpen={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        onStartSetor={() => {
          setViewMode('mobile');
          setMobileTab('setor');
          setActiveSubScreen('none');
        }}
      />
    </div>
  );
}
