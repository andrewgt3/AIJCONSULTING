import React from 'react';
import { AlertTriangle, CheckCircle, Activity, Info } from 'lucide-react';

const RobotCard = ({ robot, onClick }) => {
    const isCritical = robot.status === 'critical';
    const isWarning = robot.status === 'warning';

    // Determine color theme based on status
    const borderColor = isCritical ? 'var(--accent-red)' : isWarning ? 'var(--accent-orange)' : 'var(--accent-green)';
    const bgColor = isCritical ? 'rgba(239, 68, 68, 0.05)' : isWarning ? 'rgba(249, 115, 22, 0.05)' : 'rgba(34, 197, 94, 0.05)';
    const textColor = isCritical ? 'var(--accent-red)' : isWarning ? 'var(--accent-orange)' : 'var(--accent-green)';

    return (
        <div
            className="card clickable"
            onClick={() => onClick(robot)}
            style={{
                borderTop: `4px solid ${borderColor}`,
                background: bgColor,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1.25rem'
            }}
        >
            <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                <span className="font-bold text-lg">{robot.name}</span>
                {isCritical && <AlertTriangle size={20} color={borderColor} className="pulse" />}
                {isWarning && <Activity size={20} color={borderColor} className="pulse" />}
                {!isCritical && !isWarning && <CheckCircle size={20} color={borderColor} />}
            </div>

            <div style={{ textAlign: 'center', margin: '0.5rem 0' }}>
                <div className="text-sm text-gray uppercase tracking-wider">Failure Risk</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: textColor }}>
                    {robot.risk}%
                </div>
                <div className="text-xs font-bold" style={{ color: textColor, opacity: 0.8 }}>
                    {isCritical ? 'CRITICAL' : isWarning ? 'WARNING' : 'HEALTHY'}
                </div>
            </div>

            <div className="text-xs text-gray" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '0.75rem' }}>
                {isCritical ? `Predicted: ${robot.prediction}` : 'System Optimal'}
            </div>
        </div>
    );
};

const CommandCenter = ({ robots, metrics, onSelectRobot }) => {
    const criticalCount = robots.filter(r => r.status === 'critical').length;
    const warningCount = robots.filter(r => r.status === 'warning').length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>

            {/* Header Section */}
            <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                <div>
                    <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>ROBOTIC CELL 05</h2>
                    <div className="text-sm text-gray">Last Updated: {metrics.lastUpdated}</div>
                </div>
                <div className="flex-center" style={{ gap: '1rem' }}>
                    <div className="glass-panel" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="text-xs text-gray">Precision</div>
                            <div className="font-bold text-blue">{(metrics.precision * 100).toFixed(0)}%</div>
                        </div>
                        <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div className="text-xs text-gray">Recall</div>
                            <div className="font-bold text-blue">{(metrics.recall * 100).toFixed(0)}%</div>
                        </div>
                        <div style={{ width: '1px', background: 'var(--border-color)' }}></div>
                        <div style={{ textAlign: 'center' }}>
                            <div className="text-xs text-gray">F1-Score</div>
                            <div className="font-bold text-blue">{(metrics.f1 * 100).toFixed(0)}%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Alerts Panel */}
            {(criticalCount > 0 || warningCount > 0) && (
                <div className="card" style={{ borderLeft: '4px solid var(--accent-red)', padding: '1rem' }}>
                    <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <h3 className="text-sm font-bold text-red flex-center" style={{ gap: '0.5rem' }}>
                            <AlertTriangle size={16} /> ACTIVE ALERTS
                        </h3>
                        <span className="text-xs text-gray uppercase">Action Required</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {robots.filter(r => r.status === 'critical').map(r => (
                            <div key={r.id} className="flex-center" style={{ justifyContent: 'space-between', background: 'rgba(239, 68, 68, 0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                                <span className="text-sm font-bold">{r.name}: Schedule maintenance within 7 days</span>
                                <span className="text-xs text-red font-mono">FAIL WIN: {r.prediction}</span>
                            </div>
                        ))}
                        {robots.filter(r => r.status === 'warning').map(r => (
                            <div key={r.id} className="flex-center" style={{ justifyContent: 'space-between', background: 'rgba(249, 115, 22, 0.05)', padding: '0.5rem', borderRadius: '4px' }}>
                                <span className="text-sm font-bold">{r.name}: Monitor closely, high vibration</span>
                                <span className="text-xs text-orange font-mono">RISK: {r.risk}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Robot Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                marginTop: '0.5rem'
            }}>
                {robots.map(robot => (
                    <RobotCard key={robot.id} robot={robot} onClick={onSelectRobot} />
                ))}
            </div>

        </div>
    );
};

export default CommandCenter;
