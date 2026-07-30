import React from 'react';
import { useTelemetry } from '../../../context/TelemetryContext';
import { Zap, QrCode } from 'lucide-react';

type FeedItem =
  | {
      id: string;
      type: 'ATTENDANCE';
      staffName: string;
      gradeLevel: string;
      branchName: string;
      method: string;
      time: string;
    }
  | {
      id: string;
      type: 'TASK';
      taskNumber: string;
      category: string;
      status: string;
      progress: number;
    };

export const LiveTicker: React.FC = () => {
  const { attendanceLogs, tasks } = useTelemetry();

  const feedItems: FeedItem[] = [
    ...attendanceLogs.map(
      (log): FeedItem => ({
        id: log.id,
        type: 'ATTENDANCE',
        staffName: log.staffName,
        gradeLevel: log.gradeLevel,
        branchName: log.branchName,
        method: log.verificationMethod.replace('_', ' '),
        time: new Date(log.clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })
    ),
    ...tasks.map(
      (tsk): FeedItem => ({
        id: tsk.id,
        type: 'TASK',
        taskNumber: tsk.taskNumber,
        category: tsk.category.replace('_', ' '),
        status: tsk.status.replace('_', ' '),
        progress: tsk.completionPercentage,
      })
    ),
  ];

  return (
    <div className="glass-panel rounded-xl px-4 py-2.5 border border-slate-800 flex items-center gap-4 overflow-hidden text-xs">
      <div className="flex items-center gap-2 text-nsitf-gold-400 font-mono font-bold uppercase tracking-wider flex-shrink-0 text-[11px] border-r border-slate-800 pr-4 z-10 bg-slate-950/80 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        Live Telemetry Update
      </div>

      {/* Marquee Wrapper: Scrolling right to left slowly */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee-slow flex items-center gap-8 whitespace-nowrap font-mono text-[11px]">
          {/* Double items array for continuous seamless infinite marquee loop */}
          {[...feedItems, ...feedItems].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="flex items-center gap-2 text-slate-300">
              {item.type === 'ATTENDANCE' ? (
                <>
                  <QrCode className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-white">{item.staffName}</span>
                  <span className="text-slate-400">({item.gradeLevel})</span>
                  <span className="text-emerald-400">clocked in at {item.branchName}</span>
                  <span className="text-[10px] text-slate-500 font-mono">[{item.method} • {item.time}]</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 text-nsitf-gold-400 flex-shrink-0" />
                  <span className="font-semibold text-white">{item.taskNumber}</span>
                  <span className="text-slate-400">[{item.category}]</span>
                  <span className="text-nsitf-gold-300">{item.status}</span>
                  <span className="text-slate-500 font-mono">{item.progress}%</span>
                </>
              )}
              <span className="text-slate-700 ml-4 font-normal">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
