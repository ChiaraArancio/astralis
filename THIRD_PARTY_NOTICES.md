# Third-party notices

Astralis utilise des logiciels et des données open source. Les notices ci-dessous sont fournies par courtoisie et ne remplacent pas les licences complètes des projets concernés.

## MIT License (texte commun)

Copyright (c) les auteurs respectifs listés ci-dessous.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Composants concernés

- **Astronomy Engine** — © Don Cross — MIT. https://github.com/cosinekitty/astronomy
- **free-human-design** — © 2026 Adam Blvck / Blvck Studios — MIT. https://github.com/adamblvck/free-human-design
- **city-timezones** — contributeurs du projet — MIT. Les données de villes intégrées à `src/lib/geo/cities.ts` en sont dérivées.
- **React, React DOM, React Router, Vite, Tailwind CSS, Lucide, Vitest, Testing Library** — licences open source respectives (MIT / Apache-2.0 / ISC selon les projets).
- **Plus Jakarta Sans** — © Tokotype — SIL Open Font License 1.1, distribué via Fontsource.
- **Noto Sans Symbols** — © Google — SIL Open Font License 1.1, distribué via Fontsource.

## Données astronomiques

Les positions planétaires sont calculées à la volée par Astronomy Engine. Aucun fichier d’éphéméride propriétaire n’est redistribué. Swiss Ephemeris n’est pas inclus.

## Données de villes

La liste locale de villes est une sélection dérivée de `city-timezones` (MIT), complétée à l’exécution par l’API de géocodage Open-Meteo. Les coordonnées peuvent être approximatives ; l’utilisateur peut saisir ses coordonnées manuellement.
