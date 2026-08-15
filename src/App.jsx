import React, { useState, useEffect } from 'react';
import { getStorage, setStorage, KEYS } from './services/storage';
import { initialAgents, initialAdvertisers, initialCars, initialLeads } from './data/initialData';
import Home from './pages/Home';
import AgentDashboard from './pages/AgentDashboard';
import AdvertiserDashboard from './pages/AdvertiserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CarDetailModal from './components/car/CarDetailModal';
import LoginForm from './components/auth/LoginForm';
import AgentRegisterForm from './components/auth/AgentRegisterForm';
import AdvertiserRegisterForm from './components/auth/AdvertiserRegisterForm';
import Toast from './components/common/Toast';
import './styles/index.css';

export function App() {
  const [view, setView] = useState('home');
  const [agents, setAgents] = useState(initialAgents);
  const [advertisers, setAdvertisers] = useState(initialAdvertisers);
  const [cars, setCars] = useState(initialCars);
  const [leads, setLeads] = useState(initialLeads);

  const [currentAgent, setCurrentAgent] = useState(null);
  const [currentAdvertiser, setCurrentAdvertiser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(initialCars[0]);

  const [agentTab, setAgentTab] = useState('overview');
  const [adminTab, setAdminTab] = useState('overview');
  const [advertiserTab, setAdvertiserTab] = useState('overview');

  const [includeAdmin, setIncludeAdmin] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [attribution, setAttribution] = useState('PLATFORM');

  // Initial localStorage load and URL parameter check
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedAgents = getStorage(KEYS.AGENTS, initialAgents);
      const storedAdvertisers = getStorage(KEYS.ADVERTISERS, initialAdvertisers);
      const storedCars = getStorage(KEYS.CARS, initialCars);
      const storedLeads = getStorage(KEYS.LEADS, initialLeads);

      setAgents(storedAgents);
      setAdvertisers(storedAdvertisers);
      setCars(storedCars);
      setLeads(storedLeads);

      const params = new URLSearchParams(window.location.search);
      const carId = params.get('car');
      const refCode = params.get('ref');

      if (carId) {
        const foundCar = storedCars.find((c) => c.id === carId);
        if (foundCar) setSelectedCar(foundCar);
        setView('customer');

        try {
          const firstTouch = JSON.parse(localStorage.getItem(KEYS.FIRST_TOUCH) || 'null');
          const isFresh = firstTouch && Date.now() - firstTouch.createdAt < 30 * 24 * 60 * 60 * 1000;

          if (refCode && !isFresh) {
            localStorage.setItem(
              KEYS.FIRST_TOUCH,
              JSON.stringify({ agentCode: refCode, createdAt: Date.now() })
            );
            setAttribution(refCode);
          } else if (isFresh) {
            setAttribution(firstTouch.agentCode);
          } else {
            localStorage.removeItem(KEYS.FIRST_TOUCH);
            setAttribution('PLATFORM');
          }
        } catch {
          setAttribution('PLATFORM');
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    setStorage(KEYS.AGENTS, agents);
  }, [agents]);

  useEffect(() => {
    setStorage(KEYS.ADVERTISERS, advertisers);
  }, [advertisers]);

  useEffect(() => {
    setStorage(KEYS.CARS, cars);
  }, [cars]);

  useEffect(() => {
    setStorage(KEYS.LEADS, leads);
  }, [leads]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2800);
  };

  const handleBackToHome = () => {
    window.history.replaceState({}, '', window.location.pathname);
    setView('home');
    setCurrentAgent(null);
    setCurrentAdvertiser(null);
  };

  const handleSelectCar = (car, refCode) => {
    setSelectedCar(car);
    if (refCode) {
      setAttribution(refCode);
    } else {
      try {
        const firstTouch = JSON.parse(localStorage.getItem(KEYS.FIRST_TOUCH) || 'null');
        const isFresh = firstTouch && Date.now() - firstTouch.createdAt < 30 * 24 * 60 * 60 * 1000;
        setAttribution(isFresh ? firstTouch.agentCode : 'PLATFORM');
      } catch {
        setAttribution('PLATFORM');
      }
    }

    const query = refCode ? `?ref=${refCode}&car=${car.id}` : `?car=${car.id}`;
    window.history.replaceState({}, '', query);
    setView('customer');
  };

  return (
    <main>
      {view === 'home' && (
        <Home
          cars={cars}
          onRegister={() => setView('register')}
          onAdvertiserRegister={() => setView('advertiser-register')}
          onLogin={() => {
            setIncludeAdmin(true);
            setView('login');
          }}
          onMobileLogin={() => {
            setIncludeAdmin(false);
            setView('login');
          }}
          onSelect={handleSelectCar}
        />
      )}

      {view === 'register' && (
        <AgentRegisterForm
          onBack={handleBackToHome}
          onComplete={(newAgent) => {
            setAgents((prev) => [...prev, newAgent]);
            setView('login');
            showToast('สมัครสำเร็จ กรุณารอแอดมินอนุมัติบัญชี');
          }}
        />
      )}

      {view === 'advertiser-register' && (
        <AdvertiserRegisterForm
          onBack={handleBackToHome}
          onComplete={(newAdvertiser) => {
            setAdvertisers((prev) => [...prev, newAdvertiser]);
            setView('login');
            showToast('ส่งใบสมัครเต็นท์แล้ว กรุณารอแอดมินอนุมัติ');
          }}
        />
      )}

      {view === 'login' && (
        <LoginForm
          agents={agents}
          advertisers={advertisers}
          includeAdmin={includeAdmin}
          onBack={handleBackToHome}
          onAgent={(agent) => {
            setCurrentAgent(agent);
            setView('agent');
          }}
          onAdmin={() => setView('admin')}
          onAdvertiser={(adv) => {
            setCurrentAdvertiser(adv);
            setView('advertiser');
          }}
        />
      )}

      {view === 'agent' && currentAgent && (
        <AgentDashboard
          agent={currentAgent}
          cars={cars}
          leads={leads}
          tab={agentTab}
          setTab={setAgentTab}
          onLogout={handleBackToHome}
          onPreview={handleSelectCar}
          showToast={showToast}
        />
      )}

      {view === 'admin' && (
        <AdminDashboard
          agents={agents}
          setAgents={setAgents}
          advertisers={advertisers}
          setAdvertisers={setAdvertisers}
          cars={cars}
          setCars={setCars}
          leads={leads}
          setLeads={setLeads}
          tab={adminTab}
          setTab={setAdminTab}
          onLogout={handleBackToHome}
          showToast={showToast}
        />
      )}

      {view === 'advertiser' && currentAdvertiser && (
        <AdvertiserDashboard
          advertiser={currentAdvertiser}
          onUpdate={(updated) => {
            setAdvertisers((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
            setCurrentAdvertiser(updated);
          }}
          cars={cars}
          setCars={setCars}
          tab={advertiserTab}
          setTab={setAdvertiserTab}
          onLogout={handleBackToHome}
          showToast={showToast}
        />
      )}

      {view === 'customer' && (
        <CarDetailModal
          car={selectedCar}
          agents={agents}
          attribution={attribution}
          onBack={handleBackToHome}
          onLead={(newLead) => {
            setLeads((prev) => [newLead, ...prev]);
            showToast('ส่งข้อมูลแล้ว ทีม CLUBROD จะติดต่อกลับ');
          }}
        />
      )}

      <Toast message={toastMsg} />
    </main>
  );
}

export default App;
