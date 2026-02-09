import React, { useRef, useState } from 'react';

const Scanner: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!fileInputRef.current?.files?.[0]) return;
    setLoading(true);
    setError(null);
    setResult(null);
    const formData = new FormData();
    formData.append('image', fileInputRef.current.files[0]);
    try {
      const res = await fetch('http://localhost:5000/scan', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Scan failed');
      const data = await res.json();
      setResult(data.result || 'No result');
    } catch (err) {
      setError('Failed to scan image');
    }
    setLoading(false);
  };

  return (
    <div className="scanner-page" style={{ maxWidth: 400, margin: '80px auto', textAlign: 'center' }}>
      <h2>Durian Scanner</h2>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        capture="environment"
        style={{ margin: '1rem 0' }}
      />
      {image && <img src={image} alt="Preview" style={{ maxWidth: '100%', borderRadius: 12, marginBottom: 16 }} />}
      <button onClick={handleScan} disabled={loading || !image} style={{ padding: '0.75rem 2rem', borderRadius: 8, background: '#10b981', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
        {loading ? 'Scanning...' : 'Scan Durian'}
      </button>
      {result && <div style={{ marginTop: 24, color: '#065f46', fontWeight: 600 }}>Result: {result}</div>}
      {error && <div style={{ marginTop: 16, color: '#ef4444' }}>{error}</div>}
    </div>
  );
};

export default Scanner;
