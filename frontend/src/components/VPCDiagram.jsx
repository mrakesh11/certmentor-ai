import { useState } from 'react';
// ESLint no-unused-vars does not count JSX member expressions such as
// <motion.div> as a usage of the motion import, so it reads as unused.
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './VPCDiagram.css';

const vpcData = {
    igw: { id: 'igw', title: 'Internet Gateway (IGW)', desc: 'Allows communication between the VPC and the internet. Required for Public Subnets to be truly public.' },
    vpc: { id: 'vpc', title: 'Virtual Private Cloud (VPC)', desc: 'A logically isolated section of the AWS Cloud where you launch AWS resources in a virtual network.' },
    publicSubnet: { id: 'public-subnet', title: 'Public Subnet', desc: 'A subnet whose route table directs internet-bound traffic to the IGW. Hosts resources like NAT Gateways and ALBs.' },
    privateSubnet: { id: 'private-subnet', title: 'Private Subnet', desc: 'A subnet with no direct route to the internet. Highly secure. Uses a NAT Gateway to fetch external updates.' },
    nat: { id: 'nat', title: 'NAT Gateway', desc: 'Allows instances in the Private Subnet to connect to the internet (for updates) but prevents the internet from initiating connections to them.' },
    ec2Public: { id: 'ec2-pub', title: 'Bastion/Web EC2', desc: 'An application/web server sitting in the public subnet, publicly accessible.' },
    ec2Private: { id: 'ec2-priv', title: 'Database/App EC2', desc: 'A deeply secure backend server or database that only communicates within the VPC.' },
    router: { id: 'router', title: 'Route Table', desc: 'Contains a set of rules (routes) that determine where network traffic from your subnet or gateway is directed.' }
};

export default function VPCDiagram() {
    const [hoveredNode, setHoveredNode] = useState(null);

    const handleHover = (id) => setHoveredNode(vpcData[id]);
    const handleLeave = () => setHoveredNode(null);

    return (
        <div className="vpc-diagram-container">
            <h3 style={{color: 'white', textAlign: 'center', marginBottom: '20px'}}>Interactive VPC Architecture</h3>
            
            <div className="vpc-canvas">
                {/* The main VPC Boundary */}
                <motion.div 
                    className="aws-resource vpc-boundary"
                    onMouseEnter={() => handleHover('vpc')}
                    onMouseLeave={handleLeave}
                    whileHover={{ borderColor: 'var(--diagram-3)' }}
                >
                    <span className="label">VPC Boundary</span>

                    {/* Internet Gateway */}
                    <motion.div 
                        className="aws-resource component igw"
                        onMouseEnter={(e) => { e.stopPropagation(); handleHover('igw'); }}
                        onMouseLeave={handleLeave}
                        whileHover={{ scale: 1.05, backgroundColor: 'color-mix(in srgb, var(--diagram-4) 18%, transparent)' }}
                    >
                        <i className="fa-solid fa-cloud"></i> IGW
                    </motion.div>

                    {/* Route Table */}
                    <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
                        <motion.div 
                            className="aws-resource component router"
                            onMouseEnter={(e) => { e.stopPropagation(); handleHover('router'); }}
                            onMouseLeave={handleLeave}
                            whileHover={{ scale: 1.05, backgroundColor: 'color-mix(in srgb, var(--diagram-2) 18%, transparent)' }}
                        >
                            <i className="fa-solid fa-route"></i> Route Table
                        </motion.div>
                    </div>

                    <div className="subnets-container">
                        {/* Public Subnet */}
                        <motion.div 
                            className="aws-resource subnet public"
                            onMouseEnter={(e) => { e.stopPropagation(); handleHover('publicSubnet'); }}
                            onMouseLeave={handleLeave}
                            whileHover={{ borderColor: 'var(--diagram-2)' }}
                        >
                            <span className="label">Public Subnet</span>
                            
                            <div className="components-row">
                                <motion.div 
                                    className="aws-resource component ec2"
                                    onMouseEnter={(e) => { e.stopPropagation(); handleHover('ec2Public'); }}
                                    onMouseLeave={handleLeave}
                                    whileHover={{ scale: 1.1, backgroundColor: 'color-mix(in srgb, var(--diagram-1) 18%, transparent)' }}
                                >
                                    <i className="fa-solid fa-server"></i> Web EC2
                                </motion.div>
                                <motion.div 
                                    className="aws-resource component nat"
                                    onMouseEnter={(e) => { e.stopPropagation(); handleHover('nat'); }}
                                    onMouseLeave={handleLeave}
                                    whileHover={{ scale: 1.1, backgroundColor: 'color-mix(in srgb, var(--danger) 18%, transparent)' }}
                                >
                                    <i className="fa-solid fa-ethernet"></i> NAT GW
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Private Subnet */}
                        <motion.div 
                            className="aws-resource subnet private"
                            onMouseEnter={(e) => { e.stopPropagation(); handleHover('privateSubnet'); }}
                            onMouseLeave={handleLeave}
                            whileHover={{ borderColor: 'var(--diagram-4)' }}
                        >
                            <span className="label">Private Subnet</span>
                            
                            <div className="components-row" style={{justifyContent: 'center'}}>
                                <motion.div 
                                    className="aws-resource component ec2 secure"
                                    onMouseEnter={(e) => { e.stopPropagation(); handleHover('ec2Private'); }}
                                    onMouseLeave={handleLeave}
                                    whileHover={{ scale: 1.1, backgroundColor: 'color-mix(in srgb, var(--diagram-3) 18%, transparent)' }}
                                >
                                    <i className="fa-solid fa-database"></i> DB EC2
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                </motion.div>

                {/* Tooltip Overlay */}
                <AnimatePresence>
                    {hoveredNode && (
                        <motion.div 
                            className="glass-tooltip"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <h4>{hoveredNode.title}</h4>
                            <p>{hoveredNode.desc}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
