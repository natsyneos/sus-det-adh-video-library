import { useRef, useState } from 'react';
import backgroundImage from "../assets/iPad-Background.png";

export default function App() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleVideoClick = async (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      try {
        // First play the video
        await videoRef.current.play();
        // Then request fullscreen
        await videoRef.current.requestFullscreen();
      } catch (err) {
        console.error('Error attempting to play video in fullscreen:', err);
        // Fallback: just play the video if fullscreen fails
        if (videoRef.current.paused) {
          videoRef.current.play().catch(e => console.error('Play error:', e));
        }
      }
    }
  };

  const handleFullscreenChange = (videoRef: React.RefObject<HTMLVideoElement>) => {
    if (videoRef.current && !document.fullscreenElement) {
      videoRef.current.pause();
    }
  };

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
              onClick={() => handleVideoClick(video1Ref)}
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
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%', // 16:9 ratio
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <video 
                  ref={video1Ref}
                  src="mod.mp4"
                  controls
                  playsInline
                  onFullscreenChange={() => handleFullscreenChange(video1Ref)}
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
                minHeight: '46px',
                position: 'relative',
                zIndex: 1
              }}>
                Watch our Autosomal Dominant Hypocalcemia Type 1 (ADH1) Mechanism of Disease video.
              </div>
            </div>

            {/* Card 2 - Jessica's Story */}
            <div 
              style={getCardStyle(2)}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleVideoClick(video2Ref)}
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
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%', // 16:9 ratio
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <video 
                  ref={video2Ref}
                  src="jessica.mp4"
                  controls
                  playsInline
                  onFullscreenChange={() => handleFullscreenChange(video2Ref)}
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
                minHeight: '46px',
                position: 'relative',
                zIndex: 1
              }}>
                Watch Jessica talk about her experience living with ADH1.
              </div>
            </div>
          </div>

          {/* Legal Footer */}
          <div style={{
            textAlign: 'center',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
            padding: '16px 0'
          }}>
            ©2026 BridgeBio Pharma, Inc. All rights reserved. MAT-US-ECLTX-XXXX
          </div>
        </div>
      </div>
    </div>
  );
}