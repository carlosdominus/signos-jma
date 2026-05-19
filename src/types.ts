/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ZodiacSign {
  id: string;
  name: string;
  image: string;
  startMonth: number; // 0-indexed
  startDay: number;
  endMonth: number;
  endDay: number;
}

export type MaritalStatus = 
  | "Casado(a)"
  | "Namorando"
  | "Noivo(a)"
  | "Solteiro(a)"
  | "Separado(a)"
  | "Viúvo(a)";

export type LifeChallenge =
  | "Vida Amorosa"
  | "Finanças"
  | "Saúde"
  | "Felicidadee";

export type Gender = "Masculino" | "Feminino";

export interface FunnelState {
  currentStep: number;
  sign?: ZodiacSign;
  birthDay?: number;
  birthMonth?: number;
  decade?: number;
  year?: number;
  maritalStatus?: MaritalStatus;
  challenge?: LifeChallenge;
  gender?: Gender;
  firstName?: string;
  email?: string;
  angelName?: string;
  angelImage?: string;
}
