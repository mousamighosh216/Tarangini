import { useState, useEffect, useRef } from "react";

/* ── palette ──────────────────────────────────────────────────── */
const C = {
  bg:        "#FDF5F3",
  sidebar:   "#FFFFFF",
  card:      "#FFFFFF",
  primary:   "#D4736A",
  primaryL:  "#F2C4BF",
  primaryBg: "#FAE8E6",
  lavender:  "#C5BDED",
  lavBg:     "#EDE9FA",
  mint:      "#A8D8C8",
  mintBg:    "#E6F5F0",
  yellow:    "#F5D97A",
  yellowBg:  "#FEF6DC",
  text:      "#2C2025",
  muted:     "#9A8890",
  border:    "#F0E6E3",
  shadow:    "0 2px 16px rgba(212,115,106,0.08)",
  shadowMd:  "0 6px 28px rgba(212,115,106,0.16)",
};

const AVAILABLE_TAGS = ["general","tech","design","question","discussion","meta","off-topic","news","help","showcase"];
const NAV = [
  { id:"home",    label:"Home",    icon:"⌂" },
  { id:"popular", label:"Popular", icon:"✦" },
  { id:"tags",    label:"Tags",    icon:"◈" },
  { id:"profile", label:"Profile", icon:"◯" },
];
const TAG_COLORS = {
  tech:       ["#EDE9FA","#C5BDED","#7B6EC4"],
  design:     ["#E6F5F0","#A8D8C8","#4A9E85"],
  question:   ["#FEF6DC","#F5D97A","#B89020"],
  general:    ["#F0EEFF","#C8B8F8","#6040C0"],
  discussion: ["#FAE8E6","#F2C4BF","#D4736A"],
  meta:       ["#E6F0FF","#A8C8F0","#4A78C0"],
  "off-topic":["#FFF3E6","#F5C880","#B07820"],
  news:       ["#E6FFF0","#90D8A8","#3A8060"],
  help:       ["#FAE8E6","#F2C4BF","#D4736A"],
  showcase:   ["#EDE9FA","#C5BDED","#7B6EC4"],
};

function tagColor(label){ return TAG_COLORS[label] || ["#EDE9FA","#C5BDED","#7B6EC4"]; }
function tagStyle(label, active){
  const [bg, border, color] = tagColor(label);
  return {
    display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:"0.04em",
    padding:"3px 10px", borderRadius:20, cursor:"pointer", userSelect:"none",
    border:`1.5px solid ${active ? color : border}`,
    background: active ? color : bg,
    color: active ? "#fff" : color,
    transition:"all 0.15s",
  };
}

function timeAgo(ts){
  const d = Date.now() - ts, m = Math.floor(d/60000);
  if(m < 1) return "just now";
  if(m < 60) return `${m}m ago`;
  const h = Math.floor(m/60);
  if(h < 24) return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}
function uid(){ return Math.random().toString(36).slice(2,9); }

const SAMPLE_POSTS = [
  {
    id:"p1", title:"What stack are you all using in 2025?",
    content:"Curious what people have settled on. Been seeing a lot of migration away from bigger frameworks lately. Personally moved to Vite + React + a small Express backend and haven't looked back.",
    author:"drewc", timestamp:Date.now()-1000*60*60*14, tags:["tech","question"], votes:12,
    comments:[
      {id:"c1",author:"malek",content:"Still on Next.js for most client work. Hard to leave when clients expect SEO out of the box.",timestamp:Date.now()-1000*60*60*12,votes:4,replies:[
        {id:"r1",author:"drewc",content:"Fair point. I've been using a static site generator for SEO-heavy stuff and keeping the app layer lean.",timestamp:Date.now()-1000*60*60*11,votes:2}
      ]},
      {id:"c2",author:"yolanda",content:"Remix has been treating me well. The loader/action pattern clicked once I stopped fighting it.",timestamp:Date.now()-1000*60*60*9,votes:5,replies:[]}
    ]
  },
  {
    id:"p2", title:"Minimalism in product design is being misused",
    content:"There's a difference between removing what's unnecessary and removing what the user needs. A lot of products ship 'minimal' as an excuse for incomplete. Rant over.",
    author:"yolanda", timestamp:Date.now()-1000*60*60*38, tags:["design","discussion"], votes:31,
    comments:[
      {id:"c3",author:"tomas_k",content:"100%. 'Minimal' has become a cover for 'we didn't think it through'.",timestamp:Date.now()-1000*60*60*35,votes:8,replies:[
        {id:"r2",author:"yolanda",content:"Exactly. Dieter Rams would be appalled.",timestamp:Date.now()-1000*60*60*34,votes:6}
      ]}
    ]
  },
  {
    id:"p3", title:"Show: built a tiny Pomodoro TUI in Go",
    content:"Nothing special, 200 lines. Runs in the terminal, has no dependencies, and does one thing.",
    author:"tomas_k", timestamp:Date.now()-1000*60*47, tags:["showcase","tech"], votes:7, comments:[]
  }
];

