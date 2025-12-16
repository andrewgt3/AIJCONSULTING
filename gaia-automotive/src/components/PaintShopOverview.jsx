import React from 'react';
import { Wind, Thermometer, Layers, Zap, Activity, Fan, Heater } from 'lucide-react'; // Updated icons
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'; // Added PieChart

// MOCK DATA UPDATED FOR PAINT SHOP FIS
const boothClimateData = [
    { time: '10:00', temp: 24, humidity: 62 },
    { time: '10:30', temp: 24.5, humidity: 63 },
    { time: '11:00', temp: 25, humidity: 65 }, // Slight rise
    { time: '11:30', temp: 24.8, humidity: 64 },
    { time: '12:00', temp: 24.2, humidity: 62 },
    { time: '12:30', temp: 24, humidity: 61 },
];

const asuPressureData = [
    { name: 'Supply', value: 95, fullMark: 100, fill: '#8b5cf6' },
    { name: 'Exhaust', value: 88, fullMark: 100, fill: '#3b82f6' },
];

const ovenTempData = [
    { id: 'Zone 1', range: [160, 180], current: 175 },
    { id: 'Zone 2', range: [160, 180], current: 168 },
    { id: 'Zone 3', range: [180, 200], current: 192 },
];


const ProcessNode = ({ title, icon: Icon, status = 'healthy', onClick, subtitle }) => {
    let borderColor = 'var(--accent-green)';
    let shadowColor = 'rgba(34, 197, 94, 0.2)';

    if (status === 'warning') {
        borderColor = 'var(--accent-orange)';
        shadowColor = 'rgba(249, 115, 22, 0.2)';
    }
    if (status === 'critical') {
        borderColor = 'var(--accent-red)';
        shadowColor = 'rgba(239, 68, 68, 0.2)';
    }

    return (
        <div
            className="clickable animate-zoom-in"
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative',
                zIndex: 1,
                minWidth: '130px'
            }}
        >
            <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: `3px solid ${borderColor}`,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 10px 25px ${shadowColor}`,
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
            }}
                className="hover:scale-110"
            >
                {Icon ? <Icon size={40} className="pulse" color={status === 'healthy' ? '#10b981' : (status === 'warning' ? '#f59e0b' : '#ef4444')} /> : <Activity size={40} />}
            </div>

            <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: '20px', textAlign: 'center', minWidth: '140px' }}>
                <span className="text-sm font-bold" style={{ display: 'block', color: '#111827' }}>{title}</span>
                {subtitle && <span className="text-xs text-gray" style={{ display: 'block', marginTop: '2px' }}>{subtitle}</span>}
                <span className="text-xs text-gray" style={{ textTransform: 'uppercase', fontSize: '0.7rem', marginTop: '4px', display: 'block', fontWeight: 'bold', color: status === 'warning' ? 'var(--accent-orange)' : 'var(--accent-green)' }}>{status}</span>
            </div>
        </div>
    );
};

const PaintShopOverview = ({ onSelectProcess }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
            <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                <div>
                    <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>FIS: PAINT SHOP OVERVIEW</h2>
                    <div className="text-sm text-gray">Factory Information System • Real-time Monitoring</div>
                </div>
                <div className="glass-panel" style={{ padding: '0.5rem 1rem' }}>
                    <span className="text-xs font-bold text-success flex-center" style={{ gap: '0.5rem' }}>
                        <Zap size={14} /> NOMINAL CURRENT: 480V STABLE
                    </span>
                </div>
            </div>

            {/* Process Flow - Updated to Match FIS Diagram */}
            <div className="card" style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4rem 1rem',
                minHeight: '350px',
                overflow: 'hidden'
            }}>
                {/* Background Trace Line */}
                <div style={{
                    position: 'absolute',
                    top: '45%',
                    left: '60px',
                    right: '60px',
                    height: '4px',
                    background: 'var(--border-color)',
                    zIndex: 0,
                    opacity: 0.5
                }}></div>

                <ProcessNode
                    title="FEATHER DUSTER"
                    subtitle="Cleaning PLC"
                    icon={Wind}
                    status="healthy"
                    onClick={() => onSelectProcess('Feather Duster')}
                />
                <ProcessNode
                    title="BASE COAT"
                    subtitle="Interior / Exterior"
                    icon={Layers}
                    status="warning"
                    onClick={() => onSelectProcess('Base Coat')}
                />
                <ProcessNode
                    title="CLEAR COAT"
                    subtitle="Final Application"
                    icon={Activity}
                    status="healthy"
                    onClick={() => onSelectProcess('Clear Coat')}
                />
                <ProcessNode
                    title="OVEN"
                    subtitle="Curing PLC"
                    icon={Heater}
                    status="healthy"
                    onClick={() => onSelectProcess('Oven')}
                />
            </div>

            {/* Visual Data Cards - Technical FIS Data */}
            <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>

                {/* Booth Environment (Booth PLC) */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                    <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 className="text-sm font-bold text-gray flex-center" style={{ gap: '0.5rem' }}>
                            <Thermometer size={16} /> BOOTH CLIMATE (PLC)
                        </h3>
                    </div>
                    <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={boothClimateData}>
                                <defs>
                                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" />
                                <Area type="monotone" dataKey="humidity" stroke="#10b981" strokeDasharray="3 3" fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div className="flex-center" style={{ gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
                            <span className="text-xs text-blue font-bold">● Temp (24°C)</span>
                            <span className="text-xs text-green font-bold">-- Humidity (62%)</span>
                        </div>
                    </div>
                </div>

                {/* Oven Temperatures (Oven PLC) */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                    <h3 className="text-sm font-bold text-gray flex-center" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
                        <Heater size={16} /> OVEN ZONES (PLC)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', justifyContent: 'center', height: '100%' }}>
                        {ovenTempData.map(zone => (
                            <div key={zone.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.35rem' }}>
                                    <span className="text-sm font-bold">{zone.id}</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className="text-sm font-bold" style={{ display: 'block' }}>{zone.current}°C</span>
                                        <span className="text-xs text-gray" style={{ fontSize: '0.7rem' }}>Tgt: {zone.range[0]}-{zone.range[1]}</span>
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(zone.current / 220) * 100}%`,
                                        height: '100%',
                                        background: zone.current > zone.range[1] || zone.current < zone.range[0] ? '#ef4444' : '#f59e0b',
                                        borderRadius: '4px'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Air Supply Unit (ASU) */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '300px' }}>
                    <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 className="text-sm font-bold text-gray flex-center" style={{ gap: '0.5rem' }}>
                            <Fan size={16} /> ASU PRESSURE
                        </h3>
                    </div>
                    <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={asuPressureData} layout="vertical">
                                <XAxis type="number" domain={[0, 120]} hide />
                                <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 12 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {asuPressureData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center text-xs text-gray">
                        Main blower fan running at 92% capacity.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaintShopOverview;
