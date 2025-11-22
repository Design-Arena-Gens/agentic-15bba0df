'use client'

import { useState, useRef } from 'react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [postText, setPostText] = useState('')
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generatePostText = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const texts = [
        `🌟 Nouveau produit disponible! 🌟\n\n${productName}\n\n${productDescription}\n\n✨ Qualité premium garantie\n💯 Satisfaction client assurée\n🚚 Livraison rapide\n\n👉 Commandez maintenant! #NouveauProduit #Shopping #QualitéPremium`,
        `🎉 Découvrez ${productName}! 🎉\n\n${productDescription}\n\n💫 Innovation et qualité\n🎯 Conçu pour vous\n💝 Prix exceptionnel\n\n📱 Contactez-nous pour plus d'infos!\n#Produit #Innovation #Excellence`,
        `✨ ${productName} ✨\n\nVotre nouveau favori est arrivé!\n\n${productDescription}\n\n🔥 Offre spéciale de lancement\n⭐ Qualité supérieure\n💪 Garantie satisfaction\n\n👉 Ne manquez pas cette opportunité!\n#Shopping #NouveauProduit #OffreSpeciale`
      ]
      setPostText(texts[Math.floor(Math.random() * texts.length)])
      setIsGenerating(false)
    }, 1000)
  }

  const downloadPost = () => {
    if (!canvasRef.current || !selectedImage) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = 1200
      canvas.height = 1200

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const scale = Math.min(canvas.width / img.width, 900 / img.height)
      const x = (canvas.width - img.width * scale) / 2
      const y = 50

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

      ctx.fillStyle = '#1877f2'
      ctx.fillRect(0, canvas.height - 200, canvas.width, 200)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 40px system-ui'
      ctx.textAlign = 'center'

      const lines = productName.split('\n')
      lines.forEach((line, i) => {
        ctx.fillText(line, canvas.width / 2, canvas.height - 140 + (i * 50))
      })

      const link = document.createElement('a')
      link.download = 'facebook-post.png'
      link.href = canvas.toDataURL()
      link.click()
    }
    img.src = selectedImage
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Créateur de Publication Facebook
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          fontSize: '1.1rem',
          marginBottom: '3rem'
        }}>
          Transformez vos images de produits en publications professionnelles
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: '#333'
            }}>
              📸 Télécharger l'image
            </h2>

            <div style={{
              border: '3px dashed #667eea',
              borderRadius: '15px',
              padding: '2rem',
              textAlign: 'center',
              background: '#f8f9ff',
              marginBottom: '1.5rem',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Produit"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
              ) : (
                <div>
                  <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</p>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>Cliquez pour sélectionner une image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem',
                  cursor: 'pointer'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Nom du produit
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ex: Chaussures de sport premium"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Description
              </label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Décrivez votre produit..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <button
              onClick={generatePostText}
              disabled={!productName || !productDescription || isGenerating}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: productName && productDescription ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: productName && productDescription ? 'pointer' : 'not-allowed',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => {
                if (productName && productDescription) {
                  e.currentTarget.style.transform = 'scale(1.02)'
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              {isGenerating ? '⏳ Génération...' : '✨ Générer le texte'}
            </button>
          </div>

          <div>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '1.5rem',
              color: '#333'
            }}>
              📝 Texte de la publication
            </h2>

            <div style={{
              background: '#f8f9ff',
              border: '2px solid #667eea',
              borderRadius: '15px',
              padding: '1.5rem',
              minHeight: '300px',
              marginBottom: '1.5rem'
            }}>
              {postText ? (
                <textarea
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    padding: '1rem',
                    fontSize: '1rem',
                    border: 'none',
                    background: 'transparent',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: '1.6'
                  }}
                />
              ) : (
                <p style={{ color: '#999', textAlign: 'center', marginTop: '6rem' }}>
                  Le texte généré apparaîtra ici...
                </p>
              )}
            </div>

            {postText && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(postText)
                  alert('Texte copié dans le presse-papiers!')
                }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: '#1877f2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                📋 Copier le texte
              </button>
            )}

            {selectedImage && productName && (
              <button
                onClick={downloadPost}
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                💾 Télécharger l'image pour Facebook
              </button>
            )}
          </div>
        </div>

        <div style={{
          background: '#f0f4ff',
          padding: '1.5rem',
          borderRadius: '10px',
          marginTop: '2rem'
        }}>
          <h3 style={{ marginTop: 0, color: '#667eea' }}>💡 Comment utiliser:</h3>
          <ol style={{ lineHeight: '1.8', color: '#555' }}>
            <li>Téléchargez une image de votre produit</li>
            <li>Entrez le nom et la description du produit</li>
            <li>Cliquez sur "Générer le texte" pour créer une publication</li>
            <li>Modifiez le texte si nécessaire</li>
            <li>Copiez le texte et téléchargez l'image pour votre publication Facebook</li>
          </ol>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