/* ── Avatar ───────────────────────────────────────────────────── */
function Avatar({ name, size=28 }){
  const palettes = [
    [C.primaryBg, C.primary], [C.lavBg, "#7B6EC4"],
    [C.mintBg, "#4A9E85"],    [C.yellowBg, "#B89020"],
  ];
  const [bg, fg] = palettes[(name.charCodeAt(0)||0) % 4];
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:bg, flexShrink:0,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.42, fontWeight:800, color:fg }}>
      {name[0].toUpperCase()}
    </div>
  );
}

/* ── VoteBtn ──────────────────────────────────────────────────── */
function VoteBtn({ count, voted, onUp, onDown, vertical=false }){
  const btn = (dir, icon) => ({
    background: voted===dir ? (dir===1 ? C.primaryBg : "#E6EEF7") : "transparent",
    border:"none", cursor:"pointer", lineHeight:1, transition:"all 0.15s",
    fontSize:12, padding:"4px 6px", borderRadius:8,
    color: voted===dir ? (dir===1 ? C.primary : "#5A80C0") : "#C4AEB2",
  });
  return (
    <div style={{ display:"flex", flexDirection:vertical?"column":"row", alignItems:"center", gap:2 }}>
      <button onClick={onUp} style={btn(1,"▲")}>▲</button>
      <span style={{ fontSize:13, fontWeight:800, color:voted!==0?C.primary:C.muted,
        minWidth:20, textAlign:"center" }}>{count}</span>
      <button onClick={onDown} style={btn(-1,"▼")}>▼</button>
    </div>
  );
}

