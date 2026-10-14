import { useState } from 'react';
// ESLint no-unused-vars does not count JSX member expressions such as
// <motion.div> as a usage of the motion import, so it reads as unused.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

export default function DiagramContainers() {
    const [active, setActive] = useState(null);

    // Diagram accents are tokens, not literals, so the illustration follows the
    // active theme. Roles match the rest of the gallery:
    //   1 = registries/edges  2 = traffic/public
    //   3 = secure data       4 = compute/orchestration
    const info = {
        ecr: { title: "Amazon ECR", type: "Registry", desc: "A fully-managed Docker container registry. Developers push their Docker images here to be securely stored.", icon: "fa-box", color: "var(--diagram-1)" },
        alb: { title: "Application Load Balancer", type: "Traffic", desc: "Routes external HTTP requests perfectly into the correct microservice containers.", icon: "fa-network-wired", color: "var(--diagram-2)" },
        ecs: { title: "Amazon ECS Cluster", type: "Orchestrator", desc: "The brain that manages and monitors all the running Docker containers.", icon: "fa-cubes", color: "var(--diagram-4)" },
        fargate: { title: "AWS Fargate", type: "Compute", desc: "Serverless compute engine for containers. Runs the Docker containers physically without you ever provisioning or managing an EC2 server.", icon: "fa-server", color: "var(--diagram-4)" },
        dynamodb: { title: "Amazon DynamoDB", type: "Database", desc: "Provides persistent, rapid NoSQL storage for the stateless microservices.", icon: "fa-database", color: "var(--diagram-3)" }
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
                
                <div className="subnet" style={{background: 'color-mix(in srgb, var(--diagram-2) 6%, transparent)', borderColor: 'var(--diagram-2)', marginBottom: '15px', display: 'flex', justifyContent: 'center'}}>
                    <motion.div className="component" style={{padding: '15px 30px'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('alb'); }} onMouseLeave={() => setActive(null)}>
                        <i className="fa-solid fa-network-wired component-icon" style={{color: info.alb.color}}></i>
                        <span>{info.alb.title}</span>
                    </motion.div>
                </div>

                <div className="arrow-connector" style={{transform: 'rotate(90deg)', margin: '10px auto', display: 'block', width: '20px'}}><i className="fa-solid fa-arrow-right"></i></div>

                <div className="vpc-boundary" style={{borderColor: info.ecs.color, borderStyle: 'solid', background: 'color-mix(in srgb, var(--diagram-4) 6%, transparent)'}} onMouseEnter={(e) => { e.stopPropagation(); setActive('ecs'); }} onMouseLeave={() => setActive(null)}>
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
                        <span className="mode-badge" style={{background: 'var(--surface-2)'}}>{info[active].type}</span>
                        <p>{info[active].desc}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
