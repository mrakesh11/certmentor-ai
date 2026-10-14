import { useState } from 'react';
// ESLint no-unused-vars does not count JSX member expressions such as
// <motion.div> as a usage of the motion import, so it reads as unused.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function DiagramDecoupled() {
    const [active, setActive] = useState(null);

    // Diagram accents are tokens, not literals, so the illustration follows the
    // active theme. Roles match the rest of the gallery:
    //   1 = ingress/edges  2 = workers/compute
    //   3 = stored data    4 = messaging
    const info = {
        api: { title: "API Gateway", type: "Endpoint", desc: "Receives order requests from the wild web acting as our unbreakable front door.", icon: "fa-door-open", color: "var(--diagram-1)" },
        sns: { title: "Amazon SNS", type: "Pub/Sub", desc: "Immediately broadcasts the incoming order to multiple downstream services simultaneously via Push notifications.", icon: "fa-satellite-dish", color: "var(--diagram-4)" },
        sqs: { title: "Amazon SQS", type: "Queue", desc: "Buffers the incoming messages. Even if your backend crashes, messages queue safely up to 14 days avoiding dropped orders.", icon: "fa-layer-group", color: "var(--diagram-4)" },
        worker: { title: "EC2 Worker Nodes", type: "Compute", desc: "Pulls messages from the queue at its own safe pace. If it dies, the message goes back onto the queue for another node.", icon: "fa-server", color: "var(--diagram-2)" },
        s3: { title: "Amazon S3", type: "Storage", desc: "The final processed order gets saved here securely and redundantly.", icon: "fa-box-archive", color: "var(--diagram-3)" }
    };

    return (
        <div className="vpc-diagram-container" style={{position: 'relative', marginTop: '2rem'}}>
            <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Decoupled Asynchronous Processing</h3>
            
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px'}}>
                
                <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('api'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-door-open component-icon" style={{color: info.api.color}}></i>
                    <span>{info.api.title}</span>
                </motion.div>

                <div className="arrow-connector" style={{transform: 'rotate(90deg)'}}><i className="fa-solid fa-arrow-right"></i></div>

                <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('sns'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-satellite-dish component-icon" style={{color: info.sns.color}}></i>
                    <span>{info.sns.title}</span>
                </motion.div>

                <div className="arrow-connector" style={{transform: 'rotate(90deg)'}}><i className="fa-solid fa-arrow-right"></i></div>

                {/* SQS Buffer Box */}
                <div className="vpc-boundary" style={{borderColor: info.sqs.color, borderStyle: 'dotted', display: 'flex', gap: '20px', background: 'color-mix(in srgb, var(--diagram-4) 6%, transparent)'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('sqs'); }} onMouseLeave={() => setActive(null)}>
                    <div className="boundary-label" style={{color: info.sqs.color}}><i className="fa-solid fa-layer-group"></i> SQS Message Buffer queue</div>
                    <div style={{display: 'flex', gap: '10px', padding: '20px', background: 'var(--surface-inset)', borderRadius: '10px', flex: 1, justifyContent: 'center'}}>
                        <i className="fa-solid fa-envelope" style={{color: 'var(--text-primary)', fontSize: '1.5rem'}}></i>
                        <i className="fa-solid fa-envelope" style={{color: 'var(--text-primary)', fontSize: '1.5rem'}}></i>
                        <i className="fa-solid fa-envelope" style={{color: 'var(--text-primary)', fontSize: '1.5rem'}}></i>
                    </div>
                </div>

                <div className="arrow-connector" style={{transform: 'rotate(90deg)'}}><i className="fa-solid fa-arrow-right"></i></div>

                <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('worker'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-server component-icon" style={{color: info.worker.color}}></i>
                    <span>{info.worker.title} (Polling)</span>
                </motion.div>

                <div className="arrow-connector" style={{transform: 'rotate(90deg)'}}><i className="fa-solid fa-arrow-right"></i></div>

                <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('s3'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-box-archive component-icon" style={{color: info.s3.color}}></i>
                    <span>{info.s3.title}</span>
                </motion.div>

            </div>

            <AnimatePresence>
                {active && (
                    <motion.div className="glass-tooltip" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ borderLeft: `5px solid ${info[active].color}`, top: '20%', zIndex: 100 }}>
                        <h4 style={{ color: info[active].color }}><i className={`fa-solid ${info[active].icon}`}></i> {info[active].title}</h4>
                        <span className="mode-badge" style={{background: 'var(--surface-2)'}}>{info[active].type}</span>
                        <p>{info[active].desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
