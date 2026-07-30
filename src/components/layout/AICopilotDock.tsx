import React, { useState } from 'react';
import { useTelemetry } from '../../context/TelemetryContext';
import { Bot, Sparkles, X, Send, ChevronRight, CheckCircle2, ShieldAlert, Cpu, BarChart3 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  dataSummary?: {
    metric: string;
    value: string;
    recommendation: string;
  };
}

const PROMPT_SUGGESTIONS = [
  'Which regional office has the lowest claims SLA compliance this month?',
  'Generate executive performance summary for Lagos Region GL 14+ staff.',
  'Identify top GL 12-16 candidates eligible for promotion in the 2026 PMS cycle.',
  'Analyze field inspector geofence compliance in South-South Zone.',
];

export const AICopilotDock: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen, branches, pmsAppraisals, aiAlerts } = useTelemetry();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Greetings. I am NSITF Copilot AI (v1.0), trained on Federal Civil Service regulations, ECA audit telemetry, and real-time workforce analytics. How can I assist executive decisioning today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!isCopilotOpen) return null;

  const handleSend = (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    setTimeout(() => {
      let responseText = '';
      let summaryData: ChatMessage['dataSummary'] = undefined;

      const lower = queryText.toLowerCase();
      if (lower.includes('sla') || lower.includes('lowest') || lower.includes('claim')) {
        responseText = `Based on real-time claims telemetry from ${branches.length} national offices:\n\n• **Port Harcourt Regional Office** currently exhibits the lowest SLA turnaround compliance at **85.0%** (target: 95.0%).\n• Root Cause: 18.4% increase in offshore injury benefit filings following recent deepwater safety audits.\n\nRecommended Action: Reallocate 4 Senior Claims Officers from Enugu Office temporarily.`;
        summaryData = {
          metric: 'Port Harcourt Claims SLA',
          value: '85.0% (Deficit: -10%)',
          recommendation: 'Temporary staff re-balance from Enugu Regional Office',
        };
      } else if (lower.includes('promotion') || lower.includes('pms') || lower.includes('gl 14')) {
        responseText = `Evaluated **${pmsAppraisals.length}** completed appraisals in the 2026 PMS Evaluation Cycle:\n\n1. **Dr. Mrs. Chinyere Nwosu** (GL 16) - Score: 94/100 (Outstanding) • Recommended for GL 17 Executive Director position.\n2. **Mr. Tarila Ebiowei** (GL 12) - Score: 90/100 (Exceeds Expectations) • Recommended for GL 13 Principal Inspector elevation.`;
        summaryData = {
          metric: 'Promotion Eligible Staff',
          value: '2 Qualified Officers',
          recommendation: 'Submit to DG & Board for formal promotion approval',
        };
      } else if (lower.includes('lagos') || lower.includes('summary')) {
        responseText = `Executive Performance Summary for **Lagos Regional Office**:\n\n• Total Officers: **620**\n• Average Attendance: **94.1%**\n• Productivity Score: **91.5 / 100**\n• Active ECA Audits: **310 companies** (Including Dangote Refinery & Petrochemicals audit).\n• Risk Flag: Officer workload index elevated (+14% above baseline).`;
        summaryData = {
          metric: 'Lagos Overall Index',
          value: '91.5 / 100',
          recommendation: 'Deploy additional regional support team from Ibadan',
        };
      } else {
        responseText = `I have processed your query across NSITF PostgreSQL database tables and real-time geofence streams. All metrics indicate optimal performance across 6 geopolitical zones with 95.4% nationwide attendance compliance.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dataSummary: summaryData,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs sm:hidden z-40" onClick={() => setIsCopilotOpen(false)} />
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 max-w-full bg-slate-950/95 backdrop-blur-xl border-l border-nsitf-gold-500/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Dock Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-nsitf-gold-500/20 border border-nsitf-gold-500/40 text-nsitf-gold-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                NSITF Copilot AI
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-nsitf-gold-500/20 border border-nsitf-gold-500/40 text-nsitf-gold-300 font-mono">
                  ONLINE
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Workforce Intelligence & Policy Assistant</p>
            </div>
          </div>
          <button
            onClick={() => setIsCopilotOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-nsitf-green-700 text-white rounded-br-none shadow-glow-green border border-nsitf-green-500/30'
                    : 'bg-slate-900/90 text-slate-200 rounded-bl-none border border-slate-800 shadow-glass'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.dataSummary && (
                  <div className="mt-3 pt-3 border-t border-slate-800 bg-slate-950/60 p-2.5 rounded-xl border border-nsitf-gold-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-nsitf-gold-400 font-bold text-[11px]">
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>{msg.dataSummary.metric}</span>
                    </div>
                    <div className="text-xs text-white font-semibold font-mono">{msg.dataSummary.value}</div>
                    <div className="text-[10px] text-slate-400">💡 {msg.dataSummary.recommendation}</div>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic">
              <Cpu className="w-4 h-4 text-nsitf-gold-400 animate-spin" />
              <span>Querying NSITF vector embeddings & database...</span>
            </div>
          )}
        </div>

        {/* Suggestions & Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 space-y-3">
          {messages.length < 3 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Suggested Executive Queries</div>
              <div className="space-y-1">
                {PROMPT_SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="w-full text-left p-2 rounded-xl bg-slate-950/70 hover:bg-nsitf-green-950/60 border border-slate-800 hover:border-nsitf-green-500/30 text-[11px] text-slate-300 transition line-clamp-1 flex items-center justify-between"
                  >
                    <span className="truncate">{s}</span>
                    <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot AI anything..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-nsitf-gold-400 text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-nsitf-gold-500 hover:bg-nsitf-gold-400 text-slate-950 font-bold transition shadow-glow-gold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
