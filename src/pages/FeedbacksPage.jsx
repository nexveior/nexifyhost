import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Award, MessageSquare, Send, ThumbsUp, UserCheck } from 'lucide-react';

const initialReviews = [
  {
    id: 1,
    name: 'XenonMaster',
    plan: 'Minecraft Budget — Xenora Matrix',
    rating: 5,
    date: 'July 28, 2026',
    verified: true,
    text: 'Insane 11ms latency! The AMD Ryzen 9 nodes run 40+ plugins smoothly with zero tick drops. Customer support via Discord tickets resolved my setup in 2 minutes!'
  },
  {
    id: 2,
    name: 'CyberDev_99',
    plan: 'Discord Bot Hosting — Pro Tier',
    rating: 5,
    date: 'July 25, 2026',
    verified: true,
    text: 'Best Discord bot hosting in the market. 100% uptime with 4GB DDR5 RAM for $2.40/mo. Node status ping is real and super fast!'
  },
  {
    id: 3,
    name: 'ShadowCraft CEO',
    plan: 'Minecraft Performance — Synapse Prime',
    rating: 5,
    date: 'July 20, 2026',
    verified: true,
    text: 'Transferred 120 active players server from another host to Nexify Host. The L7 Anti-DDoS protection blocked multiple heavy attacks cleanly.'
  },
  {
    id: 4,
    name: 'VortexNode',
    plan: 'Pterodactyl Panel Extensions',
    rating: 5,
    date: 'July 18, 2026',
    verified: true,
    text: 'Purchased the Monaco Code Editor & CPU Burst Controller extensions. Installation via Discord ticket was automated and flawless!'
  }
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('nexify_user_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [formName, setFormName] = useState('');
  const [formPlan, setFormPlan] = useState('Minecraft Budget');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('nexify_user_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) return;

    const newRev = {
      id: Date.now(),
      name: formName.trim(),
      plan: formPlan,
      rating: formRating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true,
      text: formText.trim()
    };

    setReviews([newRev, ...reviews]);
    setFormName('');
    setFormText('');
    setSubmittedMessage('Thank you! Your review has been published successfully.');
    setTimeout(() => setSubmittedMessage(''), 5000);
  };

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section style={{ padding: '4rem 0 5rem', minHeight: '85vh' }}>
      <div className="container">
        {/* Reviews Hero */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-glass)",
            borderRadius: "24px",
            padding: "clamp(1.25rem,4vw,2rem)",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(16,185,129,.12)",
                  color: "var(--success)",
                  padding: ".35rem .75rem",
                  borderRadius: "999px",
                  fontSize: ".8rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                <UserCheck size={14} />
                Verified Company
              </span>

              <h1
                style={{
                  margin: 0,
                  color: "#fff",
                  fontSize: "clamp(1.8rem,5vw,2.4rem)",
                  fontWeight: 800,
                }}
              >
                Customer Reviews
              </h1>

              <p
                style={{
                  marginTop: ".75rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  maxWidth: "620px",
                }}
              >
                Read verified reviews from customers who have used Nexify Host's
                Minecraft, VPS and Discord hosting services.
              </p>
            </div>

            {/* Right */}
            <div
              style={{
                border: "1px solid var(--border-glass)",
                borderRadius: "18px",
                padding: "1.5rem",
                textAlign: "center",
                background: "rgba(255,255,255,.03)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.3rem,8vw,3rem)",
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                {averageRating}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "4px",
                  margin: ".6rem 0",
                }}
              >
                {[1,2,3,4,5].map((i)=>(
                  <div
                    key={i}
                    style={{
                      width:30,
                      height:30,
                      borderRadius:6,
                      background:"var(--success)",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center"
                    }}
                  >
                    <Star size={16} fill="#fff" color="#fff"/>
                  </div>
                ))}
              </div>

              <div
                style={{
                  color:"var(--text-muted)",
                  fontSize:".9rem"
                }}
              >
                Based on <strong style={{color:"#fff"}}>{reviews.length}</strong> verified reviews
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List & Write Review Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            alignItems: "start"
          }}
        >
          {/* Left: Customer Reviews Feed */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem' }}>
              💬 Verified Customer Reviews ({reviews.length})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: "22px",
                    padding: "clamp(1rem,3vw,1.75rem)",
                    transition: ".25s ease",
                    boxShadow: "none",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        className="avatar-circle"
                        style={{
                            width:"clamp(44px,8vw,56px)",
                            height:"clamp(44px,8vw,56px)",
                            fontSize:"1.2rem",
                            fontWeight:700
                        }}
                      >
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight:800, fontSize:"1.05rem", letterSpacing:".2px", color:"var(--text-main)" }}>{rev.name}</span>
                          {rev.verified && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--success)', fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '50px' }}>
                              <UserCheck size={11} /> Verified Buyer
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                          <span
                            style={{
                            display:"inline-block",
                            padding:"4px 10px",
                            borderRadius:"999px",
                            background:"rgba(var(--primary-rgb),.12)",
                            color:"var(--primary)",
                            fontSize:".75rem",
                            fontWeight:600,
                            marginTop:"6px"
                            }}
                            >
                            {rev.plan}
                            </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{rev.date}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>

                  <p style={{ color: 'var(--text-main)', fontSize: '0.925rem', lineHeight: '1.6' }}>
                    {rev.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Write a Review Form */}
          <div className="review-sidebar">
            <div className="review-form-box" style={{ maxWidth: '100%' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} color="var(--primary)" /> Write a Review
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Share your host experience with our global community.
              </p>

              {submittedMessage && (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: 'var(--success)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 600 }}>
                  {submittedMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name / Gamer Tag</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SiyanDev"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hosting Product Used</label>
                  <select
                    value={formPlan}
                    onChange={(e) => setFormPlan(e.target.value)}
                    className="form-select"
                  >
                    <option value="Minecraft Budget">Minecraft Budget</option>
                    <option value="Minecraft Performance">Minecraft Performance</option>
                    <option value="Discord Bot Hosting">Discord Bot Hosting</option>
                    <option value="Pterodactyl Extensions">Pterodactyl Extensions</option>
                    <option value="Domain Registration">Domain Registration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Rating (1 to 5 Stars)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        style={{
                          background: star <= formRating ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${star <= formRating ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)'}`,
                          borderRadius: '8px',
                          padding: '0.5rem 0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Star size={18} fill={star <= formRating ? '#fbbf24' : 'none'} color={star <= formRating ? '#fbbf24' : 'var(--text-muted)'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Review Message</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us about node performance, ping, or support..."
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} /> Publish Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
