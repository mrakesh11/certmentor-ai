import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiagramAnalytics() {
    const [active, setActive] = useState(null);

    const info = {
        kinesis: { title: "Kinesis Data Firehose", type: "Ingestion", desc: "Captures and loads massive streams of realtime data (like IoT sensors or clickstreams) instantly into S3.", icon: "fa-fire-flame-curved", color: "#ffb86c" },
        s3: { title: "Amazon S3", type: "Data Lake", desc: "The foundational raw Data Lake storing infinite amounts of unstructured data cost-effectively.", icon: "fa-water", color: "#50fa7b" },
        glue: { title: "AWS Glue", type: "ETL / Catalog", desc: "A crawler that discovers the raw S3 data, extracts it, transforms it into an organized schema, and catalogs it.", icon: "fa-spider", color: "#ff79c6" },
        athena: { title: "Amazon Athena", type: "Analytics", desc: "Serverless query engine. Run standard SQL queries directly against raw S3 bucket files without loading data into a database!", icon: "fa-magnifying-glass-chart", color: "#8be9fd" },
        quicksight: { title: "Amazon QuickSight", type: "BI Dashboard", desc: "Serverless Business Intelligence. Connects to Athena and visually graphs the data for business executives.", icon: "fa-chart-pie", color: "#f1f1f1" }
    };

    return (
        <div className="vpc-diagram-container" style={{position: 'relative', marginTop: '2rem'}}>
            <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Serverless Data Lake Pipeline</h3>
            
            <div className="components-row" style={{display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center'}}>
                
                <motion.div className="component" onMouseEnter={(e) => { e.stopPropagation(); setActive('kinesis'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-fire-flame-curved component-icon" style={{color: info.kinesis.color}}></i>
                    <span>{info.kinesis.title}</span>
                </motion.div>
                
                <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>

                <motion.div className="component" onMouseEnter={(e) => { e.stopPropagation(); setActive('s3'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-water component-icon" style={{color: info.s3.color}}></i>
                    <span>{info.s3.title} (Raw)</span>
                </motion.div>

                <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>

                <div className="vpc-boundary" style={{borderColor: info.glue.color, borderStyle: 'solid', display: 'flex', gap: '10px', alignItems: 'center'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('glue'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-spider component-icon" style={{color: info.glue.color}}></i>
                    <span>{info.glue.title} (ETL)</span>
                </div>

                <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>

                <motion.div className="component" onMouseEnter={(e) => { e.stopPropagation(); setActive('athena'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-magnifying-glass-chart component-icon" style={{color: info.athena.color}}></i>
                    <span>{info.athena.title}</span>
                </motion.div>

                <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>

                <motion.div className="component" onMouseEnter={(e) => { e.stopPropagation(); setActive('quicksight'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-chart-pie component-icon" style={{color: info.quicksight.color}}></i>
                    <span>{info.quicksight.title}</span>
                </motion.div>

            </div>

            <AnimatePresence>
                {active && (
                    <motion.div className="glass-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ borderLeft: `5px solid ${info[active].color}`, zIndex: 100 }}>
                        <h4 style={{ color: info[active].color }}><i className={`fa-solid ${info[active].icon}`}></i> {info[active].title}</h4>
                        <span className="mode-badge" style={{background: 'rgba(255,255,255,0.1)'}}>{info[active].type}</span>
                        <p>{info[active].desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
