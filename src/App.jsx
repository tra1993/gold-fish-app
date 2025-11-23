import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// --- GLOBAL STYLES & ANIMATIONS ---
const globalStyles = `
  /* ငါးကလေး ကူးခတ်နေသော Animation (Swimming) */
  @keyframes swimFloat {
    0% { transform: translateY(0) rotate(0deg); }
    25% { transform: translateY(-8px) rotate(2deg); } /* အပေါ်တက်ပြီး ညာစောင်း */
    50% { transform: translateY(0) rotate(0deg); }
    75% { transform: translateY(8px) rotate(-2deg); } /* အောက်ဆင်းပြီး ဘယ်စောင်း */
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  /* Glass Card Effect */
  .glass-card {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.3);
  }
`;

// --- DATA ---
const VALID_KEYS = ["GF-1234", "VIP-9999", "GOLD-2025"];
const PRODUCT_DATA = [
    {
        id: 1,
        name: "Classic Ruby Earrings",
        image: "/assets/earring1.jpg",
        audio: "/assets/earring1.mp3",
        description: "ရိုးရှင်းပြီး ခမ်းနားသော ပတ္တမြား နားကပ်တစ်ရံ။ မိုးကုတ်ပတ္တမြားကို ရွှေသားအပြည့်ဖြင့် ပုံဖော်ထားသည်။",
        gold_weight: "1 ကျပ်သား (ခန့်မှန်း)",
        gem_type: "Ruby (Mogok)"
    },
    {
        id: 2,
        name: "Elegant Ruby Ring",
        image: "/assets/ring1.jpg",
        audio: "/assets/ring1.mp3",
        description: "ခေတ်ဆန်သော ဒီဇိုင်းနှင့် ပတ္တမြားတို့၏ ပေါင်းစပ်မှု။ စိန်နုများဖြင့် အလှဆင်ထားပါသည်။",
        gold_weight: "0.8 ကျပ်သား",
        gem_type: "Ruby & Diamonds"
    }
];

// --- 1. Login Page (Swimming Logo) ---
function Login({ setAuthKey }) {
  const [inputKey, setInputKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (VALID_KEYS.includes(inputKey)) {
        setAuthKey(inputKey);
        localStorage.setItem('userProducts', JSON.stringify(PRODUCT_DATA));
        navigate('/welcome');
    } else {
        alert("Key မှားယွင်းနေပါသည်။ (Try: GF-1234)");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-black overflow-hidden position-relative">
      <style>{globalStyles}</style>
      
      {/* Swimming Logo */}
      <img src="/assets/logo.png" alt="Logo" 
           style={{
             width: '200px', 
             marginBottom: '30px', 
             borderRadius: '35px',
             // Animation ကို ဒီမှာ ချိတ်ထားတယ် (၄ စက္ကန့်ကြာမယ်၊ အဆုံးမရှိ လည်ပတ်မယ်)
             animation: 'swimFloat 4s infinite ease-in-out',
             boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)' // ရွှေရောင်ရေလွှာ အရိပ်
           }} 
           onError={(e) => e.target.style.display='none'} />

      <h1 className="display-3 fw-bold text-warning mb-2" style={{fontFamily: 'serif', letterSpacing: '3px'}}>GOLD FISH</h1>
      <p className="lead text-light opacity-75 mb-5" style={{letterSpacing: '2px'}}>EXCLUSIVE JEWELLERY CLUB</p>
      
      <div className="w-75" style={{maxWidth: '320px', zIndex: 10}}>
        <input 
          type="text" 
          className="form-control text-center py-3 fs-5 bg-dark text-warning border-warning" 
          placeholder="ENTER VIP KEY"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          style={{borderRadius: '50px'}}
        />
        <button className="btn btn-warning w-100 mt-4 py-3 fw-bold rounded-pill shadow-lg" 
                onClick={handleLogin}
                style={{letterSpacing: '2px', fontSize: '1.1rem'}}>
          UNLOCK ACCESS
        </button>
      </div>
    </div>
  );
}

