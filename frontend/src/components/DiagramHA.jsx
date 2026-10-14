import { useState } from 'react';
// ESLint no-unused-vars does not count JSX member expressions such as
// <motion.div> as a usage of the motion import, so it reads as unused.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function DiagramHA() {
    const [active, setActive] = useState(null);

    // Diagram accents are tokens, not literals, so every illustration follows
    // the active theme. Roles are consistent across the gallery:
    //   1 = gateways/edges   2 = traffic/public
    //   3 = secure data      4 = compute/pipeline
    const info = {
        route53: { title: "Route 53", type: "DNS", desc: "Routes global user traffic to the closest, healthiest AWS endpoint using latency routing.", icon: "fa-route", color: "var(--diagram-1)" },
        cloudfront: { title: "CloudFront", type: "CDN", desc: "Caches static content at massive Edge Locations worldwide for ultra-low latency.", icon: "fa-bolt", color: "var(--diagram-1)" },
        alb: { title: "Application Load Balancer", type: "Traffic", desc: "Sits in public subnets across 2 AZs. Distributes incoming requests equally to healthy backend EC2 instances.", icon: "fa-network-wired", color: "var(--diagram-2)" },
        asg: { title: "Auto Scaling Group", type: "Compute", desc: "Automatically spins up more EC2 web servers when CPU traffic spikes, across entirely different data centers.", icon: "fa-server", color: "var(--diagram-4)" },
        rds: { title: "RDS Multi-AZ", type: "Database", desc: "Primary database runs in AZ A. Synchronous replication keeps the Standby DB fully updated in AZ B. Fails over automatically.", icon: "fa-database", color: "var(--diagram-3)" }
    };

    return (
        <div className="vpc-diagram-container" style={{position: 'relative'}}>
            {/* Global Edge */}
            <div style={{display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '20px'}}>
                <motion.div className="component" onMouseEnter={(e) => { e.stopPropagation(); setActive('route53'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-route component-icon" style={{color: info.route53.color}}></i>
                    <span>{info.route53.title}</span>
                </motion.div>
                <div className="arrow-connector" style={{alignSelf: 'center'}}><i className="fa-solid fa-arrow-right"></i></div>
                <motion.div className="component" onMouseEnter={(e) => { e.stopPropagation(); setActive('cloudfront'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-bolt component-icon" style={{color: info.cloudfront.color}}></i>
                    <span>{info.cloudfront.title}</span>
                </motion.div>
            </div>

            <div className="arrow-connector" style={{transform: 'rotate(90deg)', margin: '10px auto', display: 'block', width: '20px'}}><i className="fa-solid fa-arrow-right"></i></div>

            {/* AWS Region -> VPC */}
            <div className="vpc-boundary">
                <div className="boundary-label"><i className="fa-solid fa-cloud"></i> AWS Region | Amazon VPC</div>
                <div className="subnets-container" style={{gap: '15px'}}>
                    
                    {/* Availability Zone A */}
                    <div className="vpc-boundary" style={{borderColor: 'var(--border-default)', borderStyle: 'dashed', flex: 1}}>
                        <div className="boundary-label" style={{color: 'var(--text-primary)'}}><i className="fa-solid fa-building"></i> Availability Zone A</div>
                        
                        <div className="subnet" style={{background: 'color-mix(in srgb, var(--diagram-2) 6%, transparent)', borderColor: 'var(--diagram-2)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--diagram-2)'}}>Public Subnet</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('alb'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-network-wired component-icon" style={{color: info.alb.color}}></i>
                                <span>ALB Node A</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'color-mix(in srgb, var(--diagram-4) 6%, transparent)', borderColor: 'var(--diagram-4)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--diagram-4)'}}>Private Subnet (App Tier)</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('asg'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-server component-icon" style={{color: info.asg.color}}></i>
                                <span>EC2 Instance (Active)</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'color-mix(in srgb, var(--diagram-3) 6%, transparent)', borderColor: 'var(--diagram-3)'}}>
                            <div className="boundary-label" style={{color: 'var(--diagram-3)'}}>Private Subnet (Data Tier)</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto', borderColor: info.rds.color}} onMouseEnter={(e) => { e.stopPropagation(); setActive('rds'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-database component-icon" style={{color: info.rds.color}}></i>
                                <span>RDS Master (Active)</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Availability Zone B */}
                    <div className="vpc-boundary" style={{borderColor: 'var(--border-default)', borderStyle: 'dashed', flex: 1}}>
                        <div className="boundary-label" style={{color: 'var(--text-primary)'}}><i className="fa-solid fa-building"></i> Availability Zone B</div>
                        
                        <div className="subnet" style={{background: 'color-mix(in srgb, var(--diagram-2) 6%, transparent)', borderColor: 'var(--diagram-2)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--diagram-2)'}}>Public Subnet</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('alb'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-network-wired component-icon" style={{color: info.alb.color}}></i>
                                <span>ALB Node B</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'color-mix(in srgb, var(--diagram-4) 6%, transparent)', borderColor: 'var(--diagram-4)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--diagram-4)'}}>Private Subnet (App Tier)</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('asg'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-server component-icon" style={{color: info.asg.color}}></i>
                                <span>EC2 Instance (Active)</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'color-mix(in srgb, var(--diagram-3) 6%, transparent)', borderColor: 'var(--diagram-3)'}}>
                            <div className="boundary-label" style={{color: 'var(--diagram-3)'}}>Private Subnet (Data Tier)</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto', opacity: 0.7}} onMouseEnter={(e) => { e.stopPropagation(); setActive('rds'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-database component-icon" style={{color: info.rds.color}}></i>
                                <span>RDS Standby (Passive)</span>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div className="glass-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ borderLeft: `5px solid ${info[active].color}`, zIndex: 100 }}>
                        <h4 style={{ color: info[active].color }}><i className={`fa-solid ${info[active].icon}`}></i> {info[active].title}</h4>
                        <span className="mode-badge" style={{background: 'var(--surface-2)'}}>{info[active].type}</span>
                        <p>{info[active].desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
