/* ══════════════════════════════════════════════════════════════
   KYBER DETEKTIV – Kompletní herní logika
   ══════════════════════════════════════════════════════════════ */

// ── Vstupní diagnostické otázky ─────────────────────────────
const pretestQuestions = [
  {
    question: 'Dostanete e-mail od „banky" s výzvou k okamžitému ověření účtu, jinak bude zablokován. Co uděláte nejdříve?',
    options: [
      'Kliknu na odkaz a ověřím účet, nechci o něj přijít',
      'Zkontroluji adresu odesílatele a doménu odkazu',
      'E-mail smažu a už se tím nebudu zabývat',
      'Přepošlu kolegům, ať mi pomohou rozhodnout'
    ],
    correct: 1,
    category: 'fakeDomains'
  },
  {
    question: 'Které z těchto znaků NEPATŘÍ mezi varovné signály phishingového e-mailu?',
    options: [
      'Překlepy a gramatické chyby v textu zprávy',
      'Osobní oslovení vaším celým jménem',
      'Naléhavý tón a hrozby (zablokování, pokuta)',
      'Podezřelá doména odesílatele'
    ],
    correct: 1,
    category: 'emotionalPressure'
  },
  {
    question: 'Přijde vám SMS o výhře v soutěži, které jste se nezúčastnili. Obsahuje odkaz. Co je správná reakce?',
    options: [
      'Kliknu na odkaz, abych zjistil, o co jde',
      'Odpovím na SMS s dotazem na podrobnosti',
      'Zprávu ignoruji, případně nahlásím jako spam',
      'Zavolám na číslo, ze kterého SMS přišla'
    ],
    correct: 2,
    category: 'fraudulentPayments'
  }
];

// ── Závěrečné zkušební otázky ───────────────────────────────
const posttestQuestions = [
  {
    question: 'Obdržíte e-mail od „České pošty" z adresy info@ceska-posta-doruceni.com s výzvou ke kliknutí na odkaz pro sledování zásilky. Jak zareagujete?',
    options: [
      'Otevřu odkaz, Česká pošta mi často posílá e-maily',
      'Zkontroluji, že doména neodpovídá ceskaposta.cz, a e-mail nahlásím jako podvod',
      'Odpovím s dotazem na číslo zásilky',
      'Přepošlu e-mail známým jako varování'
    ],
    correct: 1,
    category: 'fakeDomains'
  },
  {
    question: 'E-shop nabízí nejnovější elektroniku za 70% slevu a přijímá pouze platbu předem na účet. Co nasvědčuje podvodu?',
    options: [
      'Pouze vysoká sleva – e-shopy mívají akce',
      'Kombinace nereálně nízké ceny a platby pouze předem bez ochrany kupujícího',
      'E-shop nemá mobilní aplikaci',
      'Webová stránka používá tmavý design'
    ],
    correct: 1,
    category: 'fraudulentPayments'
  },
  {
    question: 'Kolega vám posílá e-mail se sdíleným dokumentem, ale adresa odesílatele je neobvyklá (jiná doména). Co uděláte?',
    options: [
      'Otevřu odkaz – kolegu přece znám',
      'Odpovím na e-mail s dotazem, zda to poslal on',
      'Ověřím u kolegy jiným kanálem (telefonicky, osobně), zda zprávu skutečně poslal',
      'Přepošlu odkaz IT oddělení bez kontextu'
    ],
    correct: 2,
    category: 'emotionalPressure'
  }
];

