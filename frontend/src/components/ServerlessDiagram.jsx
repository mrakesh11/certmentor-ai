import { useState } from 'react';
// ESLint no-unused-vars does not count JSX member expressions such as
// <motion.div> as a usage of the motion import, so it reads as unused.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './VPCDiagram.css'; 

export default function ServerlessDiagram() {
    const [activeComponent, setActiveComponent] = useState(null);

    // Diagram accents are tokens, not literals, so the illustration follows the
    // active theme. Roles match the rest of the gallery:
    //   1 = ingress/edges  2 = database
    //   3 = stored data    4 = compute
    const descriptions = {
        s3: { title: "Amazon S3", type: "Storage", desc: "Hosts your static frontend (HTML/CSS/React). Scales infinitely and requires zero servers to manage.", icon: "fa-box-archive", color: "var(--diagram-3)" },
        apiGateway: { title: "Amazon API Gateway", type: "Routing", desc: "Acts as the 'Front Door'. It receives HTTP requests from the React app and securely routes them to your code.", icon: "fa-door-open", color: "var(--diagram-1)" },
        lambda: { title: "AWS Lambda", type: "Compute", desc: "Executes backend code only when triggered. It scales automatically from 1 to 10,000 requests per second. You pay by the millisecond.", icon: "fa-bolt", color: "var(--diagram-4)" },
        dynamodb: { title: "Amazon DynamoDB", type: "Database", desc: "A Serverless NoSQL Database. Provides single-digit millisecond response times and handles millions of requests without complex clustering.", icon: "fa-database", color: "var(--diagram-2)" }
    };

    return (
        <div className="vpc-diagram-container" style={{marginTop: '3rem', position: 'relative'}}>
            <motion.div 
                className="vpc-boundary"
                style={{borderColor: 'var(--diagram-4)', borderStyle: 'dashed'}}
            >
                <div className="boundary-label" style={{color: 'var(--diagram-4)'}}>
                    <i className="fa-solid fa-cloud"></i> Serverless Architecture Pattern
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', marginTop: '20px' }}>
                    
                    {/* User & Frontend Row */}
                    <div className="components-row" style={{justifyContent: 'center', width: '100%'}}>
                        <div style={{textAlign: 'center', marginRight: '20px', color: 'var(--text-muted)'}}>
                            <i className="fa-solid fa-laptop" style={{fontSize: '2rem', marginBottom: '10px'}}></i>
                            <div style={{fontSize: '0.8rem'}}>Client device</div>
                        </div>

                        <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>

                        <motion.div 
                            className="component"
                            onMouseEnter={(e) => { e.stopPropagation(); setActiveComponent('s3'); }}
                            onMouseLeave={() => setActiveComponent(null)}
                            whileHover={{ scale: 1.05, borderColor: descriptions.s3.color, boxShadow: `0 0 15px ${descriptions.s3.color}40` }}
                        >
                            <i className={`fa-solid ${descriptions.s3.icon} component-icon`} style={{color: descriptions.s3.color}}></i>
                            <span>{descriptions.s3.title}</span>
                            <div style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>Static Web Hosting</div>
                        </motion.div>
                    </div>

                    <div className="arrow-connector" style={{transform: 'rotate(90deg)', margin: '10px 0'}}><i className="fa-solid fa-arrow-right"></i></div>

                    {/* Backend Row */}
                    <div className="components-row" style={{background: 'var(--surface-inset)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', position: 'relative'}}>
                        <div style={{position: 'absolute', top: -10, left: 15, background: 'var(--surface-1)', padding: '0 10px', fontSize: '0.8rem', color: 'var(--diagram-1)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)'}}>
                            Dynamic Backend
                        </div>
                        
                        <motion.div 
                            className="component"
                            onMouseEnter={(e) => { e.stopPropagation(); setActiveComponent('apiGateway'); }}
                            onMouseLeave={() => setActiveComponent(null)}
                            whileHover={{ scale: 1.05, borderColor: descriptions.apiGateway.color, boxShadow: `0 0 15px ${descriptions.apiGateway.color}40` }}
                        >
                            <i className={`fa-solid ${descriptions.apiGateway.icon} component-icon`} style={{color: descriptions.apiGateway.color}}></i>
                            <span>{descriptions.apiGateway.title}</span>
                        </motion.div>

                        <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>

                        <motion.div 
                            className="component"
                            onMouseEnter={(e) => { e.stopPropagation(); setActiveComponent('lambda'); }}
                            onMouseLeave={() => setActiveComponent(null)}
                            whileHover={{ scale: 1.05, borderColor: descriptions.lambda.color, boxShadow: `0 0 15px ${descriptions.lambda.color}40` }}
                        >
                            <i className={`fa-solid ${descriptions.lambda.icon} component-icon`} style={{color: descriptions.lambda.color}}></i>
                            <span>{descriptions.lambda.title}</span>
                        </motion.div>

                        <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>

                        <motion.div 
                            className="component"
                            onMouseEnter={(e) => { e.stopPropagation(); setActiveComponent('dynamodb'); }}
                            onMouseLeave={() => setActiveComponent(null)}
                            whileHover={{ scale: 1.05, borderColor: descriptions.dynamodb.color, boxShadow: `0 0 15px ${descriptions.dynamodb.color}40` }}
                        >
                            <i className={`fa-solid ${descriptions.dynamodb.icon} component-icon`} style={{color: descriptions.dynamodb.color}}></i>
                            <span>{descriptions.dynamodb.title}</span>
                        </motion.div>
                    </div>

                </div>

                <AnimatePresence>
                    {activeComponent && (
                        <motion.div 
                            className="glass-tooltip"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{ borderLeft: `5px solid ${descriptions[activeComponent].color}`, zIndex: 100 }}
                        >
                            <h4 style={{ color: descriptions[activeComponent].color }}>
                                <i className={`fa-solid ${descriptions[activeComponent].icon}`} style={{marginRight: '8px'}}></i>
                                {descriptions[activeComponent].title}
                            </h4>
                            <span className="mode-badge" style={{background: 'var(--surface-2)', color: 'var(--text-primary)'}}>{descriptions[activeComponent].type}</span>
                            <p>{descriptions[activeComponent].desc}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
