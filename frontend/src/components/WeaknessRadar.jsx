import { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { examQuestions } from '../questionsData.js';

export default function WeaknessRadar({ incorrectIds = [] }) {

    const chartData = useMemo(() => {
        const buckets = {
            'Security': { total: 0, bad: 0 },
            'Billing & Cost': { total: 0, bad: 0 },
            'Compute & Storage': { total: 0, bad: 0 },
            'Architecture': { total: 0, bad: 0 },
            'Databases': { total: 0, bad: 0 },
        };

        examQuestions.forEach(q => {
            let bucket = 'Architecture'; 
            const t = q.text.toLowerCase();
            
            if (t.includes('iam') || t.includes('security') || t.includes('waf') || t.includes('shield') || t.includes('macie')) {
                bucket = 'Security';
            } else if (t.includes('billing') || t.includes('cost') || t.includes('pricing') || t.includes('organization')) {
                bucket = 'Billing & Cost';
            } else if (t.includes('ec2') || t.includes('s3') || t.includes('ebs') || t.includes('efs') || t.includes('lambda')) {
                bucket = 'Compute & Storage';
            } else if (t.includes('rds') || t.includes('dynamodb') || t.includes('aurora') || t.includes('redshift') || t.includes('database')) {
                bucket = 'Databases';
            }

            buckets[bucket].total += 1;
            if (incorrectIds.includes(q.id)) {
                buckets[bucket].bad += 1;
            }
        });

        // Convert to Recharts format. Score = 100 is perfectly strong. 
        // We drop points based on how many they got wrong out of the total available.
        return Object.keys(buckets).map(k => {
            const ratio = buckets[k].total > 0 ? (buckets[k].bad / buckets[k].total) : 0;
            // Heavily penalize the graph so it's visibly obvious where they are weak
            const strength = Math.max(0, 100 - (ratio * 100 * 3)); 
            
            return {
                subject: k,
                strength: Math.min(100, Math.round(strength)),
                fullMark: 100
            };
        });
    }, [incorrectIds]);

    return (
        <div style={{ width: '100%', height: 350, background: 'rgba(0,0,0,0.2)', borderRadius: '15px', padding: '1rem', marginTop: '2rem' }}>
            <h3 style={{textAlign: 'center', color: 'var(--accent-blue)', marginBottom: '0'}}>Domain Mastery Radar</h3>
            <p style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '5px'}}>The tighter the web, the more vulnerable your knowledge domain.</p>
            
            <ResponsiveContainer width="100%" height="85%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'var(--accent-purple)', borderRadius: '8px', color: 'white' }}
                        itemStyle={{ color: '#50fa7b' }}
                        formatter={(value) => [`${value}% Mastery`, 'Score']}
                    />
                    <Radar name="Student Profile" dataKey="strength" stroke="var(--accent-purple)" fill="var(--accent-purple)" fillOpacity={0.5} animationDuration={1500} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