// ── Herní scénáře (12 propracovaných) ───────────────────────
const scenarios = [
  // ═══ ÚROVEŇ 1 – ZAČÁTEČNÍK ═══
  {
    id: 1,
    level: 1,
    type: 'email',
    category: 'fakeDomains',
    isSafe: false,
    sender: { name: 'Česká Spořitelna', email: 'info@ceska-sporitelna-overeni.xyz', avatar: 'ČS', color: '#0066b3' },
    subject: '⚠️ Urgentní: Ověření vašeho účtu',
    date: '22. 11. 2024, 09:14',
    body: `<p>Vážený kliente,</p>
<p><span class="investigate" data-tip="⚠️ Naléhavý tón a hrozba zablokováním účtu – typický manipulativní prvek podvodníků! Skutečná banka by vám nikdy takto nepsala.">zaznamenali jsme podezřelou aktivitu na vašem účtu. Pokud do 24 hodin neprovedete ověření, bude váš účet <strong>trvale zablokován</strong>.</span></p>
<p>Pro zachování přístupu klikněte na tlačítko níže:</p>
<a class="email-action-btn investigate" style="background:linear-gradient(135deg,#0066b3,#004a8f)" data-tip="🔗 Skutečný odkaz: http://cs-sporitelna.phishing-site.ru/login — podvodná stránka na ruské doméně!">Ověřit můj účet →</a>
<p class="email-footer">S pozdravem,<br>Bezpečnostní tým České Spořitelny</p>`,
    senderTip: '🔍 Doména odesílatele: ceska-sporitelna-overeni.xyz — to NENÍ oficiální doména České spořitelny (ta je csas.cz)!',
    explanation: 'Tento e-mail je phishingový podvod. Doména odesílatele (ceska-sporitelna-overeni.xyz) nemá nic společného s Českou spořitelnou, jejíž skutečná doména je csas.cz. Zpráva používá naléhavý tón a hrozbu zablokování, aby vás přiměla kliknout na podvodný odkaz vedoucí na ruský server.',
    redFlags: [
      'Falešná doména odesílatele (ceska-sporitelna-overeni.xyz místo csas.cz)',
      'Naléhavý tón a hrozba trvalým zablokováním účtu',
      'Odkaz vede na podezřelou ruskou doménu (.ru)',
      'Neosobní oslovení „Vážený kliente"'
    ]
  },
  {
    id: 2,
    level: 1,
    type: 'sms',
    category: 'fakeDomains',
    isSafe: true,
    sender: { name: 'Banka', phone: '4100', avatar: '🏦' },
    smsBody: `Přihlášení do internetového bankovnictví z nového zařízení (Windows PC, Praha). Pokud jste to nebyli vy, zavolejte <span class="investigate" data-tip="✅ Číslo 800 207 207 je skutečná klientská linka České spořitelny. Bezpečné.">800 207 207</span>.`,
    time: '10:32',
    senderTip: '✅ Krátké číslo 4100 – banky používají ověřená krátká čísla pro notifikace. Toto je bezpečné.',
    explanation: 'Tato SMS je legitimní bezpečnostní upozornění od banky. Zpráva používá ověřené krátké číslo (4100), neobsahuje žádný odkaz ke kliknutí a nabízí oficiální telefonní linku pro případ problémů. Právě takhle vypadá skutečné bezpečnostní oznámení.',
    safeIndicators: [
      'Odesláno z krátkého čísla 4100 (ověřený bankovní kanál)',
      'Neobsahuje žádný podezřelý odkaz ke kliknutí',
      'Uvádí oficiální klientskou linku banky',
      'Poskytuje konkrétní informace (typ zařízení, lokalita)'
    ]
  },
  {
    id: 3,
    level: 1,
    type: 'sms',
    category: 'emotionalPressure',
    isSafe: false,
    sender: { name: 'Neznámé číslo', phone: '+420 735 926 148', avatar: '❓' },
    smsBody: `🎉 Gratulujeme! Vyhráli jste nový iPhone 16 Pro v soutěži Vodafone! <span class="investigate" data-tip="⚠️ Odkaz vyhry-cz.info je podvodná stránka – Vodafone používá vodafone.cz!">Vyzvedněte si cenu na: www.vyhry-cz.info/claim</span> <span class="investigate" data-tip="⚠️ Falešný časový nátlak! Podvodníci vytvářejí umělou urgenci, abyste neměli čas přemýšlet.">Nabídka platí pouze 2 hodiny!</span>`,
    time: '14:47',
    senderTip: '⚠️ Neznámé mobilní číslo – Vodafone by posílal zprávy ze svého ověřeného kontaktu, ne z osobního čísla!',
    explanation: 'Toto je klasický smishing (SMS phishing). Nikdy jste se žádné soutěže nezúčastnili, odkaz vede na podvodnou stránku a umělý časový nátlak má zabránit racionálnímu uvažování. Skutečný operátor by nikdy neposílal výhry z neznámého čísla.',
    redFlags: [
      'Výhra v soutěži, které jste se nezúčastnili',
      'Odesláno z neznámého osobního čísla, ne od Vodafonu',
      'Podezřelý odkaz (vyhry-cz.info místo vodafone.cz)',
      'Falešný časový nátlak („platí pouze 2 hodiny")'
    ]
  },
  {
    id: 4,
    level: 1,
    type: 'email',
    category: 'fraudulentPayments',
    isSafe: false,
    sender: { name: 'Zásilkovna', email: 'doruceni@zasilkovna-baliky.com', avatar: 'Z', color: '#e74c3c' },
    subject: 'Vaše zásilka čeká – uhraďte doplatné',
    date: '21. 11. 2024, 16:33',
    body: `<p>Dobrý den,</p>
<p>vaše zásilka č. <strong>CZ-2024-88712</strong> je připravena k doručení, ale <span class="investigate" data-tip="⚠️ Zásilkovna nikdy nepožaduje doplatek přes e-mail! Případné poplatky se řeší přímo na výdejním místě.">vyžaduje doplatek poštovného ve výši 49 Kč</span>.</p>
<p>Bez uhrazení bude zásilka do 48 hodin vrácena odesílateli.</p>
<a class="email-action-btn investigate" style="background:linear-gradient(135deg,#e74c3c,#c0392b)" data-tip="🔗 Odkaz vede na: https://zasilkovna-baliky.com/pay — falešná stránka, která krade údaje platební karty!">Zaplatit 49 Kč →</a>
<p class="email-footer">Zásilkovna – doručujeme radost</p>`,
    senderTip: '🔍 Doména zasilkovna-baliky.com NENÍ oficiální doména Zásilkovny (ta je zasilkovna.cz)!',
    explanation: 'Tento e-mail je podvod. Falešná stránka vypadá jako platební brána, ale ve skutečnosti krade údaje platební karty. Zásilkovna nikdy nepožaduje doplatek e-mailem – poplatky se řeší na výdejním místě. Doména zasilkovna-baliky.com není oficiální.',
    redFlags: [
      'Falešná doména (zasilkovna-baliky.com místo zasilkovna.cz)',
      'Požadavek na platbu e-mailem (Zásilkovna takto neúčtuje)',
      'Nízká částka 49 Kč snižuje obezřetnost oběti',
      'Hrozba vrácením zásilky vytváří časový tlak'
    ]
  },

  // ═══ ÚROVEŇ 2 – POKROČILÝ ═══
  {
    id: 5,
    level: 2,
    type: 'email',
    category: 'fakeDomains',
    isSafe: false,
    sender: { name: 'ČSOB Bezpečnost', email: 'security@csob-secure.cz', avatar: 'ČSOB', color: '#003d7d' },
    subject: 'Nový bezpečnostní certifikát – požadována aktualizace',
    date: '22. 11. 2024, 08:05',
    body: `<p>Vážená klientko / Vážený kliente,</p>
<p>v rámci zvyšování bezpečnosti internetového bankovnictví ČSOB jsme implementovali nový bezpečnostní certifikát SHA-3.</p>
<p><span class="investigate" data-tip="⚠️ Banky nikdy nepožadují ruční aktualizaci certifikátů přes e-mail! Certifikáty se aktualizují automaticky v prohlížeči.">Pro zachování přístupu k vašemu účtu je nutné do 72 hodin provést aktualizaci bezpečnostního certifikátu ve vašem profilu.</span></p>
<a class="email-action-btn investigate" style="background:linear-gradient(135deg,#003d7d,#00264d)" data-tip="🔗 Odkaz: https://csob-secure.cz/update-cert — podvodná doména! Skutečná ČSOB má doménu csob.cz">Aktualizovat certifikát →</a>
<p class="email-footer">S přátelským pozdravem,<br>Oddělení kybernetické bezpečnosti ČSOB, a.s.<br><span class="investigate" data-tip="⚠️ IČ sice odpovídá skutečnému IČ ČSOB, ale to je veřejně dostupná informace – podvodníci ji snadno zkopírují.">IČ: 00001350</span></p>`,
    senderTip: '🔍 Doména csob-secure.cz vypadá důvěryhodně, ale NENÍ to csob.cz! Podvodníci často registrují podobné domény.',
    explanation: 'Sofistikovaný phishing. E-mail vypadá profesionálně a používá skutečné IČ banky (veřejně dostupné). Klíčem je doména csob-secure.cz – ČSOB používá csob.cz. Banky nikdy nepožadují ruční aktualizaci certifikátů e-mailem.',
    redFlags: [
      'Doména csob-secure.cz není totožná s csob.cz',
      'Banky nepožadují ruční aktualizaci bezpečnostních certifikátů',
      'Časový nátlak (72 hodin)',
      'IČ je veřejně dostupný údaj – není důkaz legitimity'
    ]
  },
  {
    id: 6,
    level: 2,
    type: 'email',
    category: 'fraudulentPayments',
    isSafe: true,
    sender: { name: 'Alza.cz', email: 'objednavky@alza.cz', avatar: 'A', color: '#89c739' },
    subject: 'Potvrzení objednávky č. 1240897561',
    date: '20. 11. 2024, 14:22',
    body: `<p>Dobrý den,</p>
<p>děkujeme za vaši objednávku na Alza.cz.</p>
<p><strong>Objednávka č.:</strong> <span class="investigate" data-tip="✅ Číslo objednávky odpovídá standardnímu formátu Alza.cz. Můžete si ho ověřit po přihlášení na alza.cz.">1240897561</span><br>
<strong>Položky:</strong> USB-C kabel 1m (1×), 149 Kč<br>
<strong>Doručení:</strong> AlzaBox, Praha 5 – Smíchov<br>
<strong>Platba:</strong> Platební kartou (již uhrazeno)</p>
<p><span class="investigate" data-tip="✅ E-mail neobsahuje žádné podezřelé odkazy. Pro sledování stavu objednávky doporučuje přihlášení přímo na alza.cz.">Stav objednávky můžete sledovat po přihlášení do vašeho účtu na alza.cz.</span></p>
<p class="email-footer">S pozdravem,<br>Tým Alza.cz<br>Alza.cz a.s., Jateční 33a, Praha 7</p>`,
    senderTip: '✅ Doména alza.cz je oficiální doména e-shopu Alza. E-mail je legitimní.',
    explanation: 'Tento e-mail je legitimní potvrzení objednávky z Alza.cz. Doména odesílatele (alza.cz) je správná, e-mail neobsahuje podezřelé odkazy, nepožaduje kliknutí na žádný odkaz a odkazuje na přihlášení přímo na alza.cz.',
    safeIndicators: [
      'Odesláno z oficiální domény alza.cz',
      'Konkrétní číslo objednávky a detaily nákupu',
      'Neobsahuje naléhavé výzvy ani podezřelé odkazy',
      'Odkazuje na přihlášení přímo na alza.cz'
    ]
  },
  {
    id: 7,
    level: 2,
    type: 'email',
    category: 'emotionalPressure',
    isSafe: false,
    sender: { name: 'IT Helpdesk', email: 'helpdesk@firma-podpora.net', avatar: 'IT', color: '#6366f1' },
    subject: '🔒 Povinná změna hesla – účet bude deaktivován',
    date: '22. 11. 2024, 07:30',
    body: `<p>Dobrý den,</p>
<p>v souladu s novou interní bezpečnostní politikou musí všichni zaměstnanci <span class="investigate" data-tip="⚠️ Skutečné IT oddělení vaší firmy by používalo firemní doménu, ne firma-podpora.net! Vždy ověřte u IT kolegů osobně.">provést okamžitou změnu hesla</span> k firemnímu e-mailu a síti.</p>
<p><strong>Termín:</strong> <span class="investigate" data-tip="⚠️ Nerealisticky krátký termín má vyvolat paniku. Skutečné IT oddělení dává dostatek času a používá interní systémy.">do dnešního dne, 18:00</span></p>
<p>Pro změnu hesla použijte tento zabezpečený formulář:</p>
<a class="email-action-btn investigate" style="background:linear-gradient(135deg,#6366f1,#4f46e5)" data-tip="🔗 Odkaz: https://firma-podpora.net/password-reset — podvodná stránka sbírající firemní hesla!">Změnit heslo →</a>
<p class="email-footer">S pozdravem,<br>IT Helpdesk<br><span class="investigate" data-tip="⚠️ Podpis je vágní – chybí jméno konkrétní osoby z IT oddělení.">Oddělení technické podpory</span></p>`,
    senderTip: '⚠️ Doména firma-podpora.net není vaše firemní doména! Skutečný IT helpdesk by psal z @vasefirma.cz.',
    explanation: 'Toto je sociální inženýrství. Podvodník se vydává za IT oddělení a snaží se získat vaše firemní přihlašovací údaje. Skutečný helpdesk by používal firemní doménu, dal dostatek času a neposílal odkazy na externí stránky.',
    redFlags: [
      'Externí doména firma-podpora.net místo firemní domény',
      'Nerealisticky krátký termín (do 18:00 téhož dne)',
      'Odkaz vede na externí stránku, ne na firemní systém',
      'Vágní podpis bez jména konkrétní osoby'
    ]
  },
  {
    id: 8,
    level: 2,
    type: 'email',
    category: 'emotionalPressure',
    isSafe: false,
    sender: { name: 'Nadace Pomoc Dětem', email: 'dary@pomoc-detem-nadace.org', avatar: '💝', color: '#ec4899' },
    subject: 'Malá Anička potřebuje vaši pomoc – zbývá 6 hodin',
    date: '21. 11. 2024, 20:15',
    body: `<p>Dobrý den,</p>
<p><span class="investigate" data-tip="⚠️ Silný emoční nátlak s konkrétním příběhem dítěte – podvodníci zneužívají empatii! Skutečné charity nepíší takto naléhavě.">Šestiletá Anička z Brna trpí vzácným onemocněním a potřebuje operaci v zahraničí. Zbývá posledních 6 hodin na shromáždění potřebné částky.</span></p>
<p>Každý příspěvek pomáhá. Stačí i <strong>100 Kč</strong>.</p>
<a class="email-action-btn investigate" style="background:linear-gradient(135deg,#ec4899,#db2777)" data-tip="🔗 Odkaz: https://pomoc-detem-nadace.org/darovat — neověřená sbírka! Legitimní sbírky jsou registrované na portal.gov.cz">Darovat nyní →</a>
<p><span class="investigate" data-tip="⚠️ Falešné počítadlo dárců a nereálný časový limit jsou typické manipulativní techniky.">Již přispělo 2 847 dárců. Pomozte i vy!</span></p>
<p class="email-footer">Nadace Pomoc Dětem, z.s.</p>`,
    senderTip: '⚠️ Doména pomoc-detem-nadace.org – ověřte na portal.gov.cz, zda tato nadace skutečně existuje! Legitimní sbírky mají registrační číslo.',
    explanation: 'Podvodná charitativní sbírka. Zneužívá emoční příběh dítěte a umělý časový nátlak. Legitimní sbírky jsou registrované na portal.gov.cz, dávají dostatek času a neposílají nevyžádané e-maily s naléhavými výzvami.',
    redFlags: [
      'Extrémní emoční nátlak s konkrétním příběhem dítěte',
      'Falešný časový nátlak („zbývá 6 hodin")',
      'Neověřená nadace – není na portal.gov.cz',
      'Falešné počítadlo dárců jako sociální důkaz'
    ]
  },

  // ═══ ÚROVEŇ 3 – EXPERT ═══
  {
    id: 9,
    level: 3,
    type: 'email',
    category: 'emotionalPressure',
    isSafe: false,
    sender: { name: 'Martin Novák', email: 'martin.novak@firma-cz.com', avatar: 'MN', color: '#0ea5e9' },
    subject: 'Sdílený dokument – roční hodnocení 2024',
    date: '22. 11. 2024, 11:45',
    body: `<p>Ahoj,</p>
<p>posílám ti <span class="investigate" data-tip="⚠️ Spear phishing! Útočník použil informace z LinkedIn (jméno kolegy, vaše oddělení), aby e-mail vypadal důvěryhodně.">podklady k ročnímu hodnocení za naše oddělení</span>. Šéf je chce mít do pátku, tak se prosím podívej a doplň svou část.</p>
<a class="email-action-btn investigate" style="background:linear-gradient(135deg,#0ea5e9,#0284c7)" data-tip="🔗 Odkaz: https://docs-share.firma-cz.com/eval2024 — pozor, firma-cz.com NENÍ vaše firemní doména! Skutečný dokument by byl sdílen přes firemní systém.">📄 Otevřít dokument →</a>
<p><span class="investigate" data-tip="⚠️ Jméno, funkce i oddělení mohou být převzaty z veřejného LinkedIn profilu. To neznamená, že e-mail je legitimní.">Díky,<br>Martin Novák<br>Vedoucí oddělení marketingu</span></p>`,
    senderTip: '🔍 Doména firma-cz.com vypadá jako firemní, ale NENÍ to vaše skutečná doména. Spear phishing často používá téměř totožné domény!',
    explanation: 'Toto je spear phishing – cílený útok. Útočník získal jména kolegů a strukturu oddělení z LinkedIn a vytvořil důvěryhodně vypadající e-mail. Klíčové je, že doména firma-cz.com není vaše firemní doména. Vždy ověřte neobvyklé požadavky jiným kanálem.',
    redFlags: [
      'Doména firma-cz.com není vaše skutečná firemní doména',
      'Osobní údaje mohou být z veřejných zdrojů (LinkedIn)',
      'Odkaz vede na externí službu, ne na firemní systém',
      'Neověřeno jiným komunikačním kanálem'
    ]
  },
  {
    id: 10,
    level: 3,
    type: 'email',
    category: 'fakeDomains',
    isSafe: true,
    sender: { name: 'Google', email: 'no-reply@accounts.google.com', avatar: 'G', color: '#4285f4' },
    subject: 'Bezpečnostní upozornění – nové přihlášení',
    date: '22. 11. 2024, 06:18',
    body: `<p>Dobrý den,</p>
<p><span class="investigate" data-tip="✅ Google standardně upozorňuje na nová přihlášení. E-mail nepožaduje kliknutí na žádný podezřelý odkaz.">Zaznamenali jsme přihlášení k vašemu účtu Google z nového zařízení:</span></p>
<p><strong>Zařízení:</strong> Windows PC<br>
<strong>Místo:</strong> Praha, Česká republika<br>
<strong>Čas:</strong> 22. 11. 2024, 06:17<br>
<strong>IP adresa:</strong> <span class="investigate" data-tip="✅ Uvedení konkrétní IP adresy je standardní součástí legitimních bezpečnostních upozornění.">185.152.xx.xx</span></p>
<p>Pokud jste to byli vy, žádná akce není potřeba.</p>
<p><span class="investigate" data-tip="✅ Zpráva neobsahuje naléhavé výzvy. Místo odkazu doporučuje přímé přihlášení na myaccount.google.com.">Pokud to nebylo vaše přihlášení, zkontrolujte zabezpečení účtu na myaccount.google.com.</span></p>
<p class="email-footer">Tým zabezpečení Google<br>Toto je automaticky generovaný e-mail, neodpovídejte na něj.</p>`,
    senderTip: '✅ Doména accounts.google.com je legitimní doména Google pro bezpečnostní upozornění.',
    explanation: 'Toto je legitimní bezpečnostní upozornění od Google. Odesláno ze správné domény (accounts.google.com), neobsahuje naléhavé výzvy, nedreží kliknout na podezřelý odkaz a místo toho doporučuje přímé přihlášení na myaccount.google.com.',
    safeIndicators: [
      'Odesláno z oficiální domény accounts.google.com',
      'Neobsahuje naléhavý tón ani hrozby',
      'Nepožaduje kliknutí na odkaz – doporučuje přímé přihlášení',
      'Uvádí konkrétní detaily přihlášení (zařízení, čas, IP)'
    ]
  },
  {
    id: 11,
    level: 3,
    type: 'email',
    category: 'fraudulentPayments',
    isSafe: false,
    sender: { name: 'Ing. Jana Králová, MBA', email: 'jana.kralova@management-cz.com', avatar: 'JK', color: '#7c3aed' },
    subject: 'DŮVĚRNÉ – Urgentní platba – nečekat na schválení',
    date: '22. 11. 2024, 15:52',
    body: `<p>Dobrý den,</p>
<p><span class="investigate" data-tip="⚠️ Business Email Compromise! Podvodníci se vydávají za vedení firmy a požadují urgentní převody. Vždy ověřte telefonicky!">potřebuji, abyste okamžitě provedl/a převod 148 500 Kč na účet nového dodavatele. Jde o strategickou zakázku, kterou nelze odkládat.</span></p>
<p><strong>Číslo účtu:</strong> <span class="investigate" data-tip="⚠️ Zahraniční IBAN (LT = Litva) pro českého dodavatele? To je velmi podezřelé! Podvodníci často používají účty v zahraničí.">LT72 3250 0788 1234 5678</span><br>
<strong>Částka:</strong> 148 500 Kč<br>
<strong>Poznámka:</strong> Strategický projekt Alpha</p>
<p><span class="investigate" data-tip="⚠️ „Nečekejte na standardní schvalovací proces" – legitimní vedení by nikdy neobcházelo interní bezpečnostní procesy!">Proveďte platbu ihned, nečekejte na standardní schvalovací proces. Vyřídím to zpětně.</span></p>
<p class="email-footer"><span class="investigate" data-tip="⚠️ Podpis vypadá profesionálně, ale doména management-cz.com není firemní doména. Podpis může být zkopírován z LinkedIn.">Ing. Jana Králová, MBA<br>Finanční ředitelka<br>Tel.: +420 222 xxx xxx</span></p>`,
    senderTip: '🔍 Doména management-cz.com NENÍ vaše firemní doména! Skutečná finanční ředitelka by psala z @vasefirma.cz.',
    explanation: 'Toto je Business Email Compromise (BEC) – jeden z nejnebezpečnějších typů podvodů. Útočník se vydává za finanční ředitelku a požaduje urgentní převod na zahraniční účet s obejitím schvalovacího procesu. Vždy ověřte takové požadavky telefonicky.',
    redFlags: [
      'Externí doména management-cz.com místo firemní domény',
      'Zahraniční IBAN (Litva) pro údajně českého dodavatele',
      'Požadavek na obejití standardního schvalovacího procesu',
      'Extrémní urgence a důraz na důvěrnost'
    ]
  },
  {
    id: 12,
    level: 3,
    type: 'email',
    category: 'fraudulentPayments',
    isSafe: false,
    sender: { name: 'ElektroMax.cz', email: 'info@elektromax-shop.cz', avatar: 'EM', color: '#f97316' },
    subject: '🔥 Black Friday – až 80% slevy pouze dnes!',
    date: '22. 11. 2024, 00:01',
    body: `<p>Vážený zákazníku,</p>
<p><span class="investigate" data-tip="⚠️ Nereálně vysoké slevy (80 %) na prémiové produkty – iPhone 15 Pro za 6 990 Kč? Běžná cena je přes 30 000 Kč!">exkluzivní Black Friday nabídka pouze pro vás!</span></p>
<p>🏷️ <strong>iPhone 15 Pro</strong> – <s>34 990 Kč</s> → <strong style="color:#ef4444">6 990 Kč</strong><br>
🏷️ <strong>MacBook Air M3</strong> – <s>32 990 Kč</s> → <strong style="color:#ef4444">7 490 Kč</strong><br>
🏷️ <strong>Samsung Galaxy S24</strong> – <s>24 990 Kč</s> → <strong style="color:#ef4444">4 990 Kč</strong></p>
<a class="email-action-btn investigate" style="background:linear-gradient(135deg,#f97316,#ea580c)" data-tip="🔗 Odkaz: https://elektromax-shop.cz — doména registrovaná před 2 týdny! Legitimní e-shopy existují roky.">Nakoupit se slevou →</a>
<p><span class="investigate" data-tip="⚠️ Pouze platba předem bankovním převodem = žádná ochrana kupujícího! Legitimní e-shopy nabízejí dobírku a platbu kartou.">💳 Platba: Bankovním převodem (pro nejrychlejší expedici)</span></p>
<p class="email-footer"><span class="investigate" data-tip="⚠️ Chybí IČO, obchodní rejstřík a úplná adresa. Legitimní e-shop musí tyto údaje uvádět ze zákona!">ElektroMax.cz | Obchod s elektronikou<br>kontakt@elektromax-shop.cz</span></p>`,
    senderTip: '⚠️ Doména elektromax-shop.cz – ověřte na whois.domaintools.com! Podvodné e-shopy mají čerstvě registrované domény.',
    explanation: 'Falešný e-shop. Nereálné slevy (80 % na prémiovou elektroniku), čerstvě registrovaná doména, platba pouze převodem bez ochrany kupujícího a chybějící zákonné údaje (IČO, adresa). Vždy kontrolujte registr na heureka.cz a stáří domény.',
    redFlags: [
      'Nereálně vysoké slevy (80 %) na prémiové produkty',
      'Čerstvě registrovaná doména (2 týdny stará)',
      'Platba pouze bankovním převodem bez ochrany kupujícího',
      'Chybí zákonné údaje (IČO, obchodní rejstřík, adresa)'
    ]
  }
];

