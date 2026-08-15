import React from 'react';

export function AdminPayoutManager({ leads, updateLead, showToast }) {
  const eligibleLeads = leads.filter(
    (l) => l.agentCode !== 'PLATFORM' && (l.saleStatus === 'ส่งมอบสำเร็จ' || l.payoutStatus !== 'ยังไม่เกิดสิทธิ์')
  );

  return (
    <>
      <div className="page-title">
        <h1>อนุมัติและจ่ายค่าคอมมิชชัน</h1>
        <p>เฉพาะยอดขายจากลิงก์นายหน้าเท่านั้น ลูกค้าโดยตรงเป็นรายได้แพลตฟอร์ม</p>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ลูกค้า</th>
              <th>รหัสนายหน้า</th>
              <th>สถานะการขาย</th>
              <th>สถานะจ่ายเงิน</th>
              <th>ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {eligibleLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-cell">
                  ไม่มีรายการรออนุมัติจ่ายค่าคอมมิชชัน
                </td>
              </tr>
            ) : (
              eligibleLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <strong>{lead.name}</strong>
                    <small>{lead.phone}</small>
                  </td>
                  <td>{lead.agentCode}</td>
                  <td>{lead.saleStatus}</td>
                  <td>
                    <span className="status-badge">{lead.payoutStatus}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="button small"
                      onClick={() => {
                        updateLead(lead.id, { payoutStatus: 'โอนเงินสำเร็จแล้ว' });
                        showToast(`อนุมัติโอนเงินให้ ${lead.agentCode} เรียบร้อย`);
                      }}
                    >
                      อนุมัติโอนเงิน
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminPayoutManager;
