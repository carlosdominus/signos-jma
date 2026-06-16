/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, ChevronLeft, Lock, Play, Pause, Send } from "lucide-react";
import { 
  ZODIAC_SIGNS, 
  IMAGE_ROOT, 
  DECADES, 
  MARITAL_STATUSES, 
  CHALLENGES, 
  GENDERS,
  MONTH_NAMES,
} from "./constants";
import { 
  FunnelState, 
  ZodiacSign, 
  MaritalStatus, 
  LifeChallenge, 
  Gender 
} from "./types";

export default function App() {
  const [state, setState] = useState<FunnelState>({
    currentStep: 1,
  });

  const nextStep = (updates: Partial<FunnelState>) => {
    setState((prev) => ({ ...prev, ...updates, currentStep: prev.currentStep + 1 }));
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }));
  };

  const progress = (state.currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-[#07132a] text-white font-sans relative overflow-x-hidden selection:bg-yellow-400 selection:text-blue-900">
      {/* Background Image - Essential for the look */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${IMAGE_ROOT}fundo.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-5 py-4 flex flex-col min-h-screen">
        {state.currentStep <= 4 && (
          <>
            {/* Header Alert - More Compact */}
            <div className="bg-red-600/90 backdrop-blur-md rounded-xl py-2 px-6 flex items-center justify-center gap-2 mb-4 shadow-[0_0_15px_rgba(220,38,38,0.3)] border border-red-500/50 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-white/90" strokeWidth={2.5} />
              <span className="text-white font-black uppercase tracking-wider text-[10px] md:text-xs">Alerta Vibracional</span>
              <AlertTriangle className="w-4 h-4 text-white/90" strokeWidth={2.5} />
            </div>

            {/* Title Section - More Compact Fonts */}
            <div className="text-center mb-4">
              <h1 className="text-[22px] md:text-[26px] font-extrabold mb-2 leading-tight text-blue-100 tracking-tight drop-shadow-lg">
                Seu Anjo está tentando falar, mas seu rádio está desligado?
              </h1>
              <p className="text-sm md:text-base text-blue-200/80 font-medium max-w-[90%] mx-auto leading-tight">
                Este teste de 30 segundos te revela seu Anjo da Guarda e te sintoniza com ele
              </p>
            </div>

            {/* Progress Bar - More Compact */}
            <div className="mb-6">
              <div className="flex justify-center mb-1">
                <span className="text-[9px] text-blue-300 font-bold tracking-widest uppercase opacity-70">
                  Passo {state.currentStep} de 4
                </span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-500 via-yellow-200 to-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </>
        )}

        {/* Steps Container */}
        <div className="flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex-grow flex flex-col"
            >
              {state.currentStep === 1 && (
                <Step1 
                  onSelect={(sign, day, month) => nextStep({ sign, birthDay: day, birthMonth: month })} 
                />
              )}
              {state.currentStep === 2 && (
                <Step2 
                  onSelect={(decade, year) => nextStep({ decade, year })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 3 && (
                <Step3 
                  onSelect={(status, challenge) => nextStep({ maritalStatus: status, challenge })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 4 && (
                <Step4 
                  onSelect={(gender, name) => nextStep({ gender, firstName: name })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 5 && (
                <LoadingStep onComplete={() => setState(prev => ({ ...prev, currentStep: 6 }))} />
              )}
              {state.currentStep === 6 && (
                <VSLStep />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {state.currentStep <= 4 && (
          /* Footer Privacy - More Compact */
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">
                  <Lock className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-[10px] text-left max-w-[200px]">
                  <p className="font-extrabold text-yellow-500 uppercase tracking-wider">Privacidade Garantida:</p>
                  <p className="text-blue-100/60 font-medium leading-tight">Suas respostas são 100% anônimas e confidenciais.</p>
              </div>
            </div>
            <p className="text-center text-[9px] text-blue-200/20 max-w-[280px] mx-auto uppercase tracking-widest font-semibold">
              Mais de 50.638 pessoas já descobriram qual é o seu anjo através deste teste.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Step Components ---

function VSLStep() {
  useEffect(() => {
    // Inject Vturb script
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/853c4f04-8442-44da-b89d-0541d78036bb/ab-test/69eedc3979a9b357d912fa23/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Clean up if component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full py-4 space-y-6">
      <div className="text-center px-2">
        <h2 className="text-xl md:text-2xl font-black text-blue-100 leading-tight mb-2 drop-shadow-lg">
          O poderoso Canto de São Miguel para Restaurar Saúde e Obter Riqueza foi liberado!
        </h2>
        <p className="text-yellow-400 font-bold uppercase tracking-widest text-xs md:text-sm animate-bounce">
          Assista para ter acesso👇
        </p>
      </div>

      <div className="bg-blue-500/10 backdrop-blur-xl border border-white/10 rounded-[30px] p-2 overflow-hidden shadow-2xl shadow-blue-500/20">
        {/* @ts-ignore - custom element from vturb */}
        <vturb-smartplayer 
          id="ab-69eedc3979a9b357d912fa23" 
          style={{ display: "block", margin: "0 auto", width: "100%" }}
        />
      </div>
      
      <p className="text-center text-blue-200/60 text-xs italic">
        Assista ao vídeo até o final para sintonizar sua vibração.
      </p>
    </div>
  );
}

function ImagePreloader() {
  const extraImages = [
    "felicidade.png", "saude.png", "finanças.png", "vidaamorosa.png",
    "viuvo.png", "separado.png", "solteiro.png", "noivo.png",
    "namorando.png", "casado.png", "female.png", "masculine.png"
  ];

  return (
    <div className="fixed opacity-0 pointer-events-none -z-50 overflow-hidden w-0 h-0">
      {ZODIAC_SIGNS.map(sign => (
        <img key={sign.id} src={sign.image} alt="" loading="eager" />
      ))}
      <img src={`${IMAGE_ROOT}fundo.png`} alt="" loading="eager" />
      {extraImages.map(img => (
        <img key={img} src={`${IMAGE_ROOT}${img}`} alt="" loading="eager" />
      ))}
    </div>
  );
}

function Step1({ onSelect }: { onSelect: (sign: ZodiacSign, day: number, month: number) => void }) {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | undefined>(ZODIAC_SIGNS[0]);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(undefined);

  const handleDaySelect = (day: number, month: number) => {
    setSelectedDay(day);
    setSelectedMonth(month);
  };

  const renderMonth = (monthIndex: number, startDay: number, endDay: number) => {
    const days = [];
    for (let i = startDay; i <= endDay; i++) {
        days.push(i);
    }

    return (
      <div key={monthIndex} className="w-full">
        <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-400/10 py-1 px-4 rounded-xl mb-2">
          <h4 className="text-center font-extrabold text-xs tracking-tight uppercase text-blue-200">{MONTH_NAMES[monthIndex]}</h4>
        </div>
        <div className="grid grid-cols-7 gap-1.5 justify-center">
          {days.map(day => {
            const isSel = selectedDay === day && selectedMonth === monthIndex;
            return (
              <button
                 key={day}
                 onClick={() => handleDaySelect(day, monthIndex)}
                 className={`font-extrabold py-2 rounded-lg shadow-md transition-all active:scale-90 text-[11px] md:text-sm ${
                   isSel 
                     ? "bg-yellow-400 text-blue-950 ring-2 ring-yellow-200" 
                     : "bg-white text-blue-900 hover:bg-blue-50"
                 }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const getMaxDays = (month: number) => new Date(2024, month + 1, 0).getDate();

  return (
    <div className="flex flex-col items-center">
      <ImagePreloader />
      
      <div className="mb-4 text-center">
        <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 1 de 2: Signo</span>
        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">
          Qual é o seu signo?
        </h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2 w-full mb-6">
        {ZODIAC_SIGNS.map((sign, index) => {
          const isSel = selectedSign?.id === sign.id;
          return (
            <button
              key={sign.id}
              onClick={() => {
                setSelectedSign(sign);
                setSelectedDay(undefined);
                setSelectedMonth(undefined);
              }}
              className={`group relative flex flex-col items-center justify-center rounded-xl p-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:ring-2 hover:ring-yellow-400 transition-all hover:scale-[1.03] active:scale-95 duration-350 ${
                isSel ? "ring-2 ring-yellow-400 bg-blue-900/40" : "bg-white"
              }`}
            >
              <img 
                src={sign.image} 
                alt={sign.name} 
                className="w-8 h-8 object-contain mb-1 group-hover:scale-105 transition-transform duration-300" 
                referrerPolicy="no-referrer"
              />
              <span className={`font-extrabold text-[8px] uppercase text-center tracking-tight leading-tight ${
                isSel ? "text-yellow-400" : "text-blue-900"
              }`}>{sign.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedSign && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full space-y-4 mb-6 border-t border-white/5 pt-4"
          >
            <div className="text-center">
              <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 2 de 2: Dia</span>
              <h3 className="text-sm font-bold uppercase tracking-tight text-blue-200">
                Selecione o Dia do seu Nascimento:
              </h3>
            </div>
            
            <div className="space-y-4 w-full">
              {renderMonth(selectedSign.startMonth, selectedSign.startDay, getMaxDays(selectedSign.startMonth))}
              {renderMonth(selectedSign.endMonth, 1, selectedSign.endDay)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => selectedSign && selectedDay !== undefined && selectedMonth !== undefined && onSelect(selectedSign, selectedDay, selectedMonth)}
        disabled={!selectedSign || selectedDay === undefined}
        className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-blue-950 font-black py-4 rounded-xl shadow-[0_4px_15px_rgba(234,179,8,0.3)] transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none uppercase tracking-wider text-sm text-center"
      >
        Continuar para o Próximo Passo
      </button>
    </div>
  );
}

function Step2({ onSelect, onBack }: { onSelect: (decade: number, year: number) => void, onBack: () => void }) {
  const [selectedDecade, setSelectedDecade] = useState<number | undefined>(1980);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

  const years = selectedDecade ? Array.from({ length: 10 }, (_, i) => selectedDecade + i) : [];

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4 w-full">
        <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 1 de 2: Década</span>
        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Qual Década Você Nasceu?</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2 w-full mb-6">
        {DECADES.map(decade => {
          const isSel = selectedDecade === decade;
          return (
            <button
              key={decade}
              onClick={() => {
                setSelectedDecade(decade);
                setSelectedYear(undefined);
              }}
              className={`font-extrabold py-3 rounded-xl shadow-md transition-all text-sm ${
                isSel ? "bg-yellow-400 text-blue-950 ring-2 ring-yellow-250" : "bg-white text-blue-900 hover:bg-blue-50"
              }`}
            >
              {decade}s
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedDecade && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full space-y-3 mb-6 border-t border-white/5 pt-4"
          >
            <div className="text-center">
              <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 2 de 2: Ano</span>
              <h3 className="text-sm font-bold uppercase tracking-tight text-blue-200 mb-2">Em qual Ano específico?</h3>
            </div>
            
            <div className="grid grid-cols-5 gap-2 w-full">
              {years.map(year => {
                const isSel = selectedYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`font-extrabold py-2.5 rounded-lg shadow-md transition-all text-xs ${
                      isSel ? "bg-yellow-400 text-blue-950 ring-2 ring-yellow-200" : "bg-white text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => selectedDecade && selectedYear && onSelect(selectedDecade, selectedYear)}
        disabled={!selectedDecade || !selectedYear}
        className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-blue-950 font-black py-4 rounded-xl shadow-[0_4px_15px_rgba(234,179,8,0.3)] transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none uppercase tracking-wider text-sm text-center"
      >
        Continuar para o Próximo Passo
      </button>

      <BackButton onClick={onBack} />
    </div>
  );
}

function Step3({ onSelect, onBack }: { onSelect: (status: MaritalStatus, challenge: LifeChallenge) => void, onBack: () => void }) {
  const [selectedStatus, setSelectedStatus] = useState<MaritalStatus | undefined>(undefined);
  const [selectedChallenge, setSelectedChallenge] = useState<LifeChallenge | undefined>(undefined);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4 w-full">
        <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 1 de 2: Relacionamento</span>
        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Qual É O Seu Estado Civil?</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2 w-full mb-6">
        {MARITAL_STATUSES.map(status => {
          const isSel = selectedStatus === status;
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as MaritalStatus)}
              className={`flex flex-col items-center justify-center border p-3 rounded-xl transition-all group duration-300 ${
                isSel 
                  ? "bg-yellow-400/20 border-yellow-400 ring-1 ring-yellow-400" 
                  : "bg-blue-500/5 border-white/5 hover:bg-blue-500/10 hover:border-white/15"
              }`}
            >
              <div className="mb-1 transform group-hover:scale-110 transition-transform duration-300">
                 <StatusIcon status={status as MaritalStatus} />
              </div>
              <span className={`font-black text-[9px] uppercase tracking-tight ${isSel ? "text-yellow-400" : "text-blue-100"}`}>{status}</span>
            </button>
          );
        })}
      </div>

      <div className="text-center mb-4 w-full border-t border-white/5 pt-4">
        <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 2 de 2: Desafio</span>
        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Qual É O Seu Maior Desafio Atualmente?</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        {CHALLENGES.map(challenge => {
          const isSel = selectedChallenge === challenge;
          return (
            <button
              key={challenge}
              onClick={() => setSelectedChallenge(challenge as LifeChallenge)}
              className={`flex flex-col items-center justify-center border py-4 rounded-xl transition-all group duration-300 ${
                isSel 
                  ? "bg-yellow-400/20 border-yellow-400 ring-1 ring-yellow-400" 
                  : "bg-blue-500/5 border-white/5 hover:bg-blue-500/10 hover:border-white/15"
              }`}
            >
              <div className="mb-1.5 transform group-hover:scale-110 transition-transform duration-300">
                 <ChallengeIcon challenge={challenge as LifeChallenge} />
              </div>
              <span className={`font-black text-xs uppercase tracking-tight ${isSel ? "text-yellow-400" : "text-blue-100"}`}>{challenge}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => selectedStatus && selectedChallenge && onSelect(selectedStatus, selectedChallenge)}
        disabled={!selectedStatus || !selectedChallenge}
        className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-blue-950 font-black py-4 rounded-xl shadow-[0_4px_15px_rgba(234,179,8,0.3)] transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none uppercase tracking-wider text-sm text-center"
      >
        Continuar para o Próximo Passo
      </button>

      <BackButton onClick={onBack} />
    </div>
  );
}

function Step4({ onSelect, onBack }: { onSelect: (gender: Gender, name: string) => void, onBack: () => void }) {
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>(undefined);
  const [name, setName] = useState("");

  const isComplete = selectedGender !== undefined && name.trim().length >= 2;

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-4 w-full">
        <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 1 de 2: Gênero</span>
        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Qual É O Seu Sexo?</h3>
      </div>
      
      <div className="flex gap-4 w-full max-w-[280px] mb-6 justify-center">
        {GENDERS.map(gender => {
          const isSel = selectedGender === gender;
          return (
            <button
              key={gender}
              onClick={() => setSelectedGender(gender as Gender)}
              className={`flex flex-col items-center justify-center py-4 px-6 rounded-2xl shadow-xl transition-all group active:scale-95 duration-350 w-28 ${
                isSel 
                  ? "bg-yellow-400 ring-2 ring-yellow-200 scale-105" 
                  : "bg-white hover:bg-slate-50"
              }`}
            >
              <div className="mb-1.5 w-10 h-10 transform group-hover:rotate-6 transition-transform">
                 <img 
                   src={`${IMAGE_ROOT}${gender === "Masculino" ? "masculine.png" : "female.png"}`} 
                   alt={gender}
                   className="w-full h-full object-contain"
                 />
              </div>
              <span className={`font-black text-xs uppercase tracking-tighter ${
                isSel ? "text-blue-950" : "text-blue-900"
              }`}>{gender}</span>
            </button>
          );
        })}
      </div>

      <div className="text-center mb-4 w-full border-t border-white/5 pt-4">
        <span className="text-yellow-400 font-black text-xs uppercase tracking-wider block mb-1">Passo 2 de 2: Nome</span>
        <h3 className="text-lg font-black uppercase tracking-tight text-white mb-2">Qual É O Seu Nome?</h3>
      </div>

      <div className="w-full max-w-[320px] flex flex-col gap-4">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full bg-white text-blue-900 font-extrabold py-3.5 px-6 rounded-xl shadow-inner text-center text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400/50 placeholder:text-gray-400 transition-all uppercase tracking-tighter"
        />

        <button
          onClick={() => isComplete && onSelect(selectedGender!, name)}
          disabled={!isComplete}
          className="relative bg-gradient-to-b from-blue-400 to-blue-600 text-white font-extrabold py-4 rounded-full shadow-[0_4px_0_rgba(15,23,42,0.8)] hover:brightness-110 active:translate-y-0.5 active:shadow-sm disabled:opacity-40 disabled:pointer-events-none transition-all text-base uppercase tracking-tight group overflow-hidden mt-2"
        >
          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          Revelar Meu Vídeo
        </button>
      </div>

      <div className="mt-4">
        <BackButton onClick={onBack} />
      </div>
    </div>
  );
}

function LoadingStep({ onComplete }: { onComplete: () => void }) {
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProg(old => {
        if (old >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 500);
            return 100;
        }
        return old + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-xl font-bold mb-6">Carregando seu vídeo...</h2>
      <div className="h-4 w-64 bg-white/10 rounded-full overflow-hidden border border-white/10 p-0.5">
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${prog}%` }}
          />
      </div>
    </div>
  );
}

// --- Helper Components ---

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="mt-12 flex items-center justify-center gap-2 bg-white/5 border border-white/5 py-3 px-8 rounded-full hover:bg-white/10 hover:border-white/20 transition-all text-xs font-extrabold uppercase tracking-[0.2em] opacity-60 group"
    >
      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      Voltar
    </button>
  );
}

function StatusIcon({ status }: { status: MaritalStatus }) {
  const getIcon = (s: string) => {
    switch(s) {
      case "Casado(a)": return "casado.png";
      case "Namorando": return "namorando.png";
      case "Noivo(a)": return "noivo.png";
      case "Solteiro(a)": return "solteiro.png";
      case "Separado(a)": return "separado.png";
      case "Viúvo(a)": return "viuvo.png";
      default: return "";
    }
  };

  const iconName = getIcon(status);
  if (!iconName) return null;

  return (
    <div className="w-12 h-12">
      <img src={`${IMAGE_ROOT}${iconName}`} alt={status} className="w-full h-full object-contain" />
    </div>
  );
}

function ChallengeIcon({ challenge }: { challenge: LifeChallenge }) {
  const getIcon = (c: string) => {
    switch(c) {
      case "Vida Amorosa": return "vidaamorosa.png";
      case "Finanças": return "finanças.png";
      case "Saúde": return "saude.png";
      case "Felicidade": return "felicidade.png";
      default: return "";
    }
  };

  const iconName = getIcon(challenge);
  if (!iconName) return null;

  return (
    <div className="w-12 h-12">
      <img src={`${IMAGE_ROOT}${iconName}`} alt={challenge} className="w-full h-full object-contain" />
    </div>
  );
}

