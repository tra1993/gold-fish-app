import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import shopBgImage from './shop_bg.jpg';

// --- GLOBAL STYLES ---
const globalStyles = `
  /* ငါးရေကူးသော Animation (Splash Screen Only) */
  @keyframes swim {
    0% { transform: translateY(0) rotate(0deg) scale(1); }
    25% { transform: translateY(-15px) rotate(5deg) scale(1.05); }
    50% { transform: translateY(0) rotate(0deg) scale(1); }
    75% { transform: translateY(15px) rotate(-5deg) scale(1.05); }
    100% { transform: translateY(0) rotate(0deg) scale(1); }
  }
  
  /* Glass Card */
  .glass-card {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
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

// --- 0. Splash Screen (New Feature) ---
function Splash({ onFinish }) {
  useEffect(() => {
    // ၄ စက္ကန့် ကြာရင် Login Page ကို ပြောင်းမယ်
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-black">
      <style>{globalStyles}</style>
      
      {/* Fish Only Animation */}
      <img src="/assets/fish.png" alt="Loading..." 
           style={{
             width: '150px', 
             animation: 'swim 3s infinite ease-in-out', // ရေကူးနေမယ်
             filter: 'drop-shadow(0 0 15px gold)' 
           }} />
           
      <p className="text-warning mt-4" style={{letterSpacing: '3px', fontSize: '0.8rem'}}>LOADING LUXURY...</p>
    </div>
  );
}

// --- 1. Login Page (No Animation) ---
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
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-black position-relative">
      
      {/* Static Icon (No Animation) */}
      <img src="/assets/icon.png" alt="Logo" 
           style={{
             width: '180px', 
             marginBottom: '20px', 
             borderRadius: '30px',
             boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)' // အရိပ်သေပဲ ရှိမယ်
           }} 
           onError={(e) => e.target.style.display='none'} />

      <h1 className="display-4 fw-bold text-warning mb-2" style={{fontFamily: 'serif', letterSpacing: '2px'}}>GOLD FISH</h1>
      <p className="lead text-light opacity-75 mb-5" style={{fontSize: '0.9rem', letterSpacing: '3px'}}>EXCLUSIVE JEWELLERY CLUB</p>
      
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

// --- 2. Welcome Page (Full Screen Shop Background) ---
function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/assets/welcome.mp3');
    audio.play().catch(error => console.log("Auto-play blocked:", error));
  }, []);

  return (
    <div className="position-relative vh-100 d-flex flex-column align-items-center justify-content-center text-center">
      
      {/* Background Image Fix (Full Screen & Fixed) */}
      <div className="position-fixed top-0 start-0 w-100 h-100" 
           style={{
             backgroundImage: `url(${shopBgImage})`,
             backgroundSize: 'cover', // Screen အပြည့် (Full View)
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat',
             zIndex: -1,
             filter: 'brightness(0.5)' // စာပေါ်အောင် နည်းနည်းမှိန်မယ်
           }}></div>

      {/* Content */}
      <div style={{zIndex: 10, width: '90%'}}>
        <h1 className="mb-4" style={{
          color: '#FFD700',
          textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
          fontFamily: 'serif', fontWeight: '900', fontSize: '3.5rem', transform: 'scaleY(1.1)'
        }}>
          မင်္ဂလာပါရှင့် 🙏
        </h1>

        <p className="mb-5 px-2" style={{
          color: '#000000',
          textShadow: '1px 1px 0 #FFD700, -1px -1px 0 #FFD700, 1px -1px 0 #FFD700, -1px 1px 0 #FFD700',
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.3rem', lineHeight: '1.8'
        }}>
          GOLD FISH Gems & Jewellery မှ <br/> နွေးထွေးစွာ ကြိုဆိုပါတယ် ရှင့်။
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


// --- 3. Catalog Page (Zoom Out Fixed) ---
function Catalog() {
  const products = JSON.parse(localStorage.getItem('userProducts') || '[]');
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("/assets/shop_bg.jpg")',
      // အောက်ပါ ၃ ကြောင်းက Zoom Out ဖြစ်စေမည့် အဓိက Code များဖြစ်သည်
      backgroundSize: '100% auto', // ပုံအကျယ်ကို ဖုန်းscreen နဲ့ ကွက်တိဖြစ်စေမယ် (Zoom Out Effect)
      backgroundRepeat: 'no-repeat', // ပုံမထပ်စေဘူး
      backgroundPosition: 'center top', // ပုံကို အပေါ်ဘက် (မီးဆိုင်းဘက်) ကနေ စပြမယ်
      
      backgroundAttachment: 'fixed', // Scroll ဆွဲရင် နောက်ခံပုံ မရွေ့စေဘူး
      backgroundColor: '#000000', // ပုံမရှိတဲ့ နေရာလွတ်ကို အမည်းရောင်ထားမယ်
      padding: '20px 10px'
    }}>
      
      {/* Header Title */}
      <h3 className="text-center mb-4 text-warning" 
          style={{ textShadow: '2px 2px 4px #000', borderBottom: '2px solid gold', display: 'inline-block', paddingBottom: '5px' }}>
        VIP COLLECTION
      </h3>

      <div className="row g-3">
        {products.map(item => (
          <div className="col-6 col-md-4" key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
            <div className="card h-100 shadow border-warning" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}> 
              <div style={{height: '160px', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '5px'}}>
                 <img src={item.image} alt={item.name} 
                      style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px'}} 
                 />
              </div>
              <div className="card-body p-2 text-center text-white">
                <small className="fw-bold d-block text-truncate text-warning">{item.name}</small>
                <small className="text-light" style={{fontSize: '10px'}}>Click to View</small>
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

// --- MAIN APP (Controls Splash vs Login) ---
function App() {
  const [authKey, setAuthKey] = useState(null);
  const [showSplash, setShowSplash] = useState(true); // အစမှာ Splash ပြမယ်

  return (
    <>
      {showSplash ? (
        // Splash Screen ပြမယ် (၇ စက္ကန့်ကြာရင် ပျောက်မယ်)
        <Splash onFinish={() => setShowSplash(false)} />
      ) : (
        // Splash ပြီးရင် Router (Login -> Welcome) အလုပ်လုပ်မယ်
        <Router>
          <Routes>
            <Route path="/" element={<Login setAuthKey={setAuthKey} />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;