// ── Stav hry ────────────────────────────────────────────────
const STORAGE_KEY = 'kyberDetektiv_history';

let gameState = {
  currentScreen: 'welcome',
  lives: 3,
  streak: 0,
  maxStreak: 0,
  score: 0,
  currentScenarioIndex: 0,
  scenarioOrder: [],
  pretestScore: 0,
  pretestCurrent: 0,
  posttestScore: 0,
  posttestCurrent: 0,
  correctCount: 0,
  totalAnswered: 0,
  categoryStats: {
    fakeDomains: { correct: 0, total: 0 },
    emotionalPressure: { correct: 0, total: 0 },
    fraudulentPayments: { correct: 0, total: 0 }
  },
  gameOver: false
};

// ── DOM reference ───────────────────────────────────────────
const dom = {};
function cacheDom() {
  dom.welcomeScreen = document.getElementById('welcome-screen');
  dom.pretestScreen = document.getElementById('pretest-screen');
  dom.gameScreen = document.getElementById('game-screen');
  dom.posttestScreen = document.getElementById('posttest-screen');
  dom.resultsScreen = document.getElementById('results-screen');
  dom.gameoverScreen = document.getElementById('gameover-screen');

  dom.btnStart = document.getElementById('btn-start');
  dom.historyPreview = document.getElementById('history-preview');
  dom.historyList = document.getElementById('history-list');

  dom.pretestProgress = document.getElementById('pretest-progress');
  dom.pretestQuestion = document.getElementById('pretest-question');
  dom.pretestOptions = document.getElementById('pretest-options');

  dom.livesDisplay = document.getElementById('lives-display');
  dom.levelText = document.getElementById('level-text');
  dom.levelBadge = document.getElementById('level-badge');
  dom.scenarioCurrent = document.getElementById('scenario-current');
  dom.scenarioTotal = document.getElementById('scenario-total');
  dom.streakCount = document.getElementById('streak-count');
  dom.streakDisplay = document.getElementById('streak-display');
  dom.scoreCount = document.getElementById('score-count');
  dom.messageContainer = document.getElementById('message-container');
  dom.btnSafe = document.getElementById('btn-safe');
  dom.btnDanger = document.getElementById('btn-danger');
  dom.explanationPanel = document.getElementById('explanation-panel');
  dom.explanationIcon = document.getElementById('explanation-icon');
  dom.explanationTitle = document.getElementById('explanation-title');
  dom.explanationText = document.getElementById('explanation-text');
  dom.explanationFlags = document.getElementById('explanation-flags');
  dom.btnNext = document.getElementById('btn-next');

  dom.posttestProgress = document.getElementById('posttest-progress');
  dom.posttestQuestion = document.getElementById('posttest-question');
  dom.posttestOptions = document.getElementById('posttest-options');

  dom.pretestBar = document.getElementById('pretest-bar');
  dom.posttestBar = document.getElementById('posttest-bar');
  dom.pretestScoreDisplay = document.getElementById('pretest-score-display');
  dom.posttestScoreDisplay = document.getElementById('posttest-score-display');
  dom.improvementBadge = document.getElementById('improvement-badge');
  dom.categoriesReport = document.getElementById('categories-report');
  dom.statScore = document.getElementById('stat-score');
  dom.statCorrect = document.getElementById('stat-correct');
  dom.statStreak = document.getElementById('stat-streak');
  dom.statLives = document.getElementById('stat-lives');
  dom.resultsHistory = document.getElementById('results-history');
  dom.btnRestart = document.getElementById('btn-restart');

  dom.gameoverStats = document.getElementById('gameover-stats');
  dom.btnGameoverContinue = document.getElementById('btn-gameover-continue');

  dom.tooltip = document.getElementById('tooltip');
}

