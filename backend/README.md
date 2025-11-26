## Flask API – Intelligent Sortering

Denna server laddar en tränad TensorFlow-/Teachable Machine-modell (`keras_model.h5`) och exponerar ett enkelt API för att klassificera uppladdade bilder (t.ex. plast, papper, metall).

### Kom igång

1. Skapa ett virtuellt Python-miljö (`python -m venv .venv` och aktivera den).
2. Installera beroenden:

   ```bash
   pip install -e .
   ```

3. Starta API:t:

   ```bash
   python main.py
   ```

API:t körs på `http://localhost:5000`.

### Endpoints

- `GET /health` – snabb statuskontroll.
- `POST /predict` – tar emot `multipart/form-data` med nyckeln `file`. Returnerar:

  ```json
  {
    "category": "Plast",
    "confidence": 0.92,
    "predictions": [
      {"label": "Plast", "confidence": 0.92},
      {"label": "Metall", "confidence": 0.06},
      {"label": "Papper", "confidence": 0.02}
    ]
  }
  ```
- `POST /model` – tar emot `multipart/form-data` med nyckeln `model` (en `.h5`-fil). Filen testas, ersätter automatiskt `keras_model.h5` vid lyckad laddning och frontenden kan anropa den via sitt “Uppdatera modell”-formulär.
- `DELETE /model` – tar bort nuvarande `keras_model.h5` och nollställer modellen. Efteråt svarar `/predict` med fel tills en ny modell laddas upp.

### Data & Modell

- Lägg minst 50 träningsbilder per kategori i `data/train/<kategori>/`.
- Lägg testdata i `data/test/<kategori>/`.
- Träna modellen i Teachable Machine eller TensorFlow och exportera till `keras_model.h5`.
- Lista klasser i `labels.txt` (en rad per klass enligt formatet `0 plast`).

### Vidareutveckling

- Mät noggrannhet genom att köra testmappen mot API:t och spara resultat i rapporten.
- Lägg till visualiseringar/grafer eller förklaringar av modellen i frontend-applikationen.

