import React from 'react';
import AppShell from '../layouts/AppShell';
import StatCard from '../components/common/StatCard';
import AdminCarManager from '../components/car/AdminCarManager';
import AdminPayoutManager from '../components/car/AdminPayoutManager';
import ChatWidget from '../components/common/ChatWidget';
import SupabaseGuide from '../components/common/SupabaseGuide';
import LeadTable from '../components/dashboard/LeadTable';

export function AdminDashboard({
  agents,
  setAgents,
  advertisers,
  setAdvertisers,
  cars,
  setCars,
  leads,
  setLeads,
  tab,
  setTab,
  onLogout,
  showToast,
}) {
  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: '⌂' },
    { id: 'messages', label: 'ข้อความ', icon: '✉' },
    { id: 'agents', label: 'นายหน้า', icon: '♙' },
    { id: 'advertisers', label: 'Advertiser', icon: '◇' },
    { id: 'cars', label: 'จัดการรถ', icon: '▣' },
    { id: 'leads', label: 'ลูกค้า', icon: '👤' },
    { id: 'payouts', label: 'ค่าคอมฯ', icon: '฿' },
    { id: 'supabase', label: 'Supabase', icon: '⚙' },
  ];

  const updateLead = (leadId, updates) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, ...updates } : l)));
  };

  const approveAgent = (id) => {
    setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a)));
    showToast('อนุมัตินายหน้าเรียบร้อยแล้ว');
  };

  const approveAdvertiser = (id) => {
    setAdvertisers((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a)));
    showToast('อนุมัติเต็นท์รถเรียบร้อยแล้ว');
  };

  return (
    <AppShell
      role="ผู้ดูแลระบบ (Admin)"
      name="Admin"
      tabs={tabs}
      activeTab={tab}
      onTab={setTab}
      onLogout={onLogout}
    >
      {tab === 'overview' && (
        <>
          <div className="page-title">
            <h1>ภาพรวมระบบผู้ดูแลระบบ (Admin)</h1>
            <p>สรุปสถิติผู้ใช้งาน รายการรถ และยอดขายในระบบ</p>
          </div>
          <div className="stats-grid four">
            <StatCard label="นายหน้าทั้งหมด" value={`${agents.length} คน`} note="นายหน้าในระบบ" icon="♙" />
            <StatCard label="เต็นท์รถ" value={`${advertisers.length} แห่ง`} note="ผู้ประกอบการ" icon="◇" />
            <StatCard label="รถทั้งหมด" value={`${cars.length} คัน`} note="รายการรถมือสอง" icon="▣" />
            <StatCard label="ลูกค้าสนใจ" value={`${leads.length} ราย`} note="Leads สะสม" icon="👤" orange />
          </div>
        </>
      )}

      {tab === 'messages' && <ChatWidget showToast={showToast} />}

      {tab === 'agents' && (
        <div className="panel">
          <h2>จัดการสมาชิกนายหน้า</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ชื่อ-นามสกุล</th>
                  <th>รหัส</th>
                  <th>อีเมล</th>
                  <th>เบอร์โทร</th>
                  <th>สถานะ</th>
                  <th>การกระทำ</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id}>
                    <td><strong>{agent.name}</strong></td>
                    <td>{agent.code}</td>
                    <td>{agent.email}</td>
                    <td>{agent.phone}</td>
                    <td>
                      <span className={`status-badge ${agent.status}`}>
                        {agent.status === 'approved' ? 'อนุมัติแล้ว' : 'รอตรวจสอบ'}
                      </span>
                    </td>
                    <td>
                      {agent.status === 'pending' && (
                        <button
                          type="button"
                          className="button small"
                          onClick={() => approveAgent(agent.id)}
                        >
                          อนุมัติ
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'advertisers' && (
        <div className="panel">
          <h2>จัดการเต็นท์รถ (Advertiser)</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ชื่อเต็นท์</th>
                  <th>เจ้าของ</th>
                  <th>จังหวัด</th>
                  <th>เบอร์โทร</th>
                  <th>สถานะ</th>
                  <th>การกระทำ</th>
                </tr>
              </thead>
              <tbody>
                {advertisers.map((adv) => (
                  <tr key={adv.id}>
                    <td><strong>{adv.storeName}</strong></td>
                    <td>{adv.ownerName}</td>
                    <td>{adv.province}</td>
                    <td>{adv.phone}</td>
                    <td>
                      <span className={`status-badge ${adv.status}`}>
                        {adv.status === 'approved' ? 'อนุมัติแล้ว' : 'รอตรวจสอบ'}
                      </span>
                    </td>
                    <td>
                      {adv.status === 'pending' && (
                        <button
                          type="button"
                          className="button small"
                          onClick={() => approveAdvertiser(adv.id)}
                        >
                          อนุมัติ
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'cars' && (
        <AdminCarManager
          cars={cars}
          setCars={setCars}
          advertisers={advertisers}
          showToast={showToast}
        />
      )}

      {tab === 'leads' && (
        <div className="panel">
          <h2>จัดการข้อมูลลูกค้า (Leads)</h2>
          <LeadTable leads={leads} />
        </div>
      )}

      {tab === 'payouts' && (
        <AdminPayoutManager
          leads={leads}
          updateLead={updateLead}
          showToast={showToast}
        />
      )}

      {tab === 'supabase' && <SupabaseGuide showToast={showToast} />}
    </AppShell>
  );
}

export default AdminDashboard;