/* ── ReplyBox ─────────────────────────────────────────────────── */
function ReplyBox({ onSubmit, onCancel, placeholder="Write a reply…" }){
  const [text, setText] = useState("");
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div style={{ marginTop:12 }}>
      <textarea ref={ref} value={text} onChange={e=>setText(e.target.value)}
        placeholder={placeholder} rows={3}
        style={{ width:"100%", boxSizing:"border-box", fontFamily:"inherit", fontSize:13.5,
          border:`1.5px solid ${C.border}`, borderRadius:12, padding:"10px 14px",
          resize:"vertical", background:C.bg, color:C.text, outline:"none", lineHeight:1.6 }} />
      <div style={{ display:"flex", gap:8, marginTop:8 }}>
        <button onClick={() => { if(text.trim()){ onSubmit(text.trim()); setText(""); } }}
          style={{ fontFamily:"inherit", fontSize:12.5, fontWeight:700,
            background:C.primary, color:"#fff", border:"none", borderRadius:20,
            padding:"6px 18px", cursor:"pointer", boxShadow:`0 2px 8px ${C.primaryL}` }}>
          Reply
        </button>
        <button onClick={onCancel}
          style={{ fontFamily:"inherit", fontSize:12.5, background:"transparent",
            color:C.muted, border:`1.5px solid ${C.border}`, borderRadius:20,
            padding:"6px 14px", cursor:"pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ── Comment ──────────────────────────────────────────────────── */
function Comment({ comment, username, level=1, onReply, onVote }){
  const [replying, setReplying] = useState(false);
  const isL2 = level === 2;
  return (
    <div style={{ marginLeft:isL2?36:0, borderLeft:isL2?`2px solid ${C.primaryL}`:"none",
      paddingLeft:isL2?16:0 }}>
      <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
        <Avatar name={comment.author} size={isL2?24:30} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
            <span style={{ fontWeight:700, fontSize:12.5, color:C.text }}>{comment.author}</span>
            <span style={{ fontSize:11, color:C.muted }}>{timeAgo(comment.timestamp)}</span>
          </div>
          <p style={{ margin:"0 0 8px", fontSize:13.5, lineHeight:1.7, color:"#3D2C30",
            whiteSpace:"pre-wrap" }}>{comment.content}</p>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <VoteBtn count={comment.votes} voted={comment._voted||0}
              onUp={() => onVote(comment.id,1)} onDown={() => onVote(comment.id,-1)} />
            {level===1 && (
              <button onClick={() => setReplying(r=>!r)}
                style={{ background:replying?C.primaryBg:"transparent",
                  border:`1px solid ${replying?C.primaryL:C.border}`,
                  borderRadius:20, fontFamily:"inherit", fontSize:11.5, fontWeight:600,
                  color:replying?C.primary:C.muted, padding:"3px 12px",
                  cursor:"pointer", transition:"all 0.15s" }}>
                {replying ? "Cancel" : "Reply"}
              </button>
            )}
          </div>
          {replying && (
            <ReplyBox onSubmit={t=>{onReply(comment.id,t);setReplying(false);}}
              onCancel={()=>setReplying(false)} />
          )}
          {level===1 && comment.replies?.length>0 && (
            <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:12 }}>
              {comment.replies.map(r => (
                <Comment key={r.id} comment={r} username={username}
                  level={2} onReply={()=>{}} onVote={onVote} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── PostCard ─────────────────────────────────────────────────── */
function PostCard({ post, onOpen, onVote }){
  const [hov, setHov] = useState(false);
  const cc = post.comments.reduce((n,c) => n+1+(c.replies?.length||0), 0);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:C.card, borderRadius:18, border:`1.5px solid ${hov?C.primaryL:C.border}`,
        padding:"18px 20px", cursor:"pointer", transition:"all 0.18s",
        boxShadow:hov?C.shadowMd:C.shadow }}>
      <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
        <div onClick={e=>e.stopPropagation()} style={{ paddingTop:4 }}>
          <VoteBtn count={post.votes} voted={post._voted||0} vertical
            onUp={()=>onVote(post.id,1)} onDown={()=>onVote(post.id,-1)} />
        </div>
        <div style={{ flex:1, minWidth:0 }} onClick={()=>onOpen(post)}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:9 }}>
            {post.tags.map(t => <span key={t} style={tagStyle(t,false)}>{t}</span>)}
          </div>
          <h2 style={{ margin:"0 0 7px", fontSize:15.5, fontWeight:800, lineHeight:1.35,
            color:C.text, letterSpacing:"-0.25px" }}>{post.title}</h2>
          <p style={{ margin:"0 0 13px", fontSize:13, color:"#6D5A5E", lineHeight:1.65,
            display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {post.content}
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
            <Avatar name={post.author} size={20} />
            <span style={{ fontSize:12, fontWeight:700, color:C.text }}>{post.author}</span>
            <span style={{ color:C.primaryL, fontSize:14 }}>·</span>
            <span style={{ fontSize:12, color:C.muted }}>{timeAgo(post.timestamp)}</span>
            <span style={{ color:C.primaryL, fontSize:14 }}>·</span>
            <span style={{ fontSize:12, color:C.muted }}>💬 {cc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PostView ─────────────────────────────────────────────────── */
function PostView({ post, username, onBack, onUpdate }){
  const [showReply, setShowReply] = useState(false);

  const addComment = text => {
    const c = { id:uid(), author:username, content:text, timestamp:Date.now(), votes:0, _voted:0, replies:[] };
    onUpdate({ ...post, comments:[...post.comments, c] });
  };
  const addReply = (cid, text) => {
    const r = { id:uid(), author:username, content:text, timestamp:Date.now(), votes:0, _voted:0 };
    onUpdate({ ...post, comments:post.comments.map(c => c.id===cid?{...c,replies:[...(c.replies||[]),r]}:c) });
  };
  const votePost = dir => {
    const cur = post._voted||0, nv = cur===dir?0:dir;
    onUpdate({ ...post, votes:post.votes-cur+nv, _voted:nv });
  };
  const voteComment = (cid, dir) => {
    const upd = post.comments.map(c => {
      if(c.id===cid){ const cur=c._voted||0,nv=cur===dir?0:dir; return {...c,votes:c.votes-cur+nv,_voted:nv}; }
      return { ...c, replies:(c.replies||[]).map(r => {
        if(r.id===cid){ const cur=r._voted||0,nv=cur===dir?0:dir; return {...r,votes:r.votes-cur+nv,_voted:nv}; }
        return r;
      })};
    });
    onUpdate({ ...post, comments:upd });
  };

  const cc = post.comments.reduce((n,c) => n+1+(c.replies?.length||0), 0);
  return (
    <div>
      <button onClick={onBack}
        style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"inherit",
          fontSize:13, color:C.muted, padding:"0 0 20px", display:"flex", alignItems:"center", gap:6 }}>
        ← Back to posts
      </button>

      <div style={{ background:C.card, borderRadius:20, border:`1.5px solid ${C.border}`,
        padding:"24px 26px", marginBottom:24, boxShadow:C.shadow }}>
        <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
          <VoteBtn count={post.votes} voted={post._voted||0} vertical
            onUp={()=>votePost(1)} onDown={()=>votePost(-1)} />
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:12 }}>
              {post.tags.map(t => <span key={t} style={tagStyle(t,false)}>{t}</span>)}
            </div>
            <h1 style={{ margin:"0 0 14px", fontSize:22, fontWeight:800, lineHeight:1.3,
              color:C.text, letterSpacing:"-0.5px" }}>{post.title}</h1>
            <p style={{ margin:"0 0 18px", fontSize:14.5, lineHeight:1.8, color:"#3D2C30",
              whiteSpace:"pre-wrap" }}>{post.content}</p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Avatar name={post.author} size={28} />
              <span style={{ fontWeight:700, fontSize:13, color:C.text }}>{post.author}</span>
              <span style={{ color:C.primaryL }}>·</span>
              <span style={{ fontSize:12.5, color:C.muted }}>{timeAgo(post.timestamp)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* comment action bar */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <span style={{ fontWeight:800, fontSize:14, color:C.text }}>
          💬 {cc} Comment{cc!==1?"s":""}
        </span>
        <button onClick={() => setShowReply(r=>!r)}
          style={{ fontFamily:"inherit", fontSize:13, fontWeight:700,
            background:showReply?"transparent":`linear-gradient(135deg,${C.primary},#C05A80)`,
            color:showReply?C.muted:"#fff",
            border:`1.5px solid ${showReply?C.border:C.primary}`,
            borderRadius:20, padding:"8px 20px", cursor:"pointer", transition:"all 0.15s",
            boxShadow:showReply?"none":`0 4px 12px ${C.primaryL}` }}>
          {showReply ? "Cancel" : "+ Add Comment"}
        </button>
      </div>

      {showReply && (
        <div style={{ background:C.card, borderRadius:16, border:`1.5px solid ${C.border}`,
          padding:"18px 20px", marginBottom:18, boxShadow:C.shadow }}>
          <ReplyBox placeholder="Share your thoughts…"
            onSubmit={t=>{addComment(t);setShowReply(false);}}
            onCancel={()=>setShowReply(false)} />
        </div>
      )}

      {post.comments.length===0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:C.muted }}>
          <div style={{ fontSize:40, marginBottom:14 }}>🌸</div>
          <p style={{ fontSize:14, fontWeight:600 }}>No comments yet</p>
          <p style={{ fontSize:13, marginTop:5 }}>Be the first to start a conversation!</p>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {post.comments.map(c => (
            <div key={c.id} style={{ background:C.card, borderRadius:16,
              border:`1.5px solid ${C.border}`, padding:"16px 18px", boxShadow:C.shadow }}>
              <Comment comment={c} username={username} level={1}
                onReply={addReply} onVote={voteComment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── CreatePostModal ──────────────────────────────────────────── */
function CreatePostModal({ username, onClose, onCreate }){
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const valid = title.trim() && content.trim();

  const input = {
    fontFamily:"inherit", fontSize:14, border:`1.5px solid ${C.border}`, borderRadius:12,
    padding:"11px 14px", background:C.bg, color:C.text, outline:"none",
    width:"100%", boxSizing:"border-box", lineHeight:1.6, transition:"border-color 0.15s",
  };

  return (
    <div onClick={e=>{if(e.target===e.currentTarget)onClose();}}
      style={{ position:"fixed", inset:0, background:"rgba(44,32,37,0.35)",
        backdropFilter:"blur(4px)", display:"flex", alignItems:"center",
        justifyContent:"center", zIndex:200, padding:24 }}>
      <div style={{ background:C.card, borderRadius:26, width:"100%", maxWidth:540,
        boxShadow:"0 24px 70px rgba(212,115,106,0.22)", border:`1.5px solid ${C.border}`,
        overflow:"hidden" }}>
        <div style={{ background:`linear-gradient(135deg,${C.primaryBg},${C.lavBg})`,
          padding:"20px 26px", display:"flex", justifyContent:"space-between",
          alignItems:"center", borderBottom:`1.5px solid ${C.border}` }}>
          <span style={{ fontWeight:800, fontSize:16, color:C.primary, letterSpacing:"-0.3px" }}>
            ✦ New Post
          </span>
          <button onClick={onClose}
            style={{ background:"rgba(212,115,106,0.15)", border:"none", borderRadius:"50%",
              width:30, height:30, cursor:"pointer", fontSize:18, color:C.primary,
              display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>
            ×
          </button>
        </div>
        <div style={{ padding:"22px 26px", display:"flex", flexDirection:"column", gap:16 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Post title…"
            style={{ ...input, fontSize:16, fontWeight:800, letterSpacing:"-0.25px" }} />
          <textarea value={content} onChange={e=>setContent(e.target.value)}
            placeholder="What's on your mind?" rows={5}
            style={{ ...input, resize:"vertical" }} />
          <div>
            <p style={{ margin:"0 0 10px", fontSize:11.5, fontWeight:700, textTransform:"uppercase",
              letterSpacing:"0.08em", color:C.muted }}>Choose Tags</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {AVAILABLE_TAGS.map(t => (
                <span key={t} style={tagStyle(t, selectedTags.includes(t))}
                  onClick={() => setSelectedTags(p => p.includes(t)?p.filter(x=>x!==t):[...p,t])}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              if(valid) onCreate({ id:uid(), title:title.trim(), content:content.trim(),
                author:username, timestamp:Date.now(), tags:selectedTags,
                votes:0, _voted:0, comments:[] });
            }}
            disabled={!valid}
            style={{ fontFamily:"inherit", fontSize:14, fontWeight:800,
              background:valid?`linear-gradient(135deg,${C.primary},#C05A80)`:"#E8D8D6",
              color:valid?"#fff":"#B8A8A4", border:"none", borderRadius:20,
              padding:"13px 0", cursor:valid?"pointer":"not-allowed",
              boxShadow:valid?`0 4px 18px ${C.primaryL}`:"none", transition:"all 0.15s" }}>
            Publish Post ✦
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── UsernameGate ─────────────────────────────────────────────── */
function UsernameGate({ value, onChange, onSubmit }){
  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", fontFamily:"'DM Sans',sans-serif",
      background:`linear-gradient(135deg,${C.primaryBg} 0%,${C.lavBg} 50%,${C.mintBg} 100%)` }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap');`}</style>
      <div style={{ background:"#fff", borderRadius:28, padding:"44px 40px", textAlign:"center",
        boxShadow:`0 20px 60px rgba(212,115,106,0.15)`, border:`1.5px solid ${C.border}`,
        maxWidth:360, width:"90%" }}>
        <div style={{ width:66, height:66, borderRadius:"50%",
          background:`linear-gradient(135deg,${C.primaryBg},${C.lavBg})`,
          margin:"0 auto 18px", display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:30 }}>🌸</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700,
          margin:"0 0 8px", color:C.text }}>Welcome</h1>
        <p style={{ color:C.muted, fontSize:13.5, margin:"0 0 28px" }}>
          Choose a username to join the conversation
        </p>
        <input value={value} onChange={e=>onChange(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&onSubmit()} placeholder="Your username…"
          autoFocus maxLength={24}
          style={{ width:"100%", boxSizing:"border-box", fontFamily:"inherit", fontSize:14,
            border:`1.5px solid ${C.border}`, borderRadius:12, padding:"12px 16px",
            background:C.bg, color:C.text, outline:"none", marginBottom:12,
            textAlign:"center" }} />
        <button onClick={onSubmit}
          style={{ width:"100%", fontFamily:"inherit", fontSize:14, fontWeight:800,
            background:`linear-gradient(135deg,${C.primary},#C05A80)`, color:"#fff",
            border:"none", borderRadius:20, padding:"13px 0", cursor:"pointer",
            boxShadow:`0 4px 18px ${C.primaryL}`, letterSpacing:"0.01em" }}>
          Enter Forum ✦
        </button>
      </div>
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────── */
export default function Forum(){
  const [posts, setPosts]         = useState(null);
  const [view, setView]           = useState("home");
  const [activePostId, setActivePostId] = useState(null);
  const [username, setUsername]   = useState("");
  const [uInput, setUInput]       = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [filterTag, setFilterTag] = useState(null);
  const [navActive, setNavActive] = useState("home");

  useEffect(() => {
    (async () => {
      let p = SAMPLE_POSTS, u = "";
      try { const r = await window.storage.get("fp3"); if(r) p = JSON.parse(r.value); } catch{}
      try { const r = await window.storage.get("fu3"); if(r) u = r.value; } catch{}
      setPosts(p); setUsername(u);
    })();
  }, []);

  const savePosts = async next => {
    setPosts(next);
    try { await window.storage.set("fp3", JSON.stringify(next)); } catch{}
  };
  const setUser = async name => {
    setUsername(name);
    try { await window.storage.set("fu3", name); } catch{}
  };

  if(posts===null) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", background:C.bg, fontFamily:"'DM Sans',sans-serif", color:C.muted }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=Playfair+Display:wght@700&display=swap');`}</style>
      Loading…
    </div>
  );
  if(!username) return (
    <UsernameGate value={uInput} onChange={setUInput}
      onSubmit={()=>{ if(uInput.trim()) setUser(uInput.trim()); }} />
  );

  const activePost = posts.find(p => p.id === activePostId);
  const allTags    = [...new Set(posts.flatMap(p => p.tags))].sort();
  const sorted     = navActive==="popular" ? [...posts].sort((a,b) => b.votes-a.votes) : posts;
  const filtered   = filterTag ? sorted.filter(p => p.tags.includes(filterTag)) : sorted;

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:C.bg,
      fontFamily:"'DM Sans',sans-serif", color:C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Playfair+Display:wght@700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::placeholder { color:#C4AEB2; }
        textarea, input { transition:border-color 0.15s; }
        textarea:focus, input:focus { border-color:${C.primaryL} !important; box-shadow:0 0 0 3px ${C.primaryBg}; }
        button { font-family:'DM Sans',sans-serif; }
        button:active { transform:scale(0.97); }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${C.primaryL}; border-radius:10px; }
      `}</style>

      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <aside style={{ width:220, background:C.sidebar, borderRight:`1.5px solid ${C.border}`,
        display:"flex", flexDirection:"column", padding:"0 0 20px",
        position:"sticky", top:0, height:"100vh", flexShrink:0, zIndex:60 }}>

        {/* logo */}
        <div style={{ padding:"22px 20px 18px", borderBottom:`1.5px solid ${C.border}` }}>
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <div style={{ width:38, height:38, borderRadius:13, flexShrink:0,
              background:`linear-gradient(135deg,${C.primary},#C05A80)`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
              🌸
            </div>
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:17,
                color:C.text, lineHeight:1 }}>Forum</div>
              <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.04em", marginTop:3 }}>
                Community Space
              </div>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav style={{ padding:"16px 12px", flex:1 }}>
          {NAV.map(n => {
            const active = navActive===n.id;
            return (
              <button key={n.id}
                onClick={() => {
                  setNavActive(n.id); setView("home");
                  setActivePostId(null);
                  if(n.id!=="tags") setFilterTag(null);
                }}
                style={{ display:"flex", alignItems:"center", gap:12, width:"100%",
                  padding:"10px 14px", borderRadius:12, border:"none", cursor:"pointer",
                  fontSize:13.5, fontWeight:active?700:500, textAlign:"left", marginBottom:4,
                  background:active?C.primaryBg:"transparent",
                  color:active?C.primary:C.muted, transition:"all 0.15s" }}>
                <span style={{ fontSize:17 }}>{n.icon}</span>
                {n.label}
              </button>
            );
          })}
        </nav>

        {/* new post */}
        <div style={{ padding:"0 12px 14px" }}>
          <button onClick={() => setShowCreate(true)}
            style={{ width:"100%", fontSize:13, fontWeight:800,
              background:`linear-gradient(135deg,${C.primary},#C05A80)`, color:"#fff",
              border:"none", borderRadius:14, padding:"12px 0", cursor:"pointer",
              boxShadow:`0 4px 14px ${C.primaryL}`, letterSpacing:"0.01em" }}>
            + New Post
          </button>
        </div>

        {/* user pill */}
        <div style={{ padding:"12px 16px 0", borderTop:`1.5px solid ${C.border}`,
          display:"flex", alignItems:"center", gap:10 }}>
          <Avatar name={username} size={34} />
          <div>
            <div style={{ fontWeight:800, fontSize:13, color:C.text }}>{username}</div>
            <div style={{ fontSize:10.5, color:C.muted, marginTop:1 }}>Member</div>
          </div>
        </div>
      </aside>

      {/* ─── Main ─────────────────────────────────────────────── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* header */}
        <header style={{ background:`linear-gradient(135deg,${C.primary} 0%,#C05A80 100%)`,
          padding:"24px 32px", position:"sticky", top:0, zIndex:50 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:27, fontWeight:700,
                color:"#fff", margin:"0 0 5px", letterSpacing:"-0.4px" }}>
                {view==="post" && activePost ? activePost.title
                  : navActive==="popular" ? "🔥 Popular Posts"
                  : navActive==="tags"    ? "◈ Browse Tags"
                  : `Hello, ${username} 👋`}
              </h1>
              <p style={{ color:"rgba(255,255,255,0.78)", fontSize:13, margin:0 }}>
                {view==="post" && activePost
                  ? `by ${activePost.author} · ${timeAgo(activePost.timestamp)}`
                  : `${filtered.length} post${filtered.length!==1?"s":""}${filterTag?` tagged "${filterTag}"`:" in the community"}`}
              </p>
            </div>
            {view==="home" && (
              <div style={{ background:"rgba(255,255,255,0.18)", borderRadius:12,
                padding:"7px 16px", fontSize:12.5, color:"rgba(255,255,255,0.92)",
                fontWeight:700, backdropFilter:"blur(8px)",
                border:"1px solid rgba(255,255,255,0.28)" }}>
                ✦ {posts.reduce((n,p)=>n+p.comments.reduce((m,c)=>m+1+(c.replies?.length||0),0),0)} comments
              </div>
            )}
          </div>
        </header>

        {/* content */}
        <main style={{ flex:1, padding:"28px 32px", maxWidth:820, width:"100%" }}>

          {view==="home" && (
            <>
              {/* tag filter bar */}
              {allTags.length > 0 && (
                <div style={{ background:C.card, borderRadius:16, border:`1.5px solid ${C.border}`,
                  padding:"16px 20px", marginBottom:22, boxShadow:C.shadow }}>
                  <p style={{ fontSize:11.5, fontWeight:700, textTransform:"uppercase",
                    letterSpacing:"0.07em", color:C.muted, margin:"0 0 10px" }}>Filter by Tag</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                    <span style={tagStyle("all", !filterTag)} onClick={() => setFilterTag(null)}>✦ All</span>
                    {allTags.map(t => (
                      <span key={t} style={tagStyle(t, filterTag===t)}
                        onClick={() => setFilterTag(t===filterTag ? null : t)}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {filtered.length===0 ? (
                <div style={{ textAlign:"center", padding:"80px 0", color:C.muted }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>🌸</div>
                  <p style={{ fontSize:15, fontWeight:700 }}>No posts yet</p>
                  <p style={{ fontSize:13, marginTop:6 }}>Be the first to start a conversation!</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {filtered.map(p => (
                    <PostCard key={p.id} post={p}
                      onOpen={() => { setActivePostId(p.id); setView("post"); }}
                      onVote={(id, dir) => {
                        const cur = p._voted||0, nv = cur===dir?0:dir;
                        savePosts(posts.map(x => x.id===id ? {...x,votes:x.votes-cur+nv,_voted:nv} : x));
                      }} />
                  ))}
                </div>
              )}
            </>
          )}

          {view==="post" && activePost && (
            <PostView post={activePost} username={username}
              onBack={() => { setView("home"); setActivePostId(null); }}
              onUpdate={updated => savePosts(posts.map(p => p.id===updated.id ? updated : p))} />
          )}
        </main>
      </div>

      {showCreate && (
        <CreatePostModal username={username}
          onClose={() => setShowCreate(false)}
          onCreate={post => { savePosts([post, ...posts]); setShowCreate(false); }} />
      )}
    </div>
  );
}
