import React, { useState, useEffect, useCallback } from 'react';
import { fetchConversations, sendChatMessage } from '../../services/api';

export function ChatWidget({ showToast }) {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0];

  const loadChats = useCallback(async () => {
    try {
      const list = await fetchConversations();
      setConversations(list);
      if (list.length > 0 && !activeId) {
        setActiveId(list[0].id);
      }
    } catch {
      // Mock fallback if API endpoint is not present on backend yet
    } finally {
      setLoading(false);
    }
  }, [activeId]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeConv) return;
    const msgText = inputMsg;
    setInputMsg('');

    try {
      await sendChatMessage(activeConv.id, msgText, 'admin');
      showToast('ส่งข้อความแล้ว');
      loadChats();
    } catch {
      showToast('ส่งข้อความไม่สำเร็จ (Mock Mode)');
    }
  };

  return (
    <div className="panel chat-panel">
      <h2>ระบบแชตสนทนา (Live Chat Messages)</h2>
      <div className="chat-layout">
        <aside className="conv-list">
          {conversations.length === 0 ? (
            <div className="empty-chat">ไม่มีข้อความแชต</div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.id}
                type="button"
                className={`conv-item ${conv.id === activeConv?.id ? 'active' : ''}`}
                onClick={() => setActiveId(conv.id)}
              >
                <strong>{conv.carTitle || 'สอบถามข้อมูลรถ'}</strong>
                <small>{conv.lastMessage || 'ไม่มีข้อความ'}</small>
              </button>
            ))
          )}
        </aside>
        <section className="chat-messages-area">
          {activeConv ? (
            <>
              <div className="messages-stream">
                {(activeConv.messages || []).map((m, idx) => (
                  <div key={idx} className={`chat-bubble ${m.sender === 'admin' ? 'self' : 'peer'}`}>
                    <span>{m.text}</span>
                    <small>{m.time || 'เมื่อสักครู่'}</small>
                  </div>
                ))}
              </div>
              <form className="chat-input-form" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="พิมพ์ข้อความตอบกลับ..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                />
                <button type="submit">ส่ง</button>
              </form>
            </>
          ) : (
            <div className="chat-placeholder">เลือกรายการแชตเพื่อเริ่มต้นสนทนา</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ChatWidget;
