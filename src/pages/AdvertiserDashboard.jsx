import React from 'react';
import AppShell from '../layouts/AppShell';
import StatCard from '../components/common/StatCard';
import AdvertiserInventory from '../components/car/AdvertiserInventory';
import StorefrontImageUpload from '../components/common/StorefrontImageUpload';

export function AdvertiserDashboard({
  advertiser,
  onUpdate,
  cars,
  setCars,
  tab,
  setTab,
  onLogout,
  showToast,
}) {
  const tabs = [
    { id: 'overview', label: 'ภาพรวม', icon: '⌂' },
    { id: 'inventory', label: 'รถของฉัน', icon: '▣' },
    { id: 'store', label: 'หน้าร้าน', icon: '◇' },
    { id: 'profile', label: 'บัญชีร้าน', icon: '○' },
  ];

  const myCars = cars.filter((c) => c.advertiserId === advertiser.id);

  return (
    <AppShell
      role="เต็นท์รถ (Advertiser)"
      name={advertiser.storeName}
      tabs={tabs}
      activeTab={tab}
      onTab={setTab}
      onLogout={onLogout}
    >
      {tab === 'overview' && (
        <>
          <div className="page-title">
            <h1>ภาพรวมเต็นท์รถ</h1>
            <p>{advertiser.storeName} ({advertiser.province})</p>
          </div>
          <div className="stats-grid three">
            <StatCard
              label="รถในสต็อก"
              value={`${myCars.length} คัน`}
              note="ประกาศพร้อมขาย"
              icon="▣"
            />
            <StatCard
              label="สถานะเต็นท์"
              value={advertiser.status === 'approved' ? 'อนุมัติแล้ว' : 'รอตรวจสอบ'}
              note="ยืนยันตัวตนแล้ว"
              icon="✓"
            />
          </div>
        </>
      )}

      {tab === 'inventory' && (
        <AdvertiserInventory
          advertiser={advertiser}
          cars={cars}
          setCars={setCars}
          showToast={showToast}
        />
      )}

      {tab === 'store' && (
        <div className="panel">
          <h2>จัดการข้อมูลหน้าร้าน</h2>
          <StorefrontImageUpload
            image={advertiser.storefrontImageUrl}
            onChange={(url) => onUpdate({ ...advertiser, storefrontImageUrl: url })}
            showToast={showToast}
          />
        </div>
      )}

      {tab === 'profile' && (
        <div className="panel">
          <h2>ข้อมูลบัญชีเต็นท์รถ</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('บันทึกข้อมูลเรียบร้อยแล้ว');
            }}
          >
            <label>
              <span>ชื่อเต็นท์รถ</span>
              <input type="text" defaultValue={advertiser.storeName} />
            </label>
            <label>
              <span>ชื่อผู้ติดต่อ</span>
              <input type="text" defaultValue={advertiser.ownerName} />
            </label>
            <label>
              <span>เบอร์โทรศัพท์</span>
              <input type="text" defaultValue={advertiser.phone} />
            </label>
            <label>
              <span>จังหวัด</span>
              <input type="text" defaultValue={advertiser.province} />
            </label>
            <button type="submit" className="button">
              บันทึกการเปลี่ยนแปลง
            </button>
          </form>
        </div>
      )}
    </AppShell>
  );
}

export default AdvertiserDashboard;
