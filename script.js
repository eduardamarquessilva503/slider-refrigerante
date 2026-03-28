const { useState, useEffect } = React;



const slides = [
    {
        id: 0,
        brand: "coca",
        title: "COCA-COLA ORIGINAL TASTE",
        desc: "É o sabor único e refrescante que você já conhece. Perfeito para qualquer momento do seu dia.",
        colorClass: "slide-coca",
        btnClass: "btn-red",
        splashPos: "splash-pos-coca",
        canPos: "can-pos-coca"
    },
    {
        id: 1,
        brand: "fanta",
        title: "FANTA LARANJA - SABOR EXPLOSIVO",
        desc: "A explosão de sabor da laranja que faz tudo ficar mais divertido e vibrante.",
        colorClass: "slide-fanta",
        btnClass: "btn-orange",
        splashPos: "splash-pos-fanta",
        canPos: "can-pos-fanta"
    },
    {
        id: 2,
        brand: "sprite",
        title: "SPRITE - REFRESCO PURO",
        desc: "O poder refrescante do limão que hidrata e revigora com pureza e intensidade.",
        colorClass: "slide-sprite",
        btnClass: "btn-green",
        splashPos: "splash-pos-sprite",
        canPos: "can-pos-sprite"
    }
];

const formatTitle = (title) => {
    return title.split(" - ").map((part, index) => (
        <React.Fragment key={index}>
            {part}
            {index < title.split(" - ").length - 1 && <br />}
        </React.Fragment>
    ));
};

const Slider = ({ currentIndex, nextSlide, prevSlide, goToSlide }) => {
    return (
        <main className="slider-container">
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className={`slide ${i === currentIndex ? "active" : ""} ${slide.colorClass}`}
                >
                    <div className="watermark"></div>

                    <div className="splash-box">
                        <div className={`sprite-splash ${slide.splashPos}`}></div>
                    </div>

                    <div className="content">
                        <h1 className="title">{formatTitle(slide.title)}</h1>
                        <p className="description">{slide.desc}</p>
                        <a href="#nossos-produtos" className={`btn ${slide.btnClass}`}>
                            VER MAIS
                        </a>

                        <div className="slide-nav">
                            <div className="dots">
                                {slides.map((_, dotIndex) => (
                                    <span
                                        key={dotIndex}
                                        className={`dot ${dotIndex === currentIndex ? "active" : ""}`}
                                        onClick={() => goToSlide(dotIndex)}
                                    ></span>
                                ))}
                            </div>

                            <div className="arrows">
                                <button type="button" className="prev" onClick={prevSlide}>
                                    <i className="bx bx-left-arrow-alt"></i>
                                </button>
                                <button type="button" className="next" onClick={nextSlide}>
                                    <i className="bx bx-right-arrow-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="image-box"
                        onClick={nextSlide}
                        style={{ cursor: "pointer" }}
                    >
                        <div className={`sprite-can ${slide.canPos}`}></div>
                    </div>
                </div>
            ))}
        </main>
    );
};



const FlavorCards = () => {
    const sectionRef = React.useRef(null);

    useEffect(() => {
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const scrollerEl = document.querySelector(".page-container");
            const animatedPath = document.querySelector(".wavy-bg-path-animated");

            if (animatedPath && sectionRef.current && scrollerEl) {
                requestAnimationFrame(() => {
                    const len = animatedPath.getTotalLength();

                    gsap.set(animatedPath, {
                        strokeDasharray: len,
                        strokeDashoffset: len
                    });

                    gsap.to(animatedPath, {
                        strokeDashoffset: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            scroller: document.querySelector(".page-container") || window,
                            start: "top 75%",
                            end: "bottom bottom",
                            scrub: 1
                        }
                    });

                    ScrollTrigger.refresh();
                });
            }

            const arrows = gsap.utils.toArray(".flavor-arrow-path");
            arrows.forEach((arrow) => {
                const len = arrow.getTotalLength();

                gsap.set(arrow, {
                    strokeDasharray: len,
                    strokeDashoffset: len
                });

                gsap.to(arrow, {
                    strokeDashoffset: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: arrow,
                        scroller: document.querySelector(".page-container") || window,
                        start: "top 90%",
                        end: "top 55%",
                        scrub: 1
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const cardsData = [
        {
            id: 'fanta',
            brand: 'fanta',
            color: '#f28b21',
            title: 'Sabor',
            desc: 'Uma lata nova a estrear, a explosão vibrante da laranja que te faz salivar por mais.',
            reverse: false,
            IconClass: 'bx bx-wink-smile'
        },
        {
            id: 'coca',
            brand: 'coca',
            color: '#d32027',
            title: 'Explosão',
            desc: 'Da explosão de sabor inconfundível. Refrescância absoluta e clássica a cada gole.',
            reverse: true,
            IconClass: 'bx bx-dizzy'
        },
        {
            id: 'sprite',
            brand: 'sprite',
            color: '#009c48',
            title: 'Sinfonia',
            desc: 'Ao tilintar das tuas papilas gustativas com a pureza intensa do limão.',
            reverse: false,
            IconClass: 'bx bxs-heart-circle'
        }
    ];

    const ArrowSVG = ({ className }) => (
        <svg className={`flavor-arrow-svg ${className}`} viewBox="0 0 150 100" preserveAspectRatio="none">
            <path className="flavor-arrow-path" d="M 10,50 Q 75,-20 140,50 M 115,30 L 140,50 L 115,70" />
        </svg>
    );

    return (
        <section ref={sectionRef} className="flavor-section">
            {/* Wavy Background Line connecting the cards */}
            <svg className="flavor-wavy-bg" viewBox="0 0 1000 2000" preserveAspectRatio="none" aria-hidden="true">
                <path className="wavy-bg-path-base" d="M 500,120 C 500,260 760,300 760,560 C 760,840 240,920 240,1240 C 240,1540 500,1700 500,2000" />
                <path className="wavy-bg-path-animated" d="M 500,120 C 500,260 760,300 760,560 C 760,840 240,920 240,1240 C 240,1540 500,1700 500,2000" />
            </svg>

            {cardsData.map((card, idx) => (
                <div key={card.id} className={`flavor-card-container ${card.reverse ? 'reverse' : ''}`}>
                    {/* Text Box */}
                    <div className="flavor-text-box" style={{ backgroundColor: card.color }}>
                        <div className="flavor-icon-circle" style={{ borderColor: card.color, color: card.color }}>
                            <i className={card.IconClass} style={{ fontSize: '75px' }}></i>
                        </div>
                        <h2>{card.title}</h2>
                        <p>{card.desc}</p>

                        {/* The arrow conditionally points right or left based on layout */}
                        <ArrowSVG className={card.reverse ? 'arrow-left' : 'arrow-right'} />
                    </div>

                    {/* Can Column */}
                    <div className="flavor-can-col">
                        <div className={`flavor-can-sprite ${card.brand}`}></div>
                    </div>
                </div>
            ))}
        </section>
    );
};

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="page-container">
            <Slider
                currentIndex={currentIndex}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                goToSlide={goToSlide}
            />

            <FlavorCards />
            
            <footer className="author-footer">
                <div className="footer-content">
                    <p>Powered by <strong>Eduarda Marques</strong></p>
                    <a href="https://github.com/eduardamarquessilva503" target="_blank" rel="noopener noreferrer" className="github-link">
                        <i className='bx bxl-github'></i>
                    </a>
                </div>
            </footer>
        </div>
    );
};

const rootElement = document.getElementById("root");

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Elemento com id "root" não encontrado.');
}