import React from 'react';
import AppShell from '../layouts/AppShell';
import StatCard from '../components/common/StatCard';
import LeadTable from '../components/dashboard/LeadTable';
import AgentCarList from '../components/car/AgentCarList';
import { formatNumber } from '../utils/formatters';

export function AgentDashboard({ agent, cars, leads, tab, setTab, onLogout, onPreview, showToast }) {
  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: '⌂' },
    { id: 'cars', label: 'เลือกรถ', icon: '▣' },
    { id: 'leads', label: 'ลูกค้าของฉัน', icon: '♙' },
    { id: 'income', label: 'รายได้', icon: '฿' },
    { id: 'profile', label: 'โปรไฟล์', icon: '○' },
  ];

  const myLeads = leads.filter((l) => l.agentCode === agent.code);
  const totalIncome = myLeads
    .filter((l) => l.payoutStatus === 'โอนเงินสำเร็จแล้ว')
    .reduce((sum, l) => sum + 7000, 0); // sample payout sum

  return (
    <AppShell
      role="นายหน้า (Agent)"
      name={agent.name}
      tabs={tabs}
      activeTab={tab}
      onTab={setTab}
      onLogout={onLogout}
    >
      {tab === 'overview' && (
        <>
          <div className="page-title">
            <h1>ภาพรวม Dashboard</h1>
            <p>รหัสนายหน้าของคุณ: <strong>{agent.code}</strong></p>
          </div>
          <div className="stats-grid three">
            <StatCard
              label="ลูกค้าทั้งหมด"
              value={`${myLeads.length} คน`}
              note="ที่ส่งผ่านลิงก์ของคุณ"
              icon="♙"
            />
            <StatCard
              label="รถที่แชร์ได้"
              value={`${cars.length} คัน`}
              note="มีคอมมิชชันพร้อมจ่าย"
              icon="▣"
            />
            <StatCard
              label="รายได้สะสม"
              value={`฿${formatNumber(totalIncome)}`}
              note="โอนเข้าบัญชีสำเร็จ"
              icon="฿"
              orange
            />
          </div>
          <div className="panel gap-top">
            <h2>ลูกค้าร่าสุดของฉัน</h2>
            <LeadTable leads={myLeads.slice(0, 5)} />
          </div>
        </>
      )}

      {tab === 'cars' && (
        <AgentCarList
          cars={cars}
          agent={agent}
          onPreview={onPreview}
          showToast={showToast}
        />
      )}

      {tab === 'leads' && (
        <>
          <div className="page-title">
            <h1>รายชื่อลูกค้าของฉัน</h1>
            <p>รายชื่อผู้สนใจซื้อรถที่คลิกผ่านลิงก์นายหน้าของคุณ</p>
          </div>
          <div className="panel">
            <LeadTable leads={myLeads} />
          </div>
        </>
      )}

      {tab === 'income' && (
        <>
          <div className="page-title">
            <h1>รายได้ของฉัน</h1>
            <p>ระบบแสดงเฉพาะค่าคอมมิชชันส่วนที่คุณได้รับ</p>
          </div>
          <div className="stats-grid three">
            <StatCard
              label="รายได้สะสม"
              value={`฿${formatNumber(totalIncome)}`}
              note="โอนสำเร็จแล้ว"
              icon="฿"
              orange
            />
            <StatCard
              label="รออนุมัติโอน"
              value="฿0"
              note="อยู่ระหว่างตรวจสอบ"
              icon="⌛"
            />
          </div>
        </>
      )}

      {tab === 'profile' && (
        <>
          <div className="page-title">
            <h1>โปรไฟล์และการรับเงิน</h1>
            <p>คุณสามารถเพิ่มข้อมูลที่จำเป็นภายหลังได้</p>
          </div>
          <section className="panel profile-panel">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast('บันทึกข้อมูลโปรไฟล์เรียบร้อย');
              }}
            >
              <label>
                <span>ชื่อ-นามสกุล</span>
                <input type="text" defaultValue={agent.name} readOnly />
              </label>
              <label>
                <span>รหัสนายหน้า</span>
                <input type="text" defaultValue={agent.code} readOnly />
              </label>
              <label>
                <span>เบอร์โทรศัพท์</span>
                <input type="text" defaultValue={agent.phone} />
              </label>
              <label>
                <span>บัญชีธนาคารรับเงิน</span>
                <input type="text" placeholder="กสิกรไทย 123-4-56789-0" />
              </label>
              <button type="submit" className="button">
                บันทึกข้อมูลโปรไฟล์
              </button>
            </form>
          </section>
        </>
      )}
    </AppShell>
  );
}

export default AgentDashboard;
