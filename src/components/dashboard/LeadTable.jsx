import React from 'react';
import { maskPhone } from '../../utils/formatters';

export function LeadTable({ leads }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ลูกค้า</th>
            <th>รถที่สนใจ</th>
            <th>สถานะ</th>
            <th>การขาย</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={4} className="empty-cell">
                ยังไม่มีข้อมูลลูกค้า
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <strong>{lead.name}</strong>
                  <small>{maskPhone(lead.phone)}</small>
                </td>
                <td>{lead.carId}</td>
                <td>
                  <span className="status-badge">{lead.leadStatus}</span>
                </td>
                <td>{lead.saleStatus}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
