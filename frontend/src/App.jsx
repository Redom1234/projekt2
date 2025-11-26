import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formattedConfidence = useMemo(() => {
    if (!result?.confidence) return null;
    return `${(result.confidence * 100).toFixed(1)}%`;
  }, [result]);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    if (!selected) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setResult(null);
    setError("");
  };

  const handlePaste = (event) => {
    const items = event.clipboardData?.items ?? [];
    const imageItem = Array.from(items).find((item) =>
      item.type.startsWith("image/")
    );

    if (!imageItem) {
      setError("Urklippet innehåller ingen bild.");
      return;
    }

    const blob = imageItem.getAsFile();
    if (!blob) {
      setError("Kunde inte läsa bilden från urklipp.");
      return;
    }

    const extension = blob.type.split("/")[1] ?? "png";
    const pastedFile = new File(
      [blob],
      `clipboard-${Date.now()}.${extension}`,
      {
        type: blob.type,
        lastModified: Date.now(),
      }
    );

    setFile(pastedFile);
    setPreviewUrl(URL.createObjectURL(blob));
    setResult(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Välj en bild först.");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Kunde inte klassificera bilden.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <main className="app">
      <section className="panel upload">
        <h1>Intelligent Sortering</h1>
        <p>
          Ladda upp en bild på ditt avfall och låt modellen avgöra om det är
          plast, papper eller metall.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="image" className="file-input">
            <span>{file ? file.name : "Välj en bildfil"}</span>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Analyserar..." : "Klassificera"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div
          className="paste-zone"
          onPaste={handlePaste}
          tabIndex={0}
          role="button"
        >
          <h2>Klistra in bild (Ctrl + V)</h2>
          <p>Markera ytan och klistra in en bild från urklipp.</p>
          <span>Urklippet ersätter vald fil automatiskt.</span>
        </div>
      </section>

      <section className="panel results">
        {previewUrl ? (
          <img src={previewUrl} alt="Förhandsvisning" className="preview" />
        ) : (
          <div className="placeholder">Förhandsvisningen visas här</div>
        )}

        {result && (
          <div className="classification">
            <h2>Kategori: {result.category}</h2>
            {formattedConfidence && (
              <p className="confidence">Säkerhet: {formattedConfidence}</p>
            )}

            {result.predictions?.length > 0 && (
              <ul className="predictions">
                {result.predictions.map((prediction) => (
                  <li key={prediction.label}>
                    <span>{prediction.label}</span>
                    <span>{(prediction.confidence * 100).toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
