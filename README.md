# 🛡️ Kyber Detektiv – Vzdělávací hra o kyberbezpečnosti

Interaktivní webová hra, ve které se hráč vžije do role kybernetického detektiva a učí se rozpoznávat phishing, smishing, falešné e-shopy a techniky sociálního inženýrství.

---

## 📋 Záměr projektu a výběr problematiky

### Proč kyberbezpečnost?

Kybernetická kriminalita je jednou z nejrychleji rostoucích hrozeb digitální doby. Podle statistik NÚKIB (Národní úřad pro kybernetickou a informační bezpečnost) počet phishingových útoků v Česku meziročně roste o desítky procent. Přesto většina uživatelů nemá dostatečné povědomí o tom, jak podvody rozpoznat.

### Cíl hry

Hráč se učí praktickým rozpoznáváním reálně vypadajících podvodných zpráv. Místo nudného čtení pouček hráč **sám analyzuje** e-maily a SMS, hledá varovné signály a rozhoduje se – přesně tak, jako v reálném životě.

### Pokryté oblasti

| Oblast | Příklady |
|--------|----------|
| **Phishing** | Falešné bankovní e-maily, podvodné výzvy k ověření účtu |
| **Smishing** | Podvodné SMS o výhrách, falešná doručovací oznámení |
| **Falešné e-shopy** | Nereálné slevy, platba pouze převodem, chybějící údaje |
| **Sociální inženýrství** | Falešná IT podpora, BEC (Business Email Compromise), spear phishing |

---

## 🎮 Princip zábavnosti a herní mechaniky

### Interaktivní vyšetřování

Každá zpráva obsahuje **klikatelné prvky** (zvýrazněné podtržením), které po kliknutí odhalí skrytou informaci:
- **Adresa odesílatele** → skutečná doména
- **Tlačítka a odkazy** → kam odkaz doopravdy vede
- **Naléhavý text** → vysvětlení manipulativní techniky

### Herní prvky

- **3 životy** (srdíčka) – za každou chybnou odpověď hráč ztratí život
- **Combo/Streak** – počítadlo série správných odpovědí s bonusovými body
- **3 úrovně obtížnosti:**
  - 🔰 Začátečník – zřejmé podvody s jasnými varovnými signály
  - ⚔️ Pokročilý – sofistikovanější útoky, mix bezpečných a podvodných zpráv
  - 🏆 Expert – cílené útoky (spear phishing, BEC), velmi přesvědčivé podvody
- **Bodový systém** – 100/150/200 bodů podle úrovně + bonusy za série
- **Vizuální zpětná vazba** – zelený záblesk při správné odpovědi, červené zatřesení při chybě

### Okamžité vysvětlení

Po každém rozhodnutí hra zobrazí:
- Zda bylo rozhodnutí správné
- Podrobné vysvětlení, proč je zpráva bezpečná nebo podvodná
- Konkrétní varovné signály (red flags) s ikonami

---

## 📊 Metodika měřitelnosti dosaženého pokroku poznání

### Vstupní vs. výstupní srovnání

1. **Vstupní diagnostika (3 otázky):** Na začátku hry hráč zodpoví 3 otázky testující základní znalosti kyberbezpečnosti
2. **Závěrečná zkouška (3 otázky):** Na konci hry hráč zodpoví 3 paralelní otázky zaměřené na stejné oblasti
3. **Porovnání:** Hra vypočítá a vizuálně zobrazí procentuální zlepšení

### Analýza podle kategorií

Hra průběžně sleduje úspěšnost ve 3 kategoriích:

| Kategorie | Co měří |
|-----------|---------|
| 🌐 Falešné domény | Schopnost rozpoznat podvržené domény a e-mailové adresy |
| 💬 Emoční nátlak | Odolnost vůči manipulativním technikám (urgence, strach, empatie) |
| 💳 Podvodné platby | Rozpoznání podvodných platebních výzev a falešných e-shopů |

Na závěrečné obrazovce „Report poznání" se zobrazí:
- Progress bary s procentuální úspěšností v každé kategorii
- Textové hodnocení: ✅ Ovládáš / ⚠️ Zlepšuj se / 🚩 Dej si pozor

### Ukládání pokroku (localStorage)

- Historie všech pokusů se ukládá do `localStorage`
- Při opakovaném hraní hráč vidí svůj posun (např. 1. pokus: 45 % → aktuální: 90 %)
- Na úvodní obrazovce i v závěrečném reportu se zobrazují předchozí pokusy

---

## 🛠️ Použité technologie

| Technologie | Využití |
|-------------|---------|
| **HTML5** | Sémantická struktura, přístupnost (ARIA atributy) |
| **CSS3** | Responzivní design, glassmorphism, animace, dark mode |
| **JavaScript (ES6+)** | Herní logika, dynamické renderování, localStorage API |
| **Google Fonts** | Inter (texty), JetBrains Mono (kód, čísla) |

### Bez závislostí

Hra **nepotřebuje žádné balíčky, build nástroje ani server**. Stačí otevřít `index.html` v prohlížeči.

---

## 🚀 Návod ke spuštění

### Lokální spuštění

1. Stáhněte nebo naklonujte repozitář:
   ```bash
   git clone https://github.com/vas-ucet/kyber-detektiv.git
   ```
2. Otevřete soubor `index.html` v libovolném moderním prohlížeči (Chrome, Firefox, Edge, Safari)
3. Hrajte!

### Nasazení na GitHub Pages

1. Nahrajte soubory do GitHub repozitáře
2. Přejděte do **Settings → Pages**
3. Vyberte větev `main` a kořenový adresář `/`
4. Klikněte na **Save** – hra bude dostupná na `https://vas-ucet.github.io/kyber-detektiv/`

---

## 📁 Struktura projektu

```
kyber-detektiv/
├── index.html      # Hlavní HTML stránka (úvodní obrazovka, testy, hra, report)
├── style.css       # Kompletní styly (responzivní design, animace, dark mode)
├── script.js       # Herní logika, 12 scénářů, statistiky, localStorage
└── README.md       # Tato dokumentace
```

---

## 📐 Databáze scénářů

Hra obsahuje **12 propracovaných scénářů** rozdělených do 3 úrovní:

| # | Úroveň | Typ | Kategorie | Bezpečné? |
|---|---------|-----|-----------|-----------|
| 1 | Začátečník | E-mail | Falešné domény | ❌ Phishing |
| 2 | Začátečník | SMS | Falešné domény | ✅ Legitimní |
| 3 | Začátečník | SMS | Emoční nátlak | ❌ Smishing |
| 4 | Začátečník | E-mail | Podvodné platby | ❌ Phishing |
| 5 | Pokročilý | E-mail | Falešné domény | ❌ Sofistikovaný phishing |
| 6 | Pokročilý | E-mail | Podvodné platby | ✅ Legitimní |
| 7 | Pokročilý | E-mail | Emoční nátlak | ❌ Sociální inženýrství |
| 8 | Pokročilý | E-mail | Emoční nátlak | ❌ Podvodná charita |
| 9 | Expert | E-mail | Emoční nátlak | ❌ Spear phishing |
| 10 | Expert | E-mail | Falešné domény | ✅ Legitimní |
| 11 | Expert | E-mail | Podvodné platby | ❌ BEC útok |
| 12 | Expert | E-mail | Podvodné platby | ❌ Falešný e-shop |

---

## 📄 Licence

Tento projekt je vytvořen pro vzdělávací účely. Volně použitelný a šiřitelný.
