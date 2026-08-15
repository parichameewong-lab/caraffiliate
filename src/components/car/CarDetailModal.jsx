import React, { useState } from 'react';
import { formatNumber, getCarImages, generateId } from '../../utils/formatters';
import { createConversation } from '../../services/api';

export function CarDetailModal({ car, agents, attribution, onBack, onLead }) {
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'lead'

  // Chat tab state
  const [chatName, setChatName] = useState('');
  const [chatPhone, setChatPhone] = useState('');
  const [chatMsg, setChatMsg] = useState('');
  const [chatPrivacyAccepted, setChatPrivacyAccepted] = useState(true);
  const [chatSent, setChatSent] = useState(false);

  // Lead tab state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadLine, setLeadLine] = useState('');
  const [leadContactTime, setLeadContactTime] = useState('13:00–16:00 น.');
  const [leadPrivacyAccepted, setLeadPrivacyAccepted] = useState(true);

  if (!car) return null;

  const agentObj = agents?.find((a) => a.code === attribution);
  const images = getCarImages(car);

  const quickQuestions = [
    'รถยังอยู่ไหมครับ?',
    'ราคาต่อรองได้อีกไหมครับ?',
    'ขอรายละเอียดการจัดไฟแนนซ์ครับ',
    'นัดดูรถได้วันไหนครับ?',
  ];

  const handleQuickQuestionClick = (qText) => {
    setChatMsg(qText);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadPrivacyAccepted) {
      alert('กรุณายอมรับนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล');
      return;
    }

    setSubmitting(true);

    const newLead = {
      id: `lead-${generateId()}`,
      carId: car.id,
      agentCode: attribution || 'PLATFORM',
      name: leadName.trim(),
      phone: leadPhone.trim(),
      line: leadLine.trim(),
      contactTime: leadContactTime,
      createdAt: new Date().toISOString(),
      leadStatus: 'รอนัดหมาย',
      saleStatus: 'สนใจรถ',
      payoutStatus: 'ยังไม่เกิดสิทธิ์',
    };

    onLead(newLead);
    setSubmitting(false);
  };

  const handleChatSend = async (e) => {
    e.preventDefault();
    if (!chatPrivacyAccepted) {
      alert('กรุณายอมรับนโยบายความเป็นส่วนตัวก่อนส่งข้อมูล');
      return;
    }
    if (!chatMsg.trim()) return;

    setSubmitting(true);
    try {
      const fullMessage = `[ผู้สนทนา: ${chatName || 'ไม่ระบุชื่อ'} | เบอร์: ${chatPhone || 'ไม่ระบุเบอร์'}] ${chatMsg}`;
      await createConversation(car.id, attribution, fullMessage);
      setChatSent(true);
    } catch {
      setChatSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="customer-page">
      <div className="container">
        <button className="back-link" onClick={onBack}>
          ← กลับหน้าค้นหารถ
        </button>

        <div className="detail-grid">
          {/* Left Column - Car Presentation & Info */}
          <div className="detail-left-column">
            <div className="detail-gallery">
              <div className="main-photo" style={{ background: car.tone }}>
                <div className="hero-selected-badge">CLUBROD SELECTED CAR</div>
                {images[0] ? (
                  <img src={images[0]} alt={car.title} />
                ) : (
                  <div className="photo-placeholder">{car.brand?.toUpperCase()}</div>
                )}
              </div>
              {images.length > 1 && (
                <div className="sub-photos">
                  {images.slice(1).map((img, i) => (
                    <img key={i} src={img} alt={`${car.title} ${i + 2}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="car-header-card">
              <div className="car-header-left">
                <span className="brand-sublabel">รถคัดสภาพจาก CLUBROD</span>
                <h1 className="car-main-title">{car.title}</h1>
                <p className="car-specs-subtitle">
                  {car.year} · เกียร์{car.transmission || 'อัตโนมัติ'} · รถพร้อมใช้งาน
                </p>
              </div>
              <div className="car-header-right">
                <div className="car-main-price">฿{formatNumber(car.price)}</div>
                {car.monthlyPayment && (
                  <div className="car-monthly-price">
                    ผ่อนเริ่มต้น ฿{formatNumber(car.monthlyPayment)}/เดือน
                  </div>
                )}
              </div>
            </div>

            <div className="car-desc-card">
              <span className="desc-sublabel">รายละเอียดรถเบื้องต้น</span>
              <p className="desc-text">
                {car.description || 'อีโคคาร์ประหยัดน้ำมัน ห้องโดยสารกว้าง คล่องตัว เหมาะกับการใช้งานในเมือง'}
              </p>
            </div>

            <div className="trust-chips-row">
              <span className="trust-chip">✓ ตรวจสอบข้อมูลรถ</span>
              <span className="trust-chip">✓ ทีมงานช่วยประสาน</span>
              <span className="trust-chip">✓ ดูรถก่อนตัดสินใจ</span>
            </div>

            <div className="bottom-cards-row">
              <div className="doc-card">
                <span className="doc-card-sublabel">เอกสารประกอบรถคันนี้</span>
                <div className="doc-status-box">
                  <span className="pdf-tag">PDF</span>
                  {car.inspectionReportUrl ? (
                    <a href={car.inspectionReportUrl} target="_blank" rel="noreferrer" className="doc-link">
                      ดูรายงานการตรวจสภาพ (PDF) →
                    </a>
                  ) : (
                    <span className="doc-none-text">ยังไม่มีรายงานตรวจสภาพ</span>
                  )}
                </div>
              </div>

              <div className="coupon-card">
                <div className="coupon-top-content">
                  <div className="coupon-icon-box">✓</div>
                  <div className="coupon-text-group">
                    <span className="coupon-sublabel">สิทธิพิเศษสำหรับผู้ซื้อรถคันนี้</span>
                    <h4 className="coupon-title">คูปองตรวจสภาพรถฟรี</h4>
                    <p className="coupon-desc">
                      มูลค่า <strong>1,500 บาท</strong> · เมื่อซื้อรถสำเร็จ รับเงินสดตามมูลค่าคูปอง
                    </p>
                  </div>
                  <button type="button" className="coupon-cta-btn" onClick={() => setActiveTab('lead')}>
                    ขอรับสิทธิ์
                  </button>
                </div>
                <p className="coupon-disclaimer">
                  การรับเงินสดเกิดขึ้นหลังยืนยันการซื้อรถสำเร็จ และเป็นไปตามเงื่อนไขของแพลตฟอร์ม
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card & Direct Contact Widget */}
          <div className="detail-right-column">
            <div className="lead-card-box">
              <div className="action-tabs-bar">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                  onClick={() => setActiveTab('chat')}
                >
                  แชทกับทีมงาน
                </button>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'lead' ? 'active' : ''}`}
                  onClick={() => setActiveTab('lead')}
                >
                  ให้ติดต่อกลับ
                </button>
              </div>

              {activeTab === 'chat' ? (
                <div className="tab-form-content">
                  <span className="lead-subtitle">สอบถามรถคันนี้</span>
                  <h2 className="lead-title">แชทกับทีม CLUBROD</h2>
                  <p className="lead-desc">ส่งคำถามถึงแอดมิน พร้อมแนบข้อมูลรถคันนี้ให้อัตโนมัติ</p>

                  {chatSent ? (
                    <div className="chat-success-msg">
                      ✓ ส่งข้อความเรียบร้อยแล้ว ทีมงานจะตอบกลับโดยเร็วที่สุด
                    </div>
                  ) : (
                    <form onSubmit={handleChatSend} className="lead-form-grid">
                      <label className="form-field">
                        <span className="field-label">ชื่อ</span>
                        <input
                          type="text"
                          required
                          placeholder="ชื่อสำหรับสนทนา"
                          value={chatName}
                          onChange={(e) => setChatName(e.target.value)}
                        />
                      </label>

                      <label className="form-field">
                        <span className="field-label">เบอร์โทรศัพท์</span>
                        <input
                          type="tel"
                          required
                          placeholder="08X-XXX-XXXX"
                          value={chatPhone}
                          onChange={(e) => setChatPhone(e.target.value)}
                        />
                      </label>

                      <div className="form-field">
                        <span className="field-label">เลือกคำถามด่วน</span>
                        <div className="quick-chips">
                          {quickQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              type="button"
                              className="chip-btn"
                              onClick={() => handleQuickQuestionClick(q)}
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>

                      <label className="form-field">
                        <span className="field-label">คำถามของคุณ</span>
                        <textarea
                          rows={3}
                          required
                          placeholder={`เช่น ${car.title} ยังอยู่ไหมครับ?`}
                          value={chatMsg}
                          onChange={(e) => setChatMsg(e.target.value)}
                        />
                      </label>

                      <label className="privacy-checkbox">
                        <input
                          type="checkbox"
                          checked={chatPrivacyAccepted}
                          onChange={(e) => setChatPrivacyAccepted(e.target.checked)}
                        />
                        <span>ยอมรับนโยบายความเป็นส่วนตัว</span>
                      </label>

                      <button type="submit" disabled={submitting} className="orange-submit-btn">
                        {submitting ? 'กำลังส่งข้อมูล...' : 'เริ่มแชทกับทีมงาน →'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="tab-form-content">
                  <span className="lead-subtitle">สนใจรถคันนี้?</span>
                  <h2 className="lead-title">ให้ทีมงานติดต่อกลับ</h2>
                  <p className="lead-desc">กรอกข้อมูลสั้น ๆ ทีม CLUBROD จะช่วยประสานและตอบคำถามให้คุณ</p>

                  <form onSubmit={handleLeadSubmit} className="lead-form-grid">
                    <label className="form-field">
                      <span className="field-label">ชื่อ</span>
                      <input
                        type="text"
                        required
                        placeholder="ชื่อสำหรับติดต่อ"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                      />
                    </label>

                    <label className="form-field">
                      <span className="field-label">เบอร์โทรศัพท์</span>
                      <input
                        type="tel"
                        required
                        placeholder="08X-XXX-XXXX"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                      />
                    </label>

                    <label className="form-field">
                      <span className="field-label">
                        LINE ID <small className="optional-tag">(ไม่บังคับ)</small>
                      </span>
                      <input
                        type="text"
                        placeholder="LINE ID"
                        value={leadLine}
                        onChange={(e) => setLeadLine(e.target.value)}
                      />
                    </label>

                    <label className="form-field">
                      <span className="field-label">เวลาที่สะดวกให้ติดต่อ</span>
                      <select
                        value={leadContactTime}
                        onChange={(e) => setLeadContactTime(e.target.value)}
                      >
                        <option value="13:00–16:00 น.">13:00–16:00 น.</option>
                        <option value="09:00–12:00 น.">09:00–12:00 น.</option>
                        <option value="17:00–20:00 น.">17:00–20:00 น.</option>
                      </select>
                    </label>

                    <label className="privacy-checkbox">
                      <input
                        type="checkbox"
                        checked={leadPrivacyAccepted}
                        onChange={(e) => setLeadPrivacyAccepted(e.target.checked)}
                      />
                      <span>ยอมรับนโยบายความเป็นส่วนตัว</span>
                    </label>

                    <button type="submit" disabled={submitting} className="orange-submit-btn">
                      {submitting ? 'กำลังส่งข้อมูล...' : 'ขอให้ติดต่อกลับ →'}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Direct Contact Box */}
            <div className="direct-contact-card">
              <h4 className="contact-card-title">ต้องการติดต่อทีมงานโดยตรง?</h4>
              <p className="contact-card-sub">โทรหาเรา หรือแชทผ่าน LINE ได้ทันที</p>
              <div className="contact-buttons-grid">
                <a href="tel:0980064452" className="contact-tile phone-tile">
                  <span className="contact-tile-icon">☎</span>
                  <div className="contact-tile-text">
                    <small>โทรสอบถาม</small>
                    <strong>098-006-4452</strong>
                  </div>
                </a>
                <a href="https://line.me" target="_blank" rel="noreferrer" className="contact-tile line-tile">
                  <span className="contact-tile-icon line-icon">LINE</span>
                  <div className="contact-tile-text">
                    <small>สอบถามผ่าน</small>
                    <strong>แชท LINE</strong>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetailModal;
