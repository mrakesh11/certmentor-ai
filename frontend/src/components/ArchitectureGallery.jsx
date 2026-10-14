import { useState } from 'react';
// ESLint no-unused-vars does not count JSX member expressions such as
// <motion.div> as a usage of the motion import, so it reads as unused.
// eslint-disable-next-line no-unused-vars
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
                        className={`btn ${activeTab === t.id ? 'btn--primary' : 'btn--secondary'}`}
                        aria-pressed={activeTab === t.id}
                    >
                        <i className={`fa-solid ${t.icon}`} aria-hidden="true"></i>
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
