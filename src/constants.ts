/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZodiacSign } from "./types";

export const IMAGE_ROOT = "https://tudoprahoje.site/anjo/img/";

export const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: "aries", name: "Aries", image: `${IMAGE_ROOT}aries.png`, startMonth: 2, startDay: 21, endMonth: 3, endDay: 19 },
  { id: "touro", name: "Touro", image: `${IMAGE_ROOT}touro.png`, startMonth: 3, startDay: 20, endMonth: 4, endDay: 20 },
  { id: "gemeos", name: "Gêmeos", image: `${IMAGE_ROOT}gemeos.png`, startMonth: 4, startDay: 21, endMonth: 5, endDay: 20 },
  { id: "cancer", name: "Câncer", image: `${IMAGE_ROOT}cancer.png`, startMonth: 5, startDay: 21, endMonth: 6, endDay: 22 },
  { id: "leao", name: "Leão", image: `${IMAGE_ROOT}leao.png`, startMonth: 6, startDay: 23, endMonth: 7, endDay: 22 },
  { id: "virgem", name: "Virgem", image: `${IMAGE_ROOT}virgem.png`, startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { id: "libra", name: "Libra", image: `${IMAGE_ROOT}libra.png`, startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { id: "escorpiao", name: "Escorpião", image: `${IMAGE_ROOT}escorpiao.png`, startMonth: 9, startDay: 23, endMonth: 10, endDay: 21 },
  { id: "sagitario", name: "Sagitário", image: `${IMAGE_ROOT}sagitario.png`, startMonth: 10, startDay: 22, endMonth: 11, endDay: 21 },
  { id: "capricornio", name: "Capricórnio", image: `${IMAGE_ROOT}capricornio.png`, startMonth: 11, startDay: 22, endMonth: 0, endDay: 19 },
  { id: "aquario", name: "Aquário", image: `${IMAGE_ROOT}aquario.png`, startMonth: 0, startDay: 20, endMonth: 1, endDay: 18 },
  { id: "peixes", name: "Peixes", image: `${IMAGE_ROOT}peixes.png`, startMonth: 1, startDay: 19, endMonth: 2, endDay: 20 },
];

export const DECADES = [1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];

export const MARITAL_STATUSES = [
  "Casado(a)", "Namorando", "Noivo(a)", "Solteiro(a)", "Separado(a)", "Viúvo(a)"
];

export const CHALLENGES = [
  "Vida Amorosa", "Finanças", "Saúde", "Felicidadee"
];

export const GENDERS = ["Masculino", "Feminino"];
