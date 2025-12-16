import React from 'react';

const LivePredictions = ({ robots }) => {
    return (
        <div className="glass-panel" style={{ padding: '1rem', marginTop: '2rem' }}>
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 className="section-title" style={{ marginBottom: 0, fontSize: '1rem' }}>LIVE PREDICTION LOG (24H)</h3>
                <button className="text-xs font-bold text-blue button-ghost">EXPORT LOGS</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                        <th className="text-xs text-gray" style={{ padding: '0.5rem' }}>ROBOT ID</th>
                        <th className="text-xs text-gray" style={{ padding: '0.5rem' }}>STATUS</th>
                        <th className="text-xs text-gray" style={{ padding: '0.5rem' }}>FAILURE PROBABILITY</th>
                        <th className="text-xs text-gray" style={{ padding: '0.5rem' }}>PREDICTED WINDOW</th>
                        <th className="text-xs text-gray" style={{ padding: '0.5rem' }}>TOP FACTOR</th>
                    </tr>
                </thead>
                <tbody>
                    {robots.map(r => (
                        <tr key={r.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <td className="text-sm font-bold" style={{ padding: '0.75rem 0.5rem' }}>{r.name}</td>
                            <td style={{ padding: '0.75rem 0.5rem' }}>
                                <span className={`status-badge ${r.status === 'critical' ? 'bg-critical' : r.status === 'warning' ? 'bg-warning' : 'bg-success'}`} style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    {r.status.toUpperCase()}
                                </span>
                            </td>
                            <td className="text-sm font-mono" style={{ padding: '0.75rem 0.5rem' }}>{r.risk}%</td>
                            <td className="text-sm text-gray" style={{ padding: '0.75rem 0.5rem' }}>{r.prediction}</td>
                            <td className="text-sm text-gray" style={{ padding: '0.75rem 0.5rem' }}>{r.details}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LivePredictions;