// --- 2. Welcome Page (Static Full Screen - No Dizziness) ---
function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/assets/welcome.mp3');
    audio.play().catch(error => console.log("Auto-play blocked:", error));
  }, []);

  return (
    <div className="position-relative vh-100 overflow-hidden d-flex flex-column align-items-center justify-content-center text-center">
      
      {/* Background (Fixed & Static) */}
      <div className="position-absolute top-0 start-0 w-100 h-100" 
           style={{
             backgroundImage: 'url("/assets/shop_bg.jpg")',
             backgroundSize: 'cover', // Screen အပြည့်
             backgroundPosition: 'center', // အလယ်တည့်တည့်
             zIndex: -1,
             filter: 'brightness(0.6)' // စာဖတ်ရလွယ်အောင် နည်းနည်းမှိန်ထားမယ်
           }}></div>

      {/* Content */}
      <div style={{zIndex: 10, width: '90%'}}>
        <h1 className="mb-4" style={{
          color: '#FFD700',
          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          fontFamily: 'serif', fontWeight: '900', fontSize: '3rem', transform: 'scaleY(1.1)'
        }}>
          မင်္ဂလာပါရှင့် 🙏
        </h1>

        <p className="mb-5 px-2" style={{
          color: '#000000',
          textShadow: '1px 1px 0 #FFD700, -1px -1px 0 #FFD700, 1px -1px 0 #FFD700, -1px 1px 0 #FFD700',
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.3rem', lineHeight: '1.8'
        }}>
          <span className="fw-bold" style={{textDecoration: 'underline'}}>GOLD FISH Gems & Jewellery</span> မှ <br/> နွေးထွေးစွာ ကြိုဆိုပါတယ်။
        </p>

        <div className="d-grid gap-3 col-10 mx-auto">
          <button className="btn btn-warning btn-lg fw-bold shadow-lg rounded-pill glass-card text-white border-warning" 
                  onClick={() => navigate('/catalog')}>
            VIEW CATALOG
          </button>
          <button className="btn btn-outline-light btn-lg rounded-pill" onClick={() => navigate('/')}>
            EXIT
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 3. Catalog Page (Fixed Background & Full Screen) ---
function Catalog() {
  const products = JSON.parse(localStorage.getItem('userProducts') || '[]');
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 position-relative" style={{padding: '80px 15px 20px'}}>
      
      {/* Fixed Full Background (Parallax Effect) */}
      <div className="position-fixed top-0 start-0 w-100 h-100" 
           style={{
             backgroundImage: 'url("/assets/shop_bg.jpg")',
             backgroundSize: 'cover', // Screen အပြည့် (Zoom Out ဖြစ်သွားမယ်)
             backgroundPosition: 'center',
             backgroundAttachment: 'fixed', // Scroll ဆွဲမှ အနောက်က လိုက်ပြောင်းမယ် (No dizziness)
             filter: 'brightness(0.5)',
             zIndex: -1
           }}></div>

      {/* Header */}
      <div className="position-absolute top-0 start-0 w-100 p-3 text-center glass-card" style={{zIndex: 10}}>
        <h4 className="text-warning m-0" style={{letterSpacing: '2px', textShadow: '1px 1px 2px black'}}>VIP COLLECTION</h4>
      </div>

      <div className="row g-3 mt-2">
        {products.map(item => (
          <div className="col-6 col-md-4" key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
            <div className="card h-100 border-0 glass-card shadow-lg" style={{overflow: 'hidden'}}> 
              <div style={{height: '180px', position: 'relative'}}>
                 <img src={item.image} alt={item.name} 
                      style={{width: '100%', height: '100%', objectFit: 'cover'}} 
                 />
                 <div className="position-absolute top-0 start-0 w-100 h-100" 
                      style={{background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}></div>
              </div>
              <div className="card-body p-2 text-center text-white position-relative">
                <small className="fw-bold d-block text-truncate text-warning mb-1">{item.name}</small>
                <span className="badge bg-warning text-dark rounded-pill" style={{fontSize: '9px'}}>3D VIEW</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 4. Detail Page ---
function ProductDetail() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem('userProducts') || '[]');
  const product = products.find(p => p.id == id);
  const navigate = useNavigate();

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-fluid min-vh-100 bg-black text-white p-0">
      <button onClick={() => navigate(-1)} className="btn btn-sm btn-outline-warning m-3 position-absolute" style={{zIndex: 100}}>← Back</button>
      <div style={{height: '55vh', background: '#111', position: 'relative', overflow: 'hidden'}}>
        <TransformWrapper initialScale={1} minScale={1} maxScale={4} centerOnInit={true}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="position-absolute end-0 bottom-0 m-3 d-flex flex-column gap-2" style={{zIndex: 10}}>
                <button className="btn btn-light btn-sm rounded-circle fw-bold" onClick={() => zoomIn()}>+</button>
                <button className="btn btn-light btn-sm rounded-circle fw-bold" onClick={() => zoomOut()}>-</button>
                <button className="btn btn-warning btn-sm rounded-pill" style={{fontSize: '10px'}} onClick={() => resetTransform()}>Reset</button>
              </div>
              <TransformComponent wrapperStyle={{width: "100%", height: "100%"}} contentStyle={{width: "100%", height: "100%"}}>
                <img src={product.image} alt={product.name} style={{width: '100vw', height: '55vh', objectFit: 'contain'}} />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
      <div className="text-center text-secondary small py-1 bg-dark border-bottom border-secondary">Use buttons (+/-) or Pinch to Inspect 3D Details</div>
      <div className="p-4">
        <h2 className="text-warning mb-1">{product.name}</h2>
        <div className="d-flex gap-3 text-secondary mb-3 small">
            <span>💎 {product.gem_type}</span>
            <span>⚖️ {product.gold_weight}</span>
        </div>
        <div className="p-3 mb-3 rounded border border-secondary bg-dark bg-opacity-50">
            <label className="text-warning small mb-2 d-block">🎧 AI Audio Guide:</label>
            <audio controls src={product.audio} className="w-100" style={{height: '30px'}}></audio>
        </div>
        <p className="text-light opacity-75 small">{product.description}</p>
        <a href="https://t.me/your_telegram" className="btn btn-warning w-100 fw-bold mt-3 mb-5">Order Now</a>
      </div>
    </div>
  );
}

function App() {
  const [authKey, setAuthKey] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuthKey={setAuthKey} />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

