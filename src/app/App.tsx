import { useState } from 'react';
import backgroundImage from "../assets/iPad-Background.png";

const VIDEOS = {
  mod: '1sdm5ev81y',
  jessica: 'oh4fj045uf',
};

export default function App() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getCardStyle = (cardNumber: number) => ({
    width: '45%',
    backgroundColor: hoveredCard === cardNumber ? '#2a2a2e' : '#252528',
    borderRadius: '14px',
    border: `1px solid ${hoveredCard === cardNumber ? '#5a5a5e' : '#3a3a3e'}`,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column' as const,
    cursor: 'pointer',
    transition: 'all 400ms ease',
    position: 'relative' as const,
    overflow: 'hidden' as const
  });

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000000',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'relative',
        width: '1366px',
        height: '1024px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.22)'
        }} />

        {/* Content container */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 60px 8px'
        }}>
          {/* Headline */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '52px',
              color: '#ffffff',
              lineHeight: '1.2',
              marginBottom: '8px'
            }}>
              <span style={{ fontWeight: 400 }}>SUSPECT & </span>
              <span style={{ fontWeight: 700, color: '#FFC359' }}>DETECT ADH1</span>
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: 400,
              color: '#B5BEBE',
              letterSpacing: '0.04em',
              lineHeight: '1.3'
            }}>
              Video Library
            </div>
          </div>

          {/* Video Cards Container */}
          <div style={{
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingBottom: '30px',
            marginTop: '-44px'
          }}>
            {/* Card 1 - Mechanism of Disease */}
            <div
              style={getCardStyle(1)}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveVideo(VIDEOS.mod)}
            >
              {/* Gradient overlay on hover */}
              {hoveredCard === 1 && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(74, 74, 78, 0.2) 0%, transparent 100%)',
                  pointerEvents: 'none',
                  borderRadius: '14px'
                }} />
              )}

              {/* Video Thumbnail */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                borderRadius: '8px',
                marginBottom: '20px',
                overflow: 'hidden'
              }}>
                <img
                  src="https://embed-ssl.wistia.com/deliveries/a8ffc07c5daf6b5297554348618e6c30.jpg?image_crop_resized=960x542"
                  alt="Mechanism of Disease thumbnail"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#FFC359',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
                >
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '14px solid #0a1423',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    marginLeft: '4px'
                  }} />
                </div>
              </div>

              {/* Title */}
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: '1.4',
                position: 'relative',
                zIndex: 1
              }}>
                Mechanism of Disease
              </div>

              {/* Summary */}
              <div style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: '1.5',
                position: 'relative',
                zIndex: 1
              }}>
                Explore the underlying disease mechanism of ADH1.
              </div>
            </div>

            {/* Card 2 - Jessica's Story */}
            <div
              style={getCardStyle(2)}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveVideo(VIDEOS.jessica)}
            >
              {/* Gradient overlay on hover */}
              {hoveredCard === 2 && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(74, 74, 78, 0.2) 0%, transparent 100%)',
                  pointerEvents: 'none',
                  borderRadius: '14px'
                }} />
              )}

              {/* Video Thumbnail */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                borderRadius: '8px',
                marginBottom: '20px',
                overflow: 'hidden'
              }}>
                <img
                  src="https://embed-ssl.wistia.com/deliveries/256781751faf6405fa1467b16a1d6274.jpg?image_crop_resized=960x480"
                  alt="Jessica's Story thumbnail"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#FFC359',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'}
                >
                  <div style={{
                    width: 0,
                    height: 0,
                    borderLeft: '14px solid #0a1423',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    marginLeft: '4px'
                  }} />
                </div>
              </div>

              {/* Title */}
              <div style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: '1.4',
                position: 'relative',
                zIndex: 1
              }}>
                Jessica's Story
              </div>

              {/* Summary */}
              <div style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.65)',
                lineHeight: '1.5',
                position: 'relative',
                zIndex: 1
              }}>
                Experience Jessica's story about living with ADH1.
              </div>
            </div>
          </div>

          {/* Legal Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            padding: '16px 0',
            margin: '0 -40px'
          }}>
            <div>ADH1=Autosomal dominant hypocalcemia type 1.</div>
            <div>©2026 BridgeBio Pharma, Inc. All rights reserved. MAT-US-ECLTX-0117</div>
          </div>
        </div>

        {/* Wistia Video Modal — inside iPad frame so it's constrained to 1366×1024 */}
        {activeVideo && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setActiveVideo(null)}
          >
            <div
              style={{
                position: 'relative',
                width: 'calc(100% - 48px)',
                aspectRatio: '16 / 9'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://fast.wistia.net/embed/iframe/${activeVideo}?autoPlay=1&fitStrategy=fill&fullscreenButton=true`}
                allowFullScreen
                allow="autoplay; fullscreen"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px'
                }}
              />
            </div>
            {/* Close button */}
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="1" y1="1" x2="13" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="13" y1="1" x2="1" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
