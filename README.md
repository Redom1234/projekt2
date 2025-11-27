
   - Dokumentera datakällor, träningsinställningar, testresultat samt reflektioner kring modellens beslut.
   - Lägg till skärmdumpar och eventuella grafer över noggrannhet eller fördelningar.

Vi har använt oss av en förtränad Hugging Face-modell för att urskilja papper, plast och metall. Den är integrerad i vårt system, med frontend byggd i React/Vite och backend i Python. Frontenden är byggd i React/Vite och postar bilder till backend via fetch. Den hanterar filuppladdning och renderar svaret från servern. Backend är en Flask-app i Python. Den tar emot filen, öppnar den och skickar bilden till HuggingFace-pipelinen före den skickar tillbaka klassificeringen till frontenden.
