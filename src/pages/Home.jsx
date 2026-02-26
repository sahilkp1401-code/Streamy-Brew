import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      {/* 1. COFFEE SECTION (Image Right - Light BG) */}
      <section className="info-row light-bg hero-padding">
        <div className="info-content">
          <h1 className="brown-text-lg">Welcome to Cafe</h1>
          <p className="dark-p">Fresh Coffee • Tasty Food • Happy Mood. Experience the finest blend in a luxury ambiance.</p>
          <button className="btn-brown" onClick={() => navigate("/menu")}>Explore Menu</button>
        </div>
        <div className="info-img-box">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/924/924514.png" 
            alt="coffee" 
            className="animated-icon"
          />
        </div>
      </section>

      {/* 2. PIZZA SECTION (Image Left - Dark BG) */}
      <section className="info-row dark-bg">
        <div className="info-img-box">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3595/3595455.png" 
            alt="pizza" 
            className="animated-icon-slow"
          />
        </div>
        <div className="info-content">
          <h2 className="gold-text">Artisan Pizzas</h2>
          <p>Freshly baked in a wood-fired oven, our pizzas feature hand-stretched dough and the finest mozzarella.</p>
        </div>
      </section>

      {/* 3. BURGER SECTION (Image Right - Light BG) */}
      <section className="info-row light-bg">
        <div className="info-content">
          <h2 className="brown-text">Signature Burgers</h2>
          <p className="dark-p">Juicy, prime-cut patties layered with secret sauces and fresh garden greens in a brioche bun.</p>
        </div>
        <div className="info-img-box">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" 
            alt="burger" 
            className="animated-icon"
          />
        </div>
      </section>

     
      <section className="info-row dark-bg">
        <div className="info-img-box">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/992/992717.png" 
            alt="dessert" 
            className="animated-icon-slow"
          />
        </div>
        <div className="info-content">
          <h2 className="gold-text">Divine Desserts</h2>
          <p>Indulge your sweet tooth with our chef's special selection of decadent cakes and creamy pastries.</p>
        </div>
      </section>

    </div>
  );
};

export default Home;