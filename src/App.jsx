import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// --- DUMMY DATA (Server အစား Data များကို ဒီမှာ ယာယီသိမ်းထားမယ်) ---
const VALID_KEYS = ["GF-1234", "VIP-9999", "GOLD-2025"];

const PRODUCT_DATA = [
    {
        id: 1,
        name: "Classic Ruby Earrings",
        image: "/assets/earring1.jpg",
        audio: "/assets/earring1.mp3",
        description: "ရိုးရှင်းပြီး ခမ်းနားသော ပတ္တမြား နားကပ်တစ်ရံ။ အရည်အသွေးမြင့် မိုးကုတ်ပတ္တမြားကို ရွှေသားအပြည့်ဖြင့် ပုံဖော်ထားပြီး၊ ပွဲတက်ဝတ်ဆင်ရန် အထူးသင့်လျော်ပါသည်။ Gold Fish ၏ Signature Design ဖြစ်သည်။",
        gold_weight: "1 ကျပ်သား (ခန့်မှန်း)",
        gem_type: "Ruby (Mogok)"
    },
    {
        id: 2,
        name: "Elegant Ruby Ring",
        image: "/assets/ring1.jpg",
        audio: "/assets/ring1.mp3",
        description: "ခေတ်ဆန်သော ဒီဇိုင်းနှင့် ပတ္တမြားတို့၏ ပေါင်းစပ်မှု။ လက်ညှိုး သို့မဟုတ် လက်သူြ​ကွယ်တွင် ဝတ်ဆင်ပါက ထင်ပေါ်စေမည့် ဒီဇိုင်း။ အောက်ခြေတွင် စိန်နုများဖြင့် အလှဆင်ထားပါသည်။",
        gold_weight : "0.8 ကျပ်သား",
        gem_type: "Ruby & Diamonds"
    }
];

// --- 1. Login Page ---
function Login({ setAuthKey }) {
  const [inputKey, setInputKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Server မခေါ်တော့ဘဲ ဒီမှာပဲ စစ်မယ်
    if (VALID_KEYS.includes(inputKey)) {
        setAuthKey(inputKey);
        // Data ကို localStorage ထဲ ထည့်ပေးလိုက်မယ်
        localStorage.setItem('userProducts', JSON.stringify(PRODUCT_DATA));
        navigate('/welcome');
    } else {
        alert("Key မှားယွင်းနေပါသည်။ (Try: GF-1234)");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-dark text-warning">
      <img src="/assets/logo.png" alt="Logo" style={{width: '120px', borderRadius: '20px', marginBottom: '20px', boxShadow: '0 0 15px #FFD700'}} 
           onError={(e) => e.target.style.display='none'} />
      <h1 className="display-1 fw-bold">GOLD FISH</h1>
      <p className="lead text-white">Exclusive Jewellery Club</p>
      <div className="mt-4 w-75" style={{maxWidth: '300px'}}>
        <input 
          type="text" 
          className="form-control text-center py-2" 
          placeholder="Enter VIP Key"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        <button className="btn btn-warning w-100 mt-3 fw-bold" onClick={handleLogin}>ENTER CLUB</button>
      </div>
    </div>
  );
}

// --- 2. Welcome Page ---
function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio('/assets/welcome.mp3');
    audio.play().catch(error => console.log("Auto-play blocked:", error));
  }, []);

  return (
    <div style={{
      height: '100vh',
      backgroundImage: 'url("/assets/shop_bg.jpg")',
      backgroundSize: '100% auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundColor: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center'
    }}>
      
      <h1 className="mb-4" style={{
        color: '#FFD700',
        textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
        fontFamily: 'serif',
        fontWeight: '900',
        fontSize: '3.5rem',
        letterSpacing: '2px',
        transform: 'scaleY(1.1)'
      }}>
        မင်္ဂလာပါရှင့် 🙏🙏
      </h1>

      <p className="mb-5 px-4" style={{
        color: '#000000',
        textShadow: '1px 1px 0 #FFD700, -1px -1px 0 #FFD700, 1px -1px 0 #FFD700, -1px 1px 0 #FFD700',
        fontFamily: '"Playfair Display", "Times New Roman", serif',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        lineHeight: '1.8',
        letterSpacing: '1px'
      }}>
        GOLD FISH Gems & Jewellery မှ နွေးထွေးစွာ ကြိုဆိုပါတယ်။ <br/>
        လူကြီးမင်းစိတ်ကြိုက် ဒီဇိုင်းများကို ကြည့်ရှုကာ  ရွေးချယ် မှာယူနိုင်ပါပြီ။
      </p>

      <div className="d-grid gap-3 col-8 mx-auto">
        <button className="btn btn-warning btn-lg fw-bold shadow" onClick={() => navigate('/catalog')}>
          ဆိုင်အတွင်းသို့ ဝင်ေ​ရာက်ကာ ြ​ကည့်ရှုမည် (View Catalog)
        </button>
        <button className="btn btn-outline-light btn-lg" onClick={() => navigate('/')}>
          ပြန်ထွက်မည် (Exit)
        </button>
      </div>
    </div>
  );
}

// --- 3. Catalog Page ---
function Catalog() {
  const products = JSON.parse(localStorage.getItem('userProducts') || '[]');
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url("/assets/shop_bg.jpg")',
      backgroundSize: '100% auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      backgroundColor: '#000000',
      padding: '20px 10px'
    }}>
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

