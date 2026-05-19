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

  const progress = (state.currentStep / 10) * 100;

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
        {state.currentStep <= 8 && (
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
                  Passo {state.currentStep} de 8
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
              {state.currentStep === 1 && <Step1 onSelect={(sign) => nextStep({ sign })} />}
              {state.currentStep === 2 && state.sign && (
                <Step2 
                  sign={state.sign} 
                  onSelect={(day, month) => nextStep({ birthDay: day, birthMonth: month })}
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 3 && (
                <Step3 
                  onSelect={(decade) => nextStep({ decade })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 4 && state.decade && (
                <Step4 
                  decade={state.decade}
                  onSelect={(year) => nextStep({ year })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 5 && (
                <Step5 
                  onSelect={(status) => nextStep({ maritalStatus: status })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 6 && (
                <Step6 
                  onSelect={(challenge) => nextStep({ challenge })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 7 && (
                <Step7 
                  onSelect={(gender) => nextStep({ gender })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 8 && (
                <Step8 
                  onComplete={(name) => nextStep({ firstName: name })} 
                  onBack={prevStep}
                />
              )}
              {state.currentStep === 9 && (
                <LoadingStep onComplete={() => setState(prev => ({ ...prev, currentStep: 10 }))} />
              )}
              {state.currentStep === 10 && (
                <VSLStep />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {state.currentStep <= 8 && (
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
  return (
    <div className="fixed opacity-0 pointer-events-none -z-50 overflow-hidden w-0 h-0">
      {ZODIAC_SIGNS.map(sign => (
        <img key={sign.id} src={sign.image} alt="" loading="eager" />
      ))}
      <img src={`${IMAGE_ROOT}fundo.png`} alt="" loading="eager" />
    </div>
  );
}

function Step1({ onSelect }: { onSelect: (sign: ZodiacSign) => void }) {
  return (
    <div className="flex flex-col items-center text-center">
      <ImagePreloader />
      <h3 className="text-[22px] font-black mb-6 uppercase tracking-tight bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent italic">
        Clique no SEU SIGNO
      </h3>
      <div className="grid grid-cols-3 gap-3 w-full">
        {ZODIAC_SIGNS.map((sign, index) => (
          <button
            id={`sign-${sign.id}`}
            key={sign.id}
            onClick={() => onSelect(sign)}
            className="group relative flex flex-col items-center justify-center bg-white rounded-xl p-2 md:p-3 shadow-[0_6px_15px_rgba(0,0,0,0.15)] hover:ring-2 hover:ring-yellow-400 transition-all hover:scale-[1.03] active:scale-95 duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img 
              src={sign.image} 
              alt={sign.name} 
              className="w-10 h-10 md:w-12 md:h-12 object-contain mb-1.5 group-hover:brightness-110 group-hover:scale-110 transition-transform duration-500" 
              referrerPolicy="no-referrer"
              fetchPriority={index < 6 ? "high" : "auto"}
            />
            <span className="text-blue-900 font-extrabold text-[9px] md:text-[10px] uppercase text-center tracking-tight leading-tight">{sign.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ sign, onSelect, onBack }: { sign: ZodiacSign, onSelect: (day: number, month: number) => void, onBack: () => void }) {
  const renderMonth = (monthIndex: number, startDay: number, endDay: number) => {
    const days = [];
    for (let i = startDay; i <= endDay; i++) {
        days.push(i);
    }

    return (
      <div key={monthIndex} className="mb-6 w-full">
        <div className="bg-blue-500/30 backdrop-blur-sm border border-blue-400/20 py-1.5 rounded-xl mb-3">
          <h4 className="text-center font-extrabold text-lg tracking-tight">{MONTH_NAMES[monthIndex]}</h4>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {days.map(day => (
            <button
               id={`day-${monthIndex}-${day}`}
               key={day}
               onClick={() => onSelect(day, monthIndex)}
               className="bg-white text-blue-900 font-extrabold py-3 rounded-xl shadow-md hover:bg-blue-50 transition-all active:scale-90 text-sm md:text-base"
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const getMaxDays = (month: number) => new Date(2024, month + 1, 0).getDate();

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-extrabold mb-10 bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent text-center leading-tight">
        Qual é o seu Dia de Nascimento?
      </h3>
      
      <div className="w-full flex flex-col items-center">
        {renderMonth(sign.startMonth, sign.startDay, getMaxDays(sign.startMonth))}
        {renderMonth(sign.endMonth, 1, sign.endDay)}
      </div>

      <BackButton onClick={onBack} />
    </div>
  );
}

function Step3({ onSelect, onBack }: { onSelect: (decade: number) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">EM QUE DÉCADA VOCÊ NASCEU?</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {DECADES.map(decade => (
          <button
            id={`decade-${decade}`}
            key={decade}
            onClick={() => onSelect(decade)}
            className="bg-white text-blue-900 font-extrabold py-4 rounded-xl shadow-lg hover:ring-2 hover:ring-yellow-400/50 transition-all hover:scale-[1.02] active:scale-95 duration-300"
          >
            {decade}
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step4({ decade, onSelect, onBack }: { decade: number, onSelect: (year: number) => void, onBack: () => void }) {
  const years = Array.from({ length: 10 }, (_, i) => decade + i);
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">EM QUE ANO VOCÊ NASCEU?</h3>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full">
        {years.map(year => (
          <button
            id={`year-${year}`}
            key={year}
            onClick={() => onSelect(year)}
            className="bg-white text-blue-900 font-extrabold py-4 rounded-xl shadow-lg hover:ring-2 hover:ring-yellow-400/50 transition-all hover:scale-[1.02] active:scale-95 duration-300"
          >
            {year}
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step5({ onSelect, onBack }: { onSelect: (status: MaritalStatus) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">QUAL É O SEU ESTADO CIVIL?</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {MARITAL_STATUSES.map(status => (
          <button
            id={`marital-${status}`}
            key={status}
            onClick={() => onSelect(status as MaritalStatus)}
            className="flex flex-col items-center justify-center bg-blue-500/10 border border-white/5 py-6 rounded-2xl shadow-xl hover:bg-blue-500/20 hover:border-white/20 transition-all group duration-300"
          >
            <div className="mb-2 text-3xl transform group-hover:scale-110 transition-transform duration-500">
               <StatusIcon status={status as MaritalStatus} />
            </div>
            <span className="font-extrabold text-[12px] uppercase tracking-tight">{status}</span>
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step6({ onSelect, onBack }: { onSelect: (challenge: LifeChallenge) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center leading-tight italic">QUAL É O MAIOR DESAFIO?</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        {CHALLENGES.map(challenge => (
          <button
            id={`challenge-${challenge}`}
            key={challenge}
            onClick={() => onSelect(challenge as LifeChallenge)}
            className="flex flex-col items-center justify-center bg-blue-500/10 border border-white/5 py-6 rounded-2xl shadow-xl hover:bg-blue-500/20 hover:border-white/20 transition-all group duration-300"
          >
            <div className="mb-2 text-3xl transform group-hover:scale-110 transition-transform duration-500">
               <ChallengeIcon challenge={challenge as LifeChallenge} />
            </div>
            <span className="font-extrabold text-[12px] uppercase tracking-tight line-clamp-1 px-1">{challenge}</span>
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step7({ onSelect, onBack }: { onSelect: (gender: Gender) => void, onBack: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">QUAL É O SEU SEXO?</h3>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-[220px]">
        {GENDERS.map(gender => (
          <button
            id={`gender-${gender}`}
            key={gender}
            onClick={() => onSelect(gender as Gender)}
            className="flex flex-col items-center justify-center bg-white py-5 px-8 rounded-2xl shadow-xl hover:scale-[1.03] transition-all group active:scale-95 duration-300"
          >
            <div className={`mb-2 text-4xl ${gender === "Masculino" ? "text-blue-500" : "text-pink-500"} transform group-hover:rotate-6 transition-transform`}>
               {gender === "Masculino" ? "♂" : "♀"}
            </div>
            <span className="font-black text-blue-900 text-lg uppercase tracking-tighter">{gender}</span>
          </button>
        ))}
      </div>
      <BackButton onClick={onBack} />
    </div>
  );
}

function Step8({ onComplete, onBack }: { onComplete: (name: string) => void, onBack: () => void }) {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-400/30 backdrop-blur-sm border border-blue-300/20 py-3 px-6 rounded-2xl mb-6 w-full">
        <h3 className="text-lg font-extrabold uppercase tracking-tight text-center italic">QUAL É O SEU NOME?</h3>
      </div>
      
      <div className="w-full max-w-[300px] flex flex-col gap-6">
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="w-full bg-white text-blue-900 font-extrabold py-4 px-6 rounded-xl shadow-inner text-center text-xl focus:outline-none focus:ring-4 focus:ring-yellow-400/50 placeholder:text-gray-400 transition-all uppercase tracking-tighter"
          autoFocus
        />

        <button
          id="btn-continue"
          onClick={() => name.length > 1 && onComplete(name)}
          disabled={name.length < 2}
          className="relative bg-gradient-to-b from-blue-400 to-blue-600 text-white font-extrabold py-5 px-8 rounded-full shadow-[0_4px_0_rgba(15,23,42,0.8)] hover:brightness-110 hover:-translate-y-1 active:translate-y-1 active:shadow-none transition-all text-lg uppercase tracking-tight disabled:opacity-50 group overflow-hidden"
        >
          <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          PRÓXIMO PASSO
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
  // Rough implementation of the icons in Step 5
  switch(status) {
    case "Casado(a)": return <div className="text-3xl">🤝</div>;
    case "Namorando": return <div className="text-3xl">💕</div>;
    case "Noivo(a)": return <div className="text-3xl">💍</div>;
    case "Solteiro(a)": return <div className="text-3xl">🤍</div>;
    case "Separado(a)": return <div className="text-3xl">🧩</div>;
    case "Viúvo(a)": return <div className="text-3xl">💔</div>;
    default: return null;
  }
}

function ChallengeIcon({ challenge }: { challenge: LifeChallenge }) {
  // Rough implementation of the icons in Step 6
  switch(challenge) {
    case "Vida Amorosa": return <div className="text-3xl">💍</div>;
    case "Finanças": return <div className="text-3xl">💰</div>;
    case "Saúde": return <div className="text-3xl">💓</div>;
    case "Felicidadee": return <div className="text-3xl">🙌</div>;
    default: return null;
  }
}