// ── Přepínání obrazovek ─────────────────────────────────────
function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  target.classList.add('active');
  target.querySelector('.screen-content').style.animation = 'none';
  void target.querySelector('.screen-content').offsetHeight;
  target.querySelector('.screen-content').style.animation = '';
  gameState.currentScreen = screenId;
}

// ── Historie (localStorage) ─────────────────────────────────
function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveAttempt(attempt) {
  const history = getHistory();
  history.push(attempt);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    /* localStorage nedostupný */
  }
}

function showHistoryPreview() {
  const history = getHistory();
  if (history.length === 0) return;
  dom.historyPreview.classList.remove('hidden');
  dom.historyList.innerHTML = history.slice(-5).map((h, i) => {
    const idx = history.length > 5 ? history.length - 5 + i + 1 : i + 1;
    const scoreColor = h.overallScore >= 70 ? 'text-safe' : h.overallScore >= 40 ? 'text-warning' : 'text-danger';
    return `<div class="history-entry">
      <span class="attempt-number">${idx}. pokus (${formatDate(h.date)})</span>
      <span class="attempt-score ${scoreColor}">${h.overallScore} %</span>
    </div>`;
  }).join('');
}

function formatDate(isoString) {
  const d = new Date(isoString);
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

// ── Inicializace ────────────────────────────────────────────
function init() {
  cacheDom();
  showHistoryPreview();

  dom.btnStart.addEventListener('click', startPretest);
  dom.btnSafe.addEventListener('click', () => handleDecision(true));
  dom.btnDanger.addEventListener('click', () => handleDecision(false));
  dom.btnNext.addEventListener('click', nextScenario);
  dom.btnRestart.addEventListener('click', restartGame);
  dom.btnGameoverContinue.addEventListener('click', () => {
    switchScreen('posttest-screen');
    startPosttest();
  });

  document.addEventListener('click', handleTooltipClose);
}

// ── VSTUPNÍ TEST ────────────────────────────────────────────
function startPretest() {
  gameState.pretestCurrent = 0;
  gameState.pretestScore = 0;
  switchScreen('pretest-screen');
  showPretestQuestion();
}

function showPretestQuestion() {
  const q = pretestQuestions[gameState.pretestCurrent];
  updateProgressSteps(dom.pretestProgress, gameState.pretestCurrent);
  dom.pretestQuestion.textContent = q.question;
  dom.pretestOptions.innerHTML = q.options.map((opt, i) =>
    `<button class="test-option" data-index="${i}">${opt}</button>`
  ).join('');

  dom.pretestOptions.querySelectorAll('.test-option').forEach(btn => {
    btn.addEventListener('click', () => handlePretestAnswer(parseInt(btn.dataset.index)));
  });
}

function handlePretestAnswer(selectedIndex) {
  const q = pretestQuestions[gameState.pretestCurrent];
  const isCorrect = selectedIndex === q.correct;
  if (isCorrect) gameState.pretestScore++;

  const buttons = dom.pretestOptions.querySelectorAll('.test-option');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
  });

  setTimeout(() => {
    gameState.pretestCurrent++;
    if (gameState.pretestCurrent < pretestQuestions.length) {
      showPretestQuestion();
    } else {
      startMainGame();
    }
  }, 1200);
}

