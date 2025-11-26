import os
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image, UnidentifiedImageError
from pipeline import pipe   # HuggingFace pipeline

app = Flask(__name__)
CORS(app)

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "modelLoaded": "huggingface-pipeline",
        "hasModel": True,
    }

@app.post("/predict")
def predict():
    if "file" not in request.files:
        return jsonify({"error": "Ingen fil hittades i förfrågan."}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Vald fil saknar filnamn."}), 400

    try:
        image = Image.open(file.stream).convert("RGB")
    except UnidentifiedImageError:
        return jsonify({"error": "Filen går inte att tolka som en bild."}), 400

    try:
        # Run HuggingFace pipeline directly on PIL image
        results = pipe(image)
    except Exception as exc:
        return jsonify({"error": "Fel vid prediktion.", "details": str(exc)}), 500

    # Sort confidence descending
    results_sorted = sorted(results, key=lambda r: r["score"], reverse=True)

    top = results_sorted[0] if results_sorted else {"label": "okänd", "score": 0.0}

    return jsonify(
        {
            "category": top["label"],
            "confidence": float(top["score"]),
            "predictions": [
                {"label": r["label"], "confidence": float(r["score"])}
                for r in results_sorted
            ],
        }
    )

# Dummy endpoints kept for compatibility
@app.post("/model")
def upload_model():
    return jsonify({"message": "Modelluppladdning stöds inte längre. Pipeline används alltid."}), 200

@app.delete("/model")
def delete_model():
    return jsonify({"message": "Ingen modell används lokalt. Pipeline körs från HuggingFace."}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
