import React, { useState, useMemo } from 'react';

export function CarLoanCalculator({ car }) {
  const carPrice = Number(car?.price) || 0;

  const [downPayment, setDownPayment] = useState(() => {
    return carPrice > 0 ? Math.min(40000, carPrice) : 40000;
  });
  const [rate, setRate] = useState(5.5);
  const [tenure, setTenure] = useState(60);

  // Sync if car changes
  React.useEffect(() => {
    if (carPrice > 0) {
      setDownPayment((prev) => Math.min(prev, carPrice));
    }
  }, [carPrice]);

  const { monthlyPayment, totalInterest, totalAmount } = useMemo(() => {
    const down = Number(downPayment) || 0;
    const r = Number(rate) || 0;
    const months = Number(tenure) || 1;

    const principal = Math.max(0, carPrice - down);
    const monthlyRate = r / 100 / 12;

    let monthly = 0;
    if (months <= 0 || principal <= 0) {
      monthly = 0;
    } else if (monthlyRate === 0) {
      monthly = principal / months;
    } else {
      monthly = (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
    }

    const total = monthly * months;
    const interest = total - principal;

    return {
      monthlyPayment: Math.round(monthly),
      totalInterest: Math.round(interest),
      totalAmount: Math.round(total),
    };
  }, [carPrice, downPayment, rate, tenure]);

  const formatCurrency = (val) => '฿' + Math.round(val).toLocaleString('th-TH');

  return (
    <div className="minimal-loan-calc">
      <div className="calc-header-row">
        <span className="desc-sublabel">คำนวณค่างวดผ่อนเบื้องต้น</span>
      </div>

      <div className="sliders-box">
        <div className="slider-group">
          <div className="slider-label-wrap">
            <label htmlFor="down-payment-input" className="slider-label">เงินดาวน์ payment</label>
            <span className="slider-value">{formatCurrency(downPayment)}</span>
          </div>
          <div className="slider-wrapper">
            <input
              id="down-payment-input"
              type="range"
              min="0"
              max={carPrice || 500000}
              value={downPayment}
              step={carPrice > 100000 ? 5000 : 1000}
              onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-label-wrap">
            <label htmlFor="rate-input" className="slider-label">อัตราดอกเบี้ยต่อปี (%)</label>
            <span className="slider-value">{rate.toFixed(1)}%</span>
          </div>
          <div className="slider-wrapper">
            <input
              id="rate-input"
              type="range"
              min="1"
              max="15"
              value={rate}
              step="0.1"
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-label-wrap">
            <label htmlFor="tenure-input" className="slider-label">ระยะเวลาผ่อน (เดือน)</label>
            <span className="slider-value">{tenure} เดือน</span>
          </div>
          <div className="slider-wrapper">
            <input
              id="tenure-input"
              type="range"
              min="12"
              max="84"
              value={tenure}
              step="6"
              onChange={(e) => setTenure(parseFloat(e.target.value) || 12)}
            />
          </div>
        </div>
      </div>

      <div className="results-grid">
        <div className="result-card result-blue">
          <div className="result-label">ยอดผ่อนรายเดือน</div>
          <div className="result-value text-blue">{formatCurrency(monthlyPayment)}</div>
          <div className="result-subtext">ต่อเดือน</div>
        </div>
        <div className="result-card result-orange">
          <div className="result-label">รวมดอกเบี้ย</div>
          <div className="result-value text-orange">{formatCurrency(totalInterest)}</div>
          <div className="result-subtext">ทั้งสิ้น</div>
        </div>
        <div className="result-card result-neutral">
          <div className="result-label">ยอดรวมทั้งสิ้น</div>
          <div className="result-value text-dark">{formatCurrency(totalAmount)}</div>
          <div className="result-subtext">รวมทั้งหมด</div>
        </div>
      </div>
    </div>
  );
}

export default CarLoanCalculator;