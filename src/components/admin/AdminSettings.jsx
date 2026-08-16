import React, { useState } from 'react';

export function AdminSettings({ showToast }) {
  const [firstTouchDays, setFirstTouchDays] = useState(30);
  const [defaultAgentShare, setDefaultAgentShare] = useState(70);
  const [enableOtp, setEnableOtp] = useState(false);
  const [enableLeaderboard, setEnableLeaderboard] = useState(false);

  return (
    <>
      <div className="page-title">
        <div>
          <h1>ตั้งค่าระบบ</h1>
          <p>กำหนดส่วนแบ่งค่าคอมมิชชัน กฎ First-touch และฟีเจอร์ของแพลตฟอร์ม</p>
        </div>
      </div>

      <div className="settings-grid">
        <section className="panel">
          <h2>กฎรายได้และส่วนแบ่ง</h2>
          
          <label>
            <span>ระยะเวลา First-touch คุ้มครองนายหน้า</span>
            <input
              type="number"
              value={firstTouchDays}
              onChange={(e) => setFirstTouchDays(Number(e.target.value))}
            />
            <span>วัน</span>
          </label>

          <label>
            <span>ส่วนแบ่งค่าคอมมิชชันนายหน้า (ค่ากลาง)</span>
            <input
              type="number"
              value={defaultAgentShare}
              onChange={(e) => setDefaultAgentShare(Number(e.target.value))}
            />
            <span>%</span>
          </label>

          <p className="hint" style={{ marginTop: '14px' }}>
            * เมื่อ Advertiser ลงประกาศและเสนอค่าคอมมิชชันรวม แพลตฟอร์มจะคำนวณส่วนแบ่งให้นายหน้าอัตโนมัติตาม % ค่ากลางนี้
          </p>

          <button
            type="button"
            className="button"
            style={{ marginTop: '18px' }}
            onClick={() => showToast('บันทึกการตั้งค่าระบบเรียบร้อยแล้ว')}
          >
            บันทึกการตั้งค่า
          </button>
        </section>

        <section className="panel">
          <h2>ฟีเจอร์และความปลอดภัย</h2>

          <button
            type="button"
            className="toggle-row"
            onClick={() => setEnableOtp(!enableOtp)}
          >
            <span>ระบบยืนยันตัวตน OTP สมัครสมาชิก</span>
            <i className={enableOtp ? 'on' : ''}>
              <b />
            </i>
          </button>

          <button
            type="button"
            className="toggle-row"
            onClick={() => setEnableLeaderboard(!enableLeaderboard)}
          >
            <span>แสดงอันดับนายหน้ายอดเยี่ยมประจำเดือน (Leaderboard)</span>
            <i className={enableLeaderboard ? 'on' : ''}>
              <b />
            </i>
          </button>
        </section>
      </div>
    </>
  );
}

export default AdminSettings;
