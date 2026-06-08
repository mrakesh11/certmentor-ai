import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiagramHA() {
    const [active, setActive] = useState(null);

    const info = {
        route53: { title: "Route 53", type: "DNS", desc: "Routes global user traffic to the closest, healthiest AWS endpoint using latency routing.", icon: "fa-route", color: "#ffb86c" },
        cloudfront: { title: "CloudFront", type: "CDN", desc: "Caches static content at massive Edge Locations worldwide for ultra-low latency.", icon: "fa-bolt", color: "#ffb86c" },
        alb: { title: "Application Load Balancer", type: "Traffic", desc: "Sits in public subnets across 2 AZs. Distributes incoming requests equally to healthy backend EC2 instances.", icon: "fa-network-wired", color: "#8be9fd" },
        asg: { title: "Auto Scaling Group", type: "Compute", desc: "Automatically spins up more EC2 web servers when CPU traffic spikes, across entirely different data centers.", icon: "fa-server", color: "#ff79c6" },
        rds: { title: "RDS Multi-AZ", type: "Database", desc: "Primary database runs in AZ A. Synchronous replication keeps the Standby DB fully updated in AZ B. Fails over automatically.", icon: "fa-database", color: "#50fa7b" }
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
                    <div className="vpc-boundary" style={{borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed', flex: 1}}>
                        <div className="boundary-label" style={{color: 'white'}}><i className="fa-solid fa-building"></i> Availability Zone A</div>
                        
                        <div className="subnet" style={{background: 'rgba(0, 210, 255, 0.05)', borderColor: 'var(--accent-blue)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--accent-blue)'}}>Public Subnet</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('alb'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-network-wired component-icon" style={{color: info.alb.color}}></i>
                                <span>ALB Node A</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'rgba(122, 34, 255, 0.05)', borderColor: 'var(--accent-purple)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--accent-purple)'}}>Private Subnet (App Tier)</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('asg'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-server component-icon" style={{color: info.asg.color}}></i>
                                <span>EC2 Instance (Active)</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'rgba(16, 185, 129, 0.05)', borderColor: 'var(--correct-green)'}}>
                            <div className="boundary-label" style={{color: 'var(--correct-green)'}}>Private Subnet (Data Tier)</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto', borderColor: info.rds.color}} onMouseEnter={(e) => { e.stopPropagation(); setActive('rds'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-database component-icon" style={{color: info.rds.color}}></i>
                                <span>RDS Master (Active)</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Availability Zone B */}
                    <div className="vpc-boundary" style={{borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed', flex: 1}}>
                        <div className="boundary-label" style={{color: 'white'}}><i className="fa-solid fa-building"></i> Availability Zone B</div>
                        
                        <div className="subnet" style={{background: 'rgba(0, 210, 255, 0.05)', borderColor: 'var(--accent-blue)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--accent-blue)'}}>Public Subnet</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('alb'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-network-wired component-icon" style={{color: info.alb.color}}></i>
                                <span>ALB Node B</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'rgba(122, 34, 255, 0.05)', borderColor: 'var(--accent-purple)', marginBottom: '15px'}}>
                            <div className="boundary-label" style={{color: 'var(--accent-purple)'}}>Private Subnet (App Tier)</div>
                            <motion.div className="component" style={{width: '90%', margin: '0 auto'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('asg'); }} onMouseLeave={() => setActive(null)}>
                                <i className="fa-solid fa-server component-icon" style={{color: info.asg.color}}></i>
                                <span>EC2 Instance (Active)</span>
                            </motion.div>
                        </div>

                        <div className="subnet" style={{background: 'rgba(16, 185, 129, 0.05)', borderColor: 'var(--correct-green)'}}>
                            <div className="boundary-label" style={{color: 'var(--correct-green)'}}>Private Subnet (Data Tier)</div>
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
                        <span className="mode-badge" style={{background: 'rgba(255,255,255,0.1)'}}>{info[active].type}</span>
                        <p>{info[active].desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
