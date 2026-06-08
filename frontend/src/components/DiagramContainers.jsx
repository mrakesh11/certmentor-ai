import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiagramContainers() {
    const [active, setActive] = useState(null);

    const info = {
        ecr: { title: "Amazon ECR", type: "Registry", desc: "A fully-managed Docker container registry. Developers push their Docker images here to be securely stored.", icon: "fa-box", color: "#ffb86c" },
        alb: { title: "Application Load Balancer", type: "Traffic", desc: "Routes external HTTP requests perfectly into the correct microservice containers.", icon: "fa-network-wired", color: "#8be9fd" },
        ecs: { title: "Amazon ECS Cluster", type: "Orchestrator", desc: "The brain that manages and monitors all the running Docker containers.", icon: "fa-cubes", color: "#ff79c6" },
        fargate: { title: "AWS Fargate", type: "Compute", desc: "Serverless compute engine for containers. Runs the Docker containers physically without you ever provisioning or managing an EC2 server.", icon: "fa-server", color: "#50fa7b" },
        dynamodb: { title: "Amazon DynamoDB", type: "Database", desc: "Provides persistent, rapid NoSQL storage for the stateless microservices.", icon: "fa-database", color: "#f1f1f1" }
    };

    return (
        <div className="vpc-diagram-container" style={{position: 'relative', marginTop: '2rem'}}>
            <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Microservices Container Architecture</h3>
            
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('ecr'); }} onMouseLeave={() => setActive(null)}>
                    <i className="fa-solid fa-box component-icon" style={{color: info.ecr.color}}></i>
                    <span>{info.ecr.title}</span>
                </motion.div>
                <div style={{marginLeft: '15px', color: 'var(--text-muted)'}}><i className="fa-solid fa-arrow-down"></i> (Deploys Images)</div>
            </div>

            <div className="vpc-boundary">
                <div className="boundary-label"><i className="fa-solid fa-cloud"></i> Amazon VPC</div>
                
                <div className="subnet" style={{background: 'rgba(0, 210, 255, 0.05)', borderColor: 'var(--accent-blue)', marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>
                    <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('alb'); }} onMouseLeave={() => setActive(null)}>
                        <i className="fa-solid fa-network-wired component-icon" style={{color: info.alb.color}}></i>
                        <span>{info.alb.title}</span>
                    </motion.div>
                </div>

                <div className="arrow-connector" style={{transform: 'rotate(90deg)', margin: '10px auto', display: 'block', width: '20px'}}><i className="fa-solid fa-arrow-right"></i></div>

                <div className="vpc-boundary" style={{borderColor: info.ecs.color, borderStyle: 'solid', background: 'rgba(255,121,198,0.05)'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('ecs'); }} onMouseLeave={() => setActive(null)}>
                    <div className="boundary-label" style={{color: info.ecs.color}}><i className="fa-solid fa-cubes"></i> ECS Cluster</div>
                    
                    <div className="components-row" style={{justifyContent: 'center', gap: '20px'}}>
                        <motion.div className="component" style={{borderColor: info.fargate.color, borderStyle: 'dashed'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('fargate'); }} onMouseLeave={(e) => { e.stopPropagation(); setActive('ecs'); }}>
                            <i className="fa-solid fa-server component-icon" style={{color: info.fargate.color}}></i>
                            <span>Fargate Task (Auth API)</span>
                        </motion.div>
                        <motion.div className="component" style={{borderColor: info.fargate.color, borderStyle: 'dashed'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('fargate'); }} onMouseLeave={(e) => { e.stopPropagation(); setActive('ecs'); }}>
                            <i className="fa-solid fa-server component-icon" style={{color: info.fargate.color}}></i>
                            <span>Fargate Task (Order API)</span>
                        </motion.div>
                        <motion.div className="component" style={{borderColor: info.fargate.color, borderStyle: 'dashed'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('fargate'); }} onMouseLeave={(e) => { e.stopPropagation(); setActive('ecs'); }}>
                            <i className="fa-solid fa-server component-icon" style={{color: info.fargate.color}}></i>
                            <span>Fargate Task (Cart API)</span>
                        </motion.div>
                    </div>
                </div>

                <div className="arrow-connector" style={{transform: 'rotate(90deg)', margin: '10px auto', display: 'block', width: '20px'}}><i className="fa-solid fa-arrow-right"></i></div>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('dynamodb'); }} onMouseLeave={() => setActive(null)}>
                        <i className="fa-solid fa-database component-icon" style={{color: info.dynamodb.color}}></i>
                        <span>{info.dynamodb.title}</span>
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {active && (
                    <motion.div className="glass-tooltip" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ borderLeft: `5px solid ${info[active].color}`, top: '40%', zIndex: 100 }}>
                        <h4 style={{ color: info[active].color }}><i className={`fa-solid ${info[active].icon}`}></i> {info[active].title}</h4>
                        <span className="mode-badge" style={{background: 'rgba(255,255,255,0.1)'}}>{info[active].type}</span>
                        <p>{info[active].desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
