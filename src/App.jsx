import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "bootstrap/dist/css/bootstrap.min.css";

// --- GLOBAL CSS (SCREEN အပြည့်ဖြစ်စေရန်) ---
const globalStyles = `
  body, html, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #000;
  }
  @keyframes swim {
    0% { transform: translateY(0) rotate(0deg) scale(1); }
    50% { transform: translateY(-15px) rotate(5deg) scale(1.05); }
    100% { transform: translateY(0) rotate(0deg) scale(1); }
  }
`;

// --- GLOBAL DATA ---
const VALID_KEYS = ["GF-1234", "VIP-9999", "GOLD-2025"];

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Classic Ruby Earrings",
    image: "/assets/earring1.jpg",
    audio: "/assets/earring1.mp3",
    description: "ရိုးရှင်းပြီး ခမ်းနားသော ပတ္တမြား နားကပ်တစ်ရံ။",
    gold_weight: "1 ကျပ်သား",
    gem_type: "Ruby (Mogok)",
  },
  {
    id: 2,
    name: "Elegant Ruby Ring",
    image: "/assets/ring1.jpg",
    audio: "/assets/ring1.mp3",
    description: "ခေတ်ဆန်ပြီး လှပသည့် Design အသွင်အပြင် လက်ရာ ။",
    gold_weight: "0.8 ကျပ်သား",
    gem_type: "Ruby & Diamonds",
  },
];

// --- 0. SPLASH PAGE ---
function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 4000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-black" style={{ width: "100vw", margin: 0 }}>
      <img src="/assets/fish.png" alt="Loading..." 
           style={{ width: "150px", animation: "swim 3s infinite ease-in-out", filter: "drop-shadow(0 0 15px gold)" }} />
      <p className="text-warning mt-4" style={{ letterSpacing: "3px" }}>LOADING LUXURY...</p>
    </div>
  );
}

// --- 1. LOGIN PAGE ---
function Login({ setAuthKey }) {
  const [inputKey, setInputKey] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (VALID_KEYS.includes(inputKey)) {
      setAuthKey(inputKey);
      localStorage.setItem("userProducts", JSON.stringify(PRODUCT_DATA));
      navigate("/welcome");
    } else {
      alert("Key မှားနေပါတယ် (Try: GF-1234)");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark" style={{ width: "100vw", margin: 0 }}>
      <img src="/assets/icon.png" alt="Logo" style={{ width: "180px", marginBottom: "20px", borderRadius: "30px", boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)" }} />
      <h1 className="text-warning fw-bold">GOLD FISH</h1>
      <p className="text-light opacity-75">GEMS & JEWELLERY CLUB</p>
      <div className="w-75" style={{ maxWidth: "320px" }}>
        <input type="text" className="form-control text-center py-3 bg-dark text-warning border-warning" placeholder="ENTER VIP KEY"
          value={inputKey} onChange={(e) => setInputKey(e.target.value.toUpperCase())} style={{ borderRadius: "50px" }} />
        <button className="btn btn-warning w-100 mt-4 py-3 fw-bold rounded-pill" onClick={handleLogin}>UNLOCK ACCESS</button>
      </div>
    </div>
  );
}

// --- 2. WELCOME PAGE ---
function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    const audio = new Audio("/assets/welcome.mp3");
    audio.play().catch(() => {});
  }, []);

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ width: "100vw", margin: 0, padding: 0, backgroundImage: "url('/assets/shop_bg.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <h1 className="mb-4" style={{ color: "#FFD700", fontSize: "3rem", textShadow: "3px 3px 5px black", fontWeight: "bold" }}>မင်္ဂလာပါရှင့် 🙏</h1>
      <p className="text-white fw-bold" style={{ textShadow: "1px 1px 3px black" }}>GOLD FISH Gems & Jewellery မှ ကြိုဆိုပါတယ်။</p>
      <div className="d-grid gap-3 col-8 mx-auto mt-4">
        <button className="btn btn-warning btn-lg rounded-pill shadow" onClick={() => navigate("/catalog")}>VIEW CATALOG</button>
        <button className="btn btn-outline-light btn-lg rounded-pill shadow" onClick={() => navigate("/")}>EXIT</button>
      </div>
    </div>
  );
}

