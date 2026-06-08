import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CheatsheetViewer.css';

export default function CheatsheetViewer() {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        fetch(`/cheatsheets/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("File not found");
                return res.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Remove all style tags
                const styles = doc.querySelectorAll('style');
                styles.forEach(s => s.remove());

                // We only want the body content
                setContent(doc.body.innerHTML);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setContent('<div class="error-msg">Failed to load content. Ensure the file exists.</div>');
                setLoading(false);
            });
    }, [id]);

    return (
        <div className="viewer-container">
            <motion.div 
                className="viewer-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="viewer-header">
                    <Link to="/" className="btn-back">
                        <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
                    </Link>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        <p>Loading cheatsheet...</p>
                    </div>
                ) : (
                    <div 
                        className="cheatsheet-content" 
                        dangerouslySetInnerHTML={{ __html: content }} 
                    />
                )}
            </motion.div>
        </div>
    );
}
