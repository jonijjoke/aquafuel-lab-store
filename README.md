Aquafuel Lab - Full-stack Verkkokauppaprojekti

Tämä projekti on oma harjoitustyö, jossa tavoitteena oli harjoitella rakentamaan moderni ja skaalautuva verkkokauppasivusto. Tarkoituksena oli oppia front- ja back-endin salat.
Projektin pohjana on käytetty JSMasteryn verkkokauppatutoriaalia, mutta sovellusta on kustomoitu ja tehty kuvitteellisen Aquafuel Lab -brändin mukaiseksi.
Sovellus ei ole aivan täysin viimeistelty, joten jotkut ominaisuudet puuttuvat.

🛠️ Tekninen toteutus ja ominaisuudet

Sovelluksessa on toteutettu seuraavat tekniset ominaisuudet:

- Dynaaminen datanhaku: Tuotetiedot ja kuvamateriaalit haetaan Sanity.io Headless CMS -järjestelmästä.
- Globaali tilanhallinta: Ostoskorin logiikka ja tuotemäärien päivitys on toteutettu React Context API:lla, mikä mahdollistaa    tilan hallinnan koko sovelluksessa.
- Maksuintegraatio: Maksunvälitys on toteutettu Stripe Embedded Checkout ratkaisulla.
- Responsiivisuus: Navbarissa kustomoitu scrollaus, tuotekaruselli ja tuotteen korostus kursorin kohdalla.

🏗️ Teknologiat

- Frontend: Next.js & React
- Sisällönhallinta: Sanity
- Maksut: Stripe
- Ulkoasu: Custom CSS

📁 Sovelluksen rakenne

Projektissa on painotettu selkeää rakennetta:

- Navbar.jsx: Navigointi ja tilan seuranta.
- ProductDetailsClient.jsx: Tuotesivun asiakaspuolen logiikka ja hallinta.
- Cart.jsx: Ostoskorin hallintaan.
- Layout.jsx: Sovelluksen yleinen rakenne.

🚀 Käyttöönotto

- Kloonaa repo: git clone https://github.com/jonijjoke/aquafuel-lab-store.git.
- Asenna riippuvuudet: npm install
- Lisää .env.local -tiedosto ja määritä tarvittavat API-avaimet (Sanity & Stripe).
- Käynnistä kehityspalvelin: npm run dev

🧠 Mitä opin

Tämä harjoitusprojekti syvensi osaamistani ja oli todella hyvä harjoitus näillä osa-alueilla:

- Full-stack: Opin hallitsemaan kolmannen osapuolen API:en (Sanity, Stripe) ja käyttöliittymän välillä.
- Tietoturva: Ymmärrys ympäristömuuttujien (.env) kriittisyydestä ja salaisten avainten suojaamisesta.
- Tilanhallinta: Monimutkaisen ostoskorilogiikan rakentaminen. 