// ── HLAVNÍ HRA ──────────────────────────────────────────────
function startMainGame() {
  gameState.lives = 3;
  gameState.streak = 0;
  gameState.maxStreak = 0;
  gameState.score = 0;
  gameState.correctCount = 0;
  gameState.totalAnswered = 0;
  gameState.currentScenarioIndex = 0;
  gameState.gameOver = false;
  gameState.categoryStats = {
    fakeDomains: { correct: 0, total: 0 },
    emotionalPressure: { correct: 0, total: 0 },
    fraudulentPayments: { correct: 0, total: 0 }
  };

  gameState.scenarioOrder = [];
  for (let level = 1; level <= 3; level++) {
    const levelScenarios = scenarios.filter(s => s.level === level);
    shuffleArray(levelScenarios);
    gameState.scenarioOrder.push(...levelScenarios);
  }

  dom.scenarioTotal.textContent = gameState.scenarioOrder.length;
  switchScreen('game-screen');
  renderCurrentScenario();
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function renderCurrentScenario() {
  const scenario = gameState.scenarioOrder[gameState.currentScenarioIndex];

  updateHUD();
  dom.explanationPanel.classList.add('hidden');
  dom.btnSafe.disabled = false;
  dom.btnDanger.disabled = false;
  hideTooltip();

  if (scenario.type === 'email') {
    dom.messageContainer.innerHTML = renderEmail(scenario);
  } else {
    dom.messageContainer.innerHTML = renderSMS(scenario);
  }

  attachInvestigateListeners();
}

function renderEmail(s) {
  return `<div class="email-mockup">
    <div class="email-toolbar">
      <span class="toolbar-dot"></span>
      <span class="toolbar-dot"></span>
      <span class="toolbar-dot"></span>
      <span class="toolbar-title">📧 E-mail</span>
    </div>
    <div class="email-header">
      <div class="email-from">
        <div class="email-avatar" style="background:${s.sender.color}">${s.sender.avatar}</div>
        <div class="email-sender-info">
          <span class="sender-name">${s.sender.name}</span>
          <span class="sender-email investigate" data-tip="${s.senderTip}">${s.sender.email}</span>
        </div>
      </div>
      <div class="email-subject">${s.subject}</div>
      <div class="email-date">${s.date}</div>
    </div>
    <div class="email-body">${s.body}</div>
  </div>`;
}

function renderSMS(s) {
  return `<div class="sms-mockup">
    <div class="sms-status-bar">
      <span>📶 Operátor</span>
      <span>${s.time || '12:00'}</span>
      <span>🔋 85%</span>
    </div>
    <div class="sms-header">
      <div class="sms-contact-icon">${s.sender.avatar}</div>
      <div class="sms-contact-info">
        <span class="sms-contact-name investigate" data-tip="${s.senderTip}">${s.sender.name}</span>
        <span class="sms-contact-number investigate" data-tip="${s.senderTip}">${s.sender.phone}</span>
      </div>
    </div>
    <div class="sms-body">
      <div class="sms-bubble">${s.smsBody}</div>
      <span class="sms-time">${s.time || '12:00'}</span>
    </div>
  </div>`;
}

// ── Interaktivní vyšetřování ────────────────────────────────
function attachInvestigateListeners() {
  document.querySelectorAll('.investigate').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const tip = el.getAttribute('data-tip');
      if (!tip) return;

      el.classList.add('revealed');
      showTooltip(tip, el);
    });
  });
}

