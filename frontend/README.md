# Frontend – Intelligent Sortering

En enkel React-klient som pratar med Flask-API:t och låter användaren ladda upp bilder på avfall. Resultatet visas direkt tillsammans med modellens säkerhet per kategori.

## Utveckling

```bash
npm install
npm run dev
```

Frontenden använder miljövariabeln `VITE_API_URL` (default `http://localhost:5000`). Lägg till den i en `.env`-fil om du kör API:t på en annan adress.

## Funktioner

- Upload via drag-and-drop-liknande knapp.
- Förhandsvisning av vald bild.
- Stöd för att klistra in bilder direkt (Ctrl + V).
- Visar toppklassning och hela fördelningen från modellen.
- Egen sektion för att ladda upp eller radera `.h5`-modellen i backend.
- Fungerar på mobil, surfplatta och desktop.
