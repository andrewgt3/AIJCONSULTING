import React from 'react';
import { Server, Activity, AlertTriangle, CheckCircle, Database } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const SystemsIntel = ({ robots, metrics }) => {
    // Calculate simple stats
    const criticalCount = robots.filter(r => r.status === 'critical').length;
    const warningCount = robots.filter(r => r.status === 'warning').length;
    const healthyCount = robots.filter(r => r.status === 'healthy').length;

    const data = [
        { name: 'Healthy', count: healthyCount, fill: '#10b981' }, // green
        { name: 'Warning', count: warningCount, fill: '#f59e0b' }, // orange
        { name: 'Critical', count: criticalCount, fill: '#ef4444' }, // red
    ];

    return (
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* FIS CONNECTION STATUS */}
            <div>
                <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Server size={18} /> FIS CONNECTION STATUS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>

                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                        <span className="text-sm text-gray">Robotic PLCs (Int/Ext)</span>
                        <span className="status-badge bg-success">Online</span>
                    </div>
                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                        <span className="text-sm text-gray">Booth PLC</span>
                        <span className="status-badge bg-success">Online</span>
                    </div>
                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                        <span className="text-sm text-gray">Conveyor PLC</span>
                        <span className="status-badge bg-success">Online</span>
                    </div>
                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                        <span className="text-sm text-gray">Oven PLC</span>
                        <span className="status-badge bg-success">Online</span>
                    </div>
                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                        <span className="text-sm text-gray">Air Supply Unit (ASU)</span>
                        <span className="status-badge bg-warning">Check</span>
                    </div>
                    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                        <span className="text-sm text-gray">FeatherDuster PLC</span>
                        <span className="status-badge bg-success">Online</span>
                    </div>

                </div>
            </div>

            <div style={{ height: '1px', background: 'var(--border-color)' }}></div>

            {/* Model Performance */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <h3 className="text-sm font-bold text-gray mb-2">MODEL PERFORMANCE</h3>
                <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span className="text-sm text-gray">Precision</span>
                    <span className="font-bold">{parseInt(metrics.precision * 100)}%</span>
                </div>
                <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                    <span className="text-sm text-gray">Recall</span>
                    <span className="font-bold">{parseInt(metrics.recall * 100)}%</span>
                </div>
                <div className="text-xs text-gray mt-2" style={{ textAlign: 'right' }}>
                    Updated: {metrics.lastUpdated}
                </div>
            </div>

            {/* Fleet Status Chart */}
            <div style={{ flex: 1, minHeight: 0 }}>
                <h3 className="text-sm font-bold text-gray mb-2">ROBOT FLEET STATUS</h3>
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" axisLine={false} tickLine={false} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 4, 4]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default SystemsIntel;