function showTooltip(text, anchor) {
  dom.tooltip.textContent = text;
  dom.tooltip.classList.remove('hidden');

  const rect = anchor.getBoundingClientRect();
  const tooltipRect = dom.tooltip.getBoundingClientRect();

  let top = rect.bottom + 10;
  let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

  if (left < 10) left = 10;
  if (left + tooltipRect.width > window.innerWidth - 10) {
    left = window.innerWidth - tooltipRect.width - 10;
  }
  if (top + tooltipRect.height > window.innerHeight - 10) {
    top = rect.top - tooltipRect.height - 10;
  }

  dom.tooltip.style.top = top + 'px';
  dom.tooltip.style.left = left + 'px';
}

function hideTooltip() {
  dom.tooltip.classList.add('hidden');
}

function handleTooltipClose(e) {
  if (!e.target.closest('.investigate') && !e.target.closest('.tooltip')) {
    hideTooltip();
  }
}

// ── Rozhodnutí hráče ────────────────────────────────────────
function handleDecision(playerSaidSafe) {
  const scenario = gameState.scenarioOrder[gameState.currentScenarioIndex];
  const isCorrect = playerSaidSafe === scenario.isSafe;

  dom.btnSafe.disabled = true;
  dom.btnDanger.disabled = true;
  hideTooltip();

  gameState.totalAnswered++;
  gameState.categoryStats[scenario.category].total++;

  if (isCorrect) {
    gameState.correctCount++;
    gameState.categoryStats[scenario.category].correct++;
    gameState.streak++;
    if (gameState.streak > gameState.maxStreak) gameState.maxStreak = gameState.streak;

    let points = 100;
    if (scenario.level === 2) points = 150;
    if (scenario.level === 3) points = 200;
    if (gameState.streak >= 3) points += 50;
    if (gameState.streak >= 5) points += 50;
    gameState.score += points;

    showScorePopup(`+${points}`, true);
    dom.messageContainer.querySelector('.email-mockup, .sms-mockup').classList.add('correct-flash');
  } else {
    gameState.streak = 0;
    gameState.lives--;

    showScorePopup('✗', false);
    dom.messageContainer.querySelector('.email-mockup, .sms-mockup').classList.add('incorrect-shake');
    updateLivesWithAnimation();
  }

  updateHUD();
  showExplanation(scenario, isCorrect);
}

