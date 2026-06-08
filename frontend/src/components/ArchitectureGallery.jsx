import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VPCDiagram from './VPCDiagram';
import ServerlessDiagram from './ServerlessDiagram';
import DiagramHA from './DiagramHA';
import DiagramDecoupled from './DiagramDecoupled';
import DiagramAnalytics from './DiagramAnalytics';
import DiagramContainers from './DiagramContainers';

export default function ArchitectureGallery() {
    const [activeTab, setActiveTab] = useState('vpc');

    const tabs = [
        { id: 'vpc', label: 'VPC Baseline', icon: 'fa-network-wired' },
        { id: 'ha', label: 'Highly Available 3-Tier', icon: 'fa-layer-group' },
        { id: 'serverless', label: 'Serverless Core', icon: 'fa-bolt' },
        { id: 'decoupled', label: 'Decoupled (SQS)', icon: 'fa-cubes' },
        { id: 'containers', label: 'Microservices', icon: 'fa-box' },
        { id: 'analytics', label: 'Data Lake Pipeline', icon: 'fa-water' }
    ];

    const renderDiagram = () => {
        switch (activeTab) {
            case 'vpc': return <VPCDiagram />;
            case 'ha': return <DiagramHA />;
            case 'serverless': return <ServerlessDiagram />;
            case 'decoupled': return <DiagramDecoupled />;
            case 'containers': return <DiagramContainers />;
            case 'analytics': return <DiagramAnalytics />;
            default: return <VPCDiagram />;
        }
    };

    return (
        <div style={{marginTop: '2rem'}}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem', maxWidth: '1000px', margin: '0 auto 2.5rem' }}>
                {tabs.map(t => (
                    <button 
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`btn ${activeTab === t.id ? 'active-tab' : ''}`}
                        style={{
                            background: activeTab === t.id ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.05)',
                            color: activeTab === t.id ? 'white' : 'var(--text-muted)',
                            border: `1px solid ${activeTab === t.id ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)'}`,
                            padding: '12px 25px',
                            cursor: 'pointer',
                            borderRadius: '30px',
                            transition: 'all 0.3s',
                            fontSize: '0.95rem',
                            fontWeight: activeTab === t.id ? 'bold' : 'normal',
                            boxShadow: activeTab === t.id ? '0 5px 15px rgba(0, 210, 255, 0.3)' : 'none'
                        }}
                    >
                        <i className={`fa-solid ${t.icon}`} style={{marginRight: '8px'}}></i>
                        {t.label}
                    </button>
                ))}
            </div>

            <div style={{ minHeight: '600px', position: 'relative' }}>
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderDiagram()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
