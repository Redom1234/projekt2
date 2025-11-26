## Projekt 2 – AI & Data: Intelligent Sortering

Ett helhetsupplägg för kursmomentet vecka 48–49 där eleverna tränar en enkel bildklassificeringsmodell och bygger ett gränssnitt som visar resultatet.

### Struktur

- `keras_model.h5` – export från Teachable Machine/TensorFlow.
- `labels.txt` – lista med klasser (`index namn` per rad).
- `backend/` – Flask-API som laddar modellen och exponerar `/predict`.
- `frontend/` – React-gränssnitt för att ladda upp bilder.
- `data/train|test/<klass>/` – placeringsförslag för tränings-/testdata (lägg egna filer).

### Steg-för-steg

1. **Planering & Data**
   - Välj tema (t.ex. plast/papper/metall) och samla minst 50 bilder per klass.
   - Dela upp data i `train/` och `test/`.
2. **Träning**
   - Använd Teachable Machine eller TensorFlow i Python.
   - Exportera modellen till `keras_model.h5` och uppdatera `labels.txt`.
   - Testa modellen lokalt genom att köra skript/notebook mot `data/test/`.
3. **Flask-API**
   - Se `backend/README.md` för installationssteg.
   - Kör `python main.py` och anropa `POST /predict` med en bild.
4. **Frontend**
   - Se `frontend/README.md`.
   - Kör `npm run dev`, ladda upp en bild och visa resultatet som “Kategori: Plast 🧴”.
   - Hantera modeller direkt i webbgränssnittet (ladda upp ny `.h5` eller ta bort den befintliga).
5. **Rapport**
   - Dokumentera datakällor, träningsinställningar, testresultat samt reflektioner kring modellens beslut.
   - Lägg till skärmdumpar och eventuella grafer över noggrannhet eller fördelningar.

### Testning

- Använd dina testbilder och jämför förväntad etikett mot API-svaret.
- Spara resultaten i en tabell (fil eller README) för att visa noggrannhet.
- Lägg gärna till visualiseringar i frontenden för extra poäng.

### Vidare idéer

- Förklara vad modellen tittar på (t.ex. Grad-CAM för bildmodeller).
- Lägg till fler materialkategorier eller språkstöd.
- Utöka frontenden med historik, drag-and-drop eller kamera-uppladdning.