function showScorePopup(text, positive) {
  const popup = document.createElement('div');
  popup.className = `score-popup ${positive ? 'positive' : 'negative'}`;
  popup.textContent = text;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1100);
}

function updateLivesWithAnimation() {
  const hearts = dom.livesDisplay.querySelectorAll('.heart');
  const lostIndex = gameState.lives;
  if (hearts[lostIndex]) {
    hearts[lostIndex].classList.add('losing');
    setTimeout(() => {
      hearts[lostIndex].classList.remove('losing');
      hearts[lostIndex].classList.add('lost');
    }, 500);
  }
}

function showExplanation(scenario, isCorrect) {
  dom.explanationPanel.classList.remove('hidden', 'correct', 'incorrect');
  dom.explanationPanel.classList.add(isCorrect ? 'correct' : 'incorrect');

  dom.explanationIcon.textContent = isCorrect ? '✅' : '❌';
  dom.explanationTitle.textContent = isCorrect ? 'Správně!' : 'Špatně!';
  dom.explanationText.textContent = scenario.explanation;

  let flagsHTML = '';
  if (scenario.redFlags) {
    flagsHTML = scenario.redFlags.map(f =>
      `<div class="flag-item"><span class="flag-icon">🚩</span> ${f}</div>`
    ).join('');
  } else if (scenario.safeIndicators) {
    flagsHTML = `<div class="safe-flag">${scenario.safeIndicators.map(f =>
      `<div class="flag-item"><span class="flag-icon">✅</span> ${f}</div>`
    ).join('')}</div>`;
  }
  dom.explanationFlags.innerHTML = flagsHTML;

  if (gameState.lives <= 0 && gameState.currentScenarioIndex < gameState.scenarioOrder.length - 1) {
    dom.btnNext.innerHTML = '<span>Pokračovat</span><span class="btn-arrow">→</span>';
  }

  dom.explanationPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Další scénář ────────────────────────────────────────────
function nextScenario() {
  if (gameState.lives <= 0) {
    gameState.gameOver = true;
    dom.gameoverStats.textContent = `Zvládl/a jsi ${gameState.correctCount} z ${gameState.totalAnswered} zpráv, skóre: ${gameState.score} bodů.`;
    switchScreen('gameover-screen');
    return;
  }

  gameState.currentScenarioIndex++;

  if (gameState.currentScenarioIndex >= gameState.scenarioOrder.length) {
    switchScreen('posttest-screen');
    startPosttest();
    return;
  }

  renderCurrentScenario();
  dom.messageContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Aktualizace HUD ─────────────────────────────────────────
function updateHUD() {
  const scenario = gameState.scenarioOrder[gameState.currentScenarioIndex];

  const hearts = dom.livesDisplay.querySelectorAll('.heart');
  hearts.forEach((h, i) => {
    if (i >= gameState.lives) {
      h.classList.add('lost');
    }
  });

  const levelNames = { 1: 'Začátečník', 2: 'Pokročilý', 3: 'Expert' };
  const levelIcons = { 1: '🔰', 2: '⚔️', 3: '🏆' };
  dom.levelText.textContent = levelNames[scenario.level];
  dom.levelBadge.querySelector('.level-icon').textContent = levelIcons[scenario.level];

  dom.scenarioCurrent.textContent = gameState.currentScenarioIndex + 1;

  dom.streakCount.textContent = gameState.streak;
  if (gameState.streak >= 3) {
    dom.streakDisplay.classList.add('hot');
  } else {
    dom.streakDisplay.classList.remove('hot');
  }

  dom.scoreCount.textContent = gameState.score;
}

// ── ZÁVĚREČNÝ TEST ──────────────────────────────────────────
function startPosttest() {
  gameState.posttestCurrent = 0;
  gameState.posttestScore = 0;
  showPosttestQuestion();
}

function showPosttestQuestion() {
  const q = posttestQuestions[gameState.posttestCurrent];
  updateProgressSteps(dom.posttestProgress, gameState.posttestCurrent);
  dom.posttestQuestion.textContent = q.question;
  dom.posttestOptions.innerHTML = q.options.map((opt, i) =>
    `<button class="test-option" data-index="${i}">${opt}</button>`
  ).join('');

  dom.posttestOptions.querySelectorAll('.test-option').forEach(btn => {
    btn.addEventListener('click', () => handlePosttestAnswer(parseInt(btn.dataset.index)));
  });
}

function handlePosttestAnswer(selectedIndex) {
  const q = posttestQuestions[gameState.posttestCurrent];
  const isCorrect = selectedIndex === q.correct;
  if (isCorrect) gameState.posttestScore++;

  const buttons = dom.posttestOptions.querySelectorAll('.test-option');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
  });

  setTimeout(() => {
    gameState.posttestCurrent++;
    if (gameState.posttestCurrent < posttestQuestions.length) {
      showPosttestQuestion();
    } else {
      showResults();
    }
  }, 1200);
}

