import React from 'react';
import { ArrowLeft, AlertTriangle, Activity, Thermometer, Clock, Settings, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockRiskData = [
    { day: 'Nov 7', risk: 12 },
    { day: 'Nov 12', risk: 15 },
    { day: 'Nov 17', risk: 25 },
    { day: 'Nov 22', risk: 45 },
    { day: 'Nov 27', risk: 60 },
    { day: 'Dec 2', risk: 72 },
    { day: 'Dec 7', risk: 78 },
];

const AssetView = ({ robot, onBack, onSelectFactor }) => {
    // Mock Factors based on spec - Enhanced with sparklines and root cause
    const factors = [
        {
            id: 'f1',
            name: 'Axis 3 Motor Temp',
            status: 'critical',
            trend: '+15%',
            value: '62.4°C',
            rootCause: 'Inner Race Bearing Defect',
            category: 'Thermal',
            sparkData: [{ v: 50 }, { v: 52 }, { v: 55 }, { v: 54 }, { v: 58 }, { v: 62 }]
        },
        {
            id: 'f2',
            name: 'Vibration RMS',
            status: 'critical',
            trend: '2.5x Base',
            value: '3.2 g',
            rootCause: 'Misalignment / Looseness',
            category: 'Vibration',
            sparkData: [{ v: 1.1 }, { v: 1.2 }, { v: 1.5 }, { v: 2.1 }, { v: 2.8 }, { v: 3.2 }]
        },
        {
            id: 'f3',
            name: 'Days Since Maint',
            status: 'warning',
            trend: 'Overdue',
            value: '847',
            rootCause: 'Scheduled Service Missed',
            category: 'Maintenance',
            sparkData: [{ v: 800 }, { v: 810 }, { v: 820 }, { v: 830 }, { v: 840 }, { v: 847 }]
        },
        {
            id: 'f4',
            name: 'Servo Errors',
            status: 'warning',
            trend: 'High',
            value: '14/hr',
            rootCause: 'Encoder Signal Noise',
            category: 'Electrical',
            sparkData: [{ v: 2 }, { v: 3 }, { v: 2 }, { v: 5 }, { v: 8 }, { v: 14 }]
        },
    ];

    return (
        <div className="animate-zoom-in" style={{ width: '100%' }}>
            {/* Header */}
            <div className="flex-center" style={{ gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={onBack} className="clickable" style={{ padding: '0.5rem', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'white' }}>
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>{robot.name} DETAILS</h2>
                    <span className="text-sm text-gray">ID: {robot.id} • Mode: AUTO • Prog: P-402</span>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <span className={`status-badge ${robot.status === 'critical' ? 'bg-critical pulse' : robot.status === 'warning' ? 'bg-warning pulse' : 'bg-success'}`}
                        style={{ padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontWeight: 'bold' }}>
                        {robot.status.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>

                {/* Main Col: Risk Trend */}
                <div className="col" style={{ gap: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div className="card">
                        <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 className="text-sm font-bold text-gray flex-center" style={{ gap: '0.5rem' }}>
                                <TrendingUp size={16} /> FAILURE RISK TREND (30 DAYS)
                            </h3>
                            <span className="font-bold text-red" style={{ fontSize: '1.25rem' }}>{robot.risk}% Current Risk</span>
                        </div>
                        <div style={{ height: '250px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockRiskData}>
                                    <defs>
                                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                                    <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" domain={[0, 100]} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Contributing Factors - REDESIGNED */}
                    <div>
                        <h3 className="text-sm font-bold text-gray" style={{ marginBottom: '1rem' }}>TOP CONTRIBUTING FACTORS</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {factors.map(factor => (
                                <div key={factor.id} className="card clickable animate-scale" onClick={() => onSelectFactor(factor)}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem' }}>

                                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                                        <div className="flex-center" style={{ gap: '0.5rem' }}>
                                            {factor.name.includes('Temp') ? <Thermometer size={16} className="text-gray" /> :
                                                factor.name.includes('Errors') ? <AlertTriangle size={16} className="text-gray" /> :
                                                    factor.name.includes('Maint') ? <Clock size={16} className="text-gray" /> :
                                                        <Activity size={16} className="text-gray" />}
                                            <span className="text-xs font-bold text-gray uppercase">{factor.category}</span>
                                        </div>
                                        <span className={`status-badge ${factor.status === 'critical' ? 'bg-critical' : 'bg-warning'}`} style={{ fontSize: '0.7rem' }}>
                                            {factor.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="flex-center" style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <div>
                                            <div className="font-bold text-lg">{factor.name}</div>
                                            <div className="text-xs text-gray" style={{ marginTop: '0.25rem' }}>Likely Cause: <span className="font-medium text-blue">{factor.rootCause}</span></div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div className={`text-2xl font-bold ${factor.status === 'critical' ? 'text-red' : 'text-orange'}`}>{factor.value}</div>
                                            <div className="text-xs text-gray">{factor.trend}</div>
                                        </div>
                                    </div>

                                    {/* Sparkline */}
                                    <div style={{ height: '40px', width: '100%', marginTop: '0.5rem' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={factor.sparkData}>
                                                <defs>
                                                    <linearGradient id={`grad-${factor.id}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={factor.status === 'critical' ? '#ef4444' : '#f59e0b'} stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor={factor.status === 'critical' ? '#ef4444' : '#f59e0b'} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area type="monotone" dataKey="v" stroke={factor.status === 'critical' ? '#ef4444' : '#f59e0b'} strokeWidth={2} fill={`url(#grad-${factor.id})`} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Col: Actions & Metrics */}
                <div className="col" style={{ gap: '1.5rem', display: 'flex', flexDirection: 'column' }}>

                    {/* Recommended Action */}
                    <div className="card" style={{ borderTop: '4px solid var(--accent-blue)' }}>
                        <h3 className="text-sm font-bold text-blue flex-center" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
                            <Settings size={16} /> RECOMMENDED ACTION
                        </h3>
                        <div className="text-sm font-bold" style={{ marginBottom: '0.5rem' }}>Schedule preventive maintenance within 7 days.</div>
                        <ul className="text-sm text-gray" style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
                            <li>Axis 3 Gearbox inspection</li>
                            <li>Motor bearing replacement</li>
                            <li>Full calibration</li>
                        </ul>
                        <button className="button-primary" style={{ width: '100%' }}>Create Work Order</button>
                    </div>

                    {/* Robot Stats */}
                    <div className="card">
                        <h3 className="text-sm font-bold text-gray" style={{ marginBottom: '1rem' }}>ROBOT STATS</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                                <span className="text-sm text-gray">Operating Hours</span>
                                <span className="font-bold">12,450 h</span>
                            </div>
                            <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                                <span className="text-sm text-gray">Cycle Count</span>
                                <span className="font-bold">845,620</span>
                            </div>
                            <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                                <span className="text-sm text-gray">Last Maint</span>
                                <span className="font-bold text-orange">847 Days Ago</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AssetView;