// --- 3. CATALOG PAGE ---
function Catalog() {
  const products = JSON.parse(localStorage.getItem("userProducts") || "[]");
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 p-3 text-white" style={{ width: "100vw", margin: 0, backgroundImage: "url('/assets/shop_bg.jpg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <button className="btn btn-outline-warning mb-3 shadow" onClick={() => navigate(-1)}>← Back</button>
      <h3 className="text-center text-warning fw-bold mb-4" style={{ textShadow: "2px 2px 4px black" }}>VIP COLLECTION</h3>
      <div className="row g-3">
        {products.map((item) => (
          <div className="col-6 col-md-4" key={item.id} onClick={() => navigate(`/product/${item.id}`)} style={{ cursor: 'pointer' }}>
            <div className="card text-white border-warning shadow" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
              <img src={item.image} className="card-img-top" alt={item.name} style={{ height: '150px', objectFit: 'cover' }} />
              <div className="card-body text-center p-2">
                <strong className="text-warning d-block text-truncate">{item.name}</strong>
                <div className="text-light small">Tap to View</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 4. PRODUCT DETAIL PAGE ---
function ProductDetail() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("userProducts") || "[]");
  const product = products.find((p) => p.id == id);
  const navigate = useNavigate();

  useEffect(() => {
    if (product && product.audio) {
      const audio = new Audio(product.audio);
      audio.play().catch(() => {});
    }
  }, [product]);

  if (!product) return <div className="d-flex justify-content-center align-items-center min-vh-100 text-white" style={{ backgroundColor: '#000', width: "100vw" }}>Product not found!</div>;

  return (
    <div className="bg-dark min-vh-100 text-white" style={{ width: "100vw", margin: 0 }}>
      <button className="btn btn-outline-warning m-3 position-absolute" style={{ zIndex: 100 }} onClick={() => navigate(-1)}>← Back</button>
      <TransformWrapper minScale={0.5} maxScale={3} initialScale={1} wheel={{ step: 0.1 }}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <div style={{ height: "55vh", position: "relative", backgroundColor: "#111" }}>
            <div className="position-absolute end-0 bottom-0 m-3 d-flex flex-column gap-2" style={{ zIndex: 10 }}>
              <button className="btn btn-light btn-sm rounded-circle fw-bold" onClick={zoomIn}>+</button>
              <button className="btn btn-light btn-sm rounded-circle fw-bold" onClick={zoomOut}>–</button>
              <button className="btn btn-warning btn-sm rounded-pill" onClick={resetTransform}>Reset</button>
            </div>
            <TransformComponent {...rest} wrapperStyle={{ width: "100%", height: "100%" }}>
              <img src={product.image} alt={product.name} style={{ width: "100vw", height: "55vh", objectFit: "contain" }} />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
      <div className="p-4">
        <h3 className="text-warning fw-bold">{product.name}</h3>
        <p className="mb-3 text-secondary"><span role="img" aria-label="gem">💎</span> {product.gem_type} <br /> <span role="img" aria-label="weight">⚖️</span> {product.gold_weight}</p>
        <div className="p-3 mb-3 rounded border border-secondary bg-secondary bg-opacity-25">
            <p className="text-warning small mb-1">🎧 Audio Description:</p>
            <audio controls className="w-100"><source src={product.audio} type="audio/mpeg" />Your browser does not support the audio element.</audio>
        </div>
        <p className="text-light opacity-75">{product.description}</p>
        <a href="https://t.me/your_telegram" target="_blank" rel="noopener noreferrer" className="btn btn-warning w-100 rounded-pill fw-bold mt-3 mb-5">Order Now</a>
      </div>
    </div>
  );
}

// --- MAIN APP ---
function App() {
  const [authKey, setAuthKey] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <style>{globalStyles}</style>
      <Router>
        {showSplash ? (
          <Splash onFinish={() => setShowSplash(false)} />
        ) : (
          <Routes>
            <Route path="/" element={<Login setAuthKey={setAuthKey} />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