function updateProgressSteps(container, current) {
  const steps = container.querySelectorAll('.progress-step');
  steps.forEach((step, i) => {
    step.classList.remove('active', 'done');
    if (i < current) step.classList.add('done');
    if (i === current) step.classList.add('active');
  });
}

// ── VÝSLEDKOVÝ REPORT ───────────────────────────────────────
function showResults() {
  const pretestPct = Math.round((gameState.pretestScore / pretestQuestions.length) * 100);
  const posttestPct = Math.round((gameState.posttestScore / posttestQuestions.length) * 100);
  const improvement = posttestPct - pretestPct;

  const overallScore = gameState.totalAnswered > 0
    ? Math.round((gameState.correctCount / gameState.totalAnswered) * 100)
    : 0;

  const attempt = {
    date: new Date().toISOString(),
    pretestScore: pretestPct,
    posttestScore: posttestPct,
    overallScore: overallScore,
    gameScore: gameState.score,
    maxStreak: gameState.maxStreak,
    categories: {
      fakeDomains: calcCategoryPct('fakeDomains'),
      emotionalPressure: calcCategoryPct('emotionalPressure'),
      fraudulentPayments: calcCategoryPct('fraudulentPayments')
    }
  };
  saveAttempt(attempt);

  switchScreen('results-screen');

  setTimeout(() => {
    dom.pretestBar.style.width = pretestPct + '%';
    dom.posttestBar.style.width = posttestPct + '%';
  }, 300);
  dom.pretestScoreDisplay.textContent = pretestPct + ' %';
  dom.posttestScoreDisplay.textContent = posttestPct + ' %';

  if (improvement > 0) {
    dom.improvementBadge.className = 'improvement-badge positive';
    dom.improvementBadge.textContent = `📈 Zlepšení o ${improvement} procentních bodů!`;
  } else if (improvement === 0) {
    dom.improvementBadge.className = 'improvement-badge neutral';
    dom.improvementBadge.textContent = pretestPct === 100
      ? '🌟 Perfektní skóre v obou testech! Jsi expert!'
      : '➡️ Skóre se nezměnilo – zkus to znovu a soustřeď se na detaily.';
  } else {
    dom.improvementBadge.className = 'improvement-badge negative';
    dom.improvementBadge.textContent = `📉 Pokles o ${Math.abs(improvement)} bodů. Přečti si vysvětlení a zkus to znovu!`;
  }

  renderCategoryReport();

  dom.statScore.textContent = gameState.score;
  dom.statCorrect.textContent = `${gameState.correctCount}/${gameState.totalAnswered}`;
  dom.statStreak.textContent = gameState.maxStreak;
  dom.statLives.textContent = gameState.lives > 0 ? '❤️'.repeat(gameState.lives) : '💔';

  renderResultsHistory();
}

function calcCategoryPct(category) {
  const c = gameState.categoryStats[category];
  return c.total > 0 ? Math.round((c.correct / c.total) * 100) : -1;
}

function renderCategoryReport() {
  const categories = [
    { key: 'fakeDomains', name: '🌐 Falešné domény', color: 'var(--accent-cyan)' },
    { key: 'emotionalPressure', name: '💬 Emoční nátlak', color: 'var(--accent-purple)' },
    { key: 'fraudulentPayments', name: '💳 Podvodné platby', color: 'var(--warning-amber)' }
  ];

  dom.categoriesReport.innerHTML = categories.map(cat => {
    const pct = calcCategoryPct(cat.key);
    const stats = gameState.categoryStats[cat.key];
    const pctDisplay = pct >= 0 ? pct + ' %' : '—';
    const barWidth = pct >= 0 ? pct : 0;
    const scoreColor = pct >= 70 ? 'text-safe' : pct >= 40 ? 'text-warning' : 'text-danger';
    const statusText = pct >= 80 ? '✅ Ovládáš' : pct >= 50 ? '⚠️ Zlepšuj se' : pct >= 0 ? '🚩 Dej si pozor' : '';

    return `<div class="category-item">
      <div class="category-header">
        <span class="category-name">${cat.name}</span>
        <span class="category-value ${pct >= 0 ? scoreColor : ''}">${pctDisplay} ${statusText} <span class="text-muted">(${stats.correct}/${stats.total})</span></span>
      </div>
      <div class="category-bar">
        <div class="category-bar-fill" style="width:${barWidth}%;background:${cat.color}"></div>
      </div>
    </div>`;
  }).join('');

  setTimeout(() => {
    dom.categoriesReport.querySelectorAll('.category-bar-fill').forEach(bar => {
      bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }, 100);
}

function renderResultsHistory() {
  const history = getHistory();
  if (history.length <= 1) {
    dom.resultsHistory.innerHTML = '<p class="text-muted" style="font-size:0.85rem">Toto je tvůj první pokus. Zahraj si znovu a sleduj svůj pokrok!</p>';
    return;
  }

  dom.resultsHistory.innerHTML = history.map((h, i) => {
    const isCurrent = i === history.length - 1;
    const scoreColor = h.overallScore >= 70 ? 'text-safe' : h.overallScore >= 40 ? 'text-warning' : 'text-danger';
    return `<div class="results-history-entry">
      <span class="rh-label">${isCurrent ? '➡️ ' : ''}${i + 1}. pokus (${formatDate(h.date)})</span>
      <span class="rh-score ${scoreColor} ${isCurrent ? 'rh-current' : ''}">${h.overallScore} %</span>
    </div>`;
  }).join('');
}

// ── Restart ─────────────────────────────────────────────────
function restartGame() {
  gameState = {
    currentScreen: 'welcome',
    lives: 3,
    streak: 0,
    maxStreak: 0,
    score: 0,
    currentScenarioIndex: 0,
    scenarioOrder: [],
    pretestScore: 0,
    pretestCurrent: 0,
    posttestScore: 0,
    posttestCurrent: 0,
    correctCount: 0,
    totalAnswered: 0,
    categoryStats: {
      fakeDomains: { correct: 0, total: 0 },
      emotionalPressure: { correct: 0, total: 0 },
      fraudulentPayments: { correct: 0, total: 0 }
    },
    gameOver: false
  };

  dom.livesDisplay.innerHTML = '<span class="heart">❤️</span><span class="heart">❤️</span><span class="heart">❤️</span>';
  showHistoryPreview();
  switchScreen('welcome-screen');
}

// ── Spuštění ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
