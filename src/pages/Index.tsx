import { useState, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import RouletteWheel from "@/components/RouletteWheel";
import FinanceIcons from "@/components/FinanceIcons";
import { Button } from "@/components/ui/button";

// ============================================================
// 🔧 EDITABLE: Cambia los nombres y fotos de tu equipo aquí
// ============================================================
const teamMembers = [
  { name: "Juani", avatar: "/juani.png" },
  { name: "Lauti", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWH1H7v3jgXMhUmQLY8nff5VlOeCwKrKp3L7x6JhzjwrUhVNjSF=s265-p-k-rw-no" },
  { name: "Jefa", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjW1TDS7ATlIapLrqUQ0ZMxiP9eGNB4iCvG1_YfGUUFQN9X-58I=s265-p-k-rw-no" },
  { name: "Mati", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX7XJeRroEtcrGj6_UwEbFwmam0rabam9w0VqJm22QhCso8OnI=s265-p-k-rw-no" },
  { name: "Mau", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXuEErr8q0fCTd7sHDIW0epdWy4hlMQq3BFfQ_-mrJ6KNW15L8=s265-p-k-rw-no" },
  { name: "Alva", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWN1nieEZT0q7kCmvB1d9wJu2SlcL8JFrEezUcd6HCDVp4fLo_Z=s265-p-k-rw-no" },
  { name: "Agus", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjX-bnx2jo8lDmqaUJpBML6iV_9__YPr5J9Zex9VsRQCjp5Lg7qKYheSAmzyDxsp5oa-EKYBDNY2FCNP5GaWqPY4BnamAlbT-i7KlDHi9xYuGs4tNRSDj7MNpHt6ed-Zh76ZKnrQsbLji2sI-yHJfyUNcJ98goxiy0oShFWVwx3aD5KaRJ_79yVAGD8Ej54VXBKfH6y5Y9gjWwVcxKxsQRPjwNqONypNl8fOps62nFLEx6SMdUWyWy5ojvWGfTk0xvW7OmwhdZK52waE-dlcrb5HRvpRwy6PYKa5YobdkpVh1dDArsPhiJeyZuiTs3Aj5-9eqNfYBd7Z4MMPaPftoa-957akyhNAZ0Hy_aQnUXCc2qGX16BJiVDyzt8RFu33gtqn-lQmshWCbzh5WRtF2gMIXOkf9oKX-O2ccLxDU8n3Tm0u5BJjjGxb9F56f7iCOkMbJeXyjQZPJ8MmHA9K0Nf8N28kY7Mb5fR_wnn7bhIH4yA3QbNRxOZVgW5HE_g6cJ-4FLZdraRI0n6zQh3F4xKyFvixpB_Ooyfq4mh9k50Hd7hxjHNarLClTDiB0RMQakORwarYd67eyqqGbOrsBxpO37ICXwLHTWYWmYO_ZcvINacvq_nB1zcc5iKxpjHr2dsGXF9YUB8EO0l1FobW8yrBOTmtAM02ErdlEGAocBnjQ8VtjV1BSfPfk3simqEAT54KvEquRbj9nzLBRU0sLo0g9wYYja49APzLXwPFLYI-2H2DsZkmjHFD9Lw0VL7BJq5KocHsLG6BsrNTttWCfU4_o88-io5bWSr87wGxUsNNfm9GDBr7SBMctRaguJVfayn2Ckg8C4SN89lXD9GOy9upPEdbouK6NjQHkgS2N5HS2GOhMGwjKCWRUc7eyOsT9uMPmiY6GppEKfx2DxdDetuN8s_M5gW26b2o28hIuzmAxWGtRuhjfF6BlC-ZCljweO3vmF2auLkGcpvgw_4UeIVPNaPxuHf1Rf5S5gewgMYpALFeYgun9UGQAxvJN0huL1arwTi-KsX-PtskW-kF7PcAojBJ81HM5zlNJXHgVhTgvmIBzisb820x=s265-p-k-rw-no" },
  { name: "Juanito", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWGnZ-b8hggEWSOe3atkeyOvRdXPWfkG5G8bJ-FSjlaO-PEXN4=s265-p-k-rw-no" },
  { name: "Nati", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVzDOYro0Nm7A8-SoaM2nfUmG7Yo842m9L2tMxBZ2oD7T_lFS4=s265-p-k-rw-no" },
  { name: "Gus", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXzXrXuA-QD4EEDtiDkwSmRgOX_O9ZrTGcIZpIbtVHblykthiM=s265-p-k-rw-no" }
];

// 🔧 EDITABLE: Cambia la imagen central de Juanito aquí
const juanito_center_image = "https://chat.google.com/u/0/api/get_attachment_url?url_type=FIFE_URL&content_type=image%2Fpng&attachment_token=AOo0EEXvefgNoy1pL9w7cSkRvBj9xx%2FcEcjqMyWJppZOV1oKToA32c96dkeibcOo%2BpWy7gb8KjqGW2l%2FMoCfPPyx414lTWJR1HawuwSG0wknt9%2BInEmLnMf6NZP7ViVVV83tjjkmgD7EwgGiYeuiUUcXnrvNO4cNgzaW0YqLn8Ez2tY8F1qLlrIKSyuV2PAiwOr7hmz3AVR4mNjIdRM0ChaYqJ4l%2FSQAJTepvBXDU2jFCXt9L%2BBZH4tHoG7DIBoVF9h5leRgNlQLGu5596gzLVE17CZ9jHIqkdct70iA0%2Ba%2FPA5glALDOYKLELiOGZaJsOwyigihFoW0BrCT0CFJUqDkE7R3ZMpn8Fkh30C3ORiyhorEiiY3LN8yknfQx%2BUEpoKQZPhdYOO6fGSKC17ZvRx3u0y6i3a2cZNUwCxNlMCo6DH8U14B8DJ1qS0%2FmNdlYPj4isw2qhz%2B%2FER%2FuUPh1zDl4gX4DbyH5LhsENTlUcZnlIwjfxVgz1dHirme1kKjsHRIJ5RGY0G58zemIVsnomk324HzlcA5YmVuHgFO8f70kRrHzsh9veWgg5%2FLdkRyTWYXImm5s7NxzgLhwfieKaX5bkY%3D&allow_caching=true&sz=w1029-h1266-rw&auditContext=forDisplay";

// ============================================================

const useTickSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTick = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800 + Math.random() * 400;
    osc.type = "square";
    gain.gain.value = 0.06;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  }, []);

  return playTick;
};

const fireConfetti = () => {
  const colors = ["#00ffaa", "#00e5ff", "#ffffff", "#4488ff"];
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors });
  setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.5 }, colors }), 200);
};

const Index = () => {
  const [remaining, setRemaining] = useState([...teamMembers]);
  const [done, setDone] = useState<typeof teamMembers>([]);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<(typeof teamMembers)[0] | null>(null);
  const [allDone, setAllDone] = useState(false);

  const playTick = useTickSound();
  const animFrameRef = useRef<number>(0);
  const currentRotRef = useRef(0);

  const spin = useCallback(() => {
    if (isSpinning || remaining.length === 0) return;
    setWinner(null);
    setIsSpinning(true);

    const totalSpins = 5 + Math.random() * 5; // 5-10 full rotations
    const targetAngle = totalSpins * 360 + Math.random() * 360;
    const duration = 4000 + Math.random() * 1000;
    const startTime = performance.now();
    const startRot = currentRotRef.current;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    let lastSegment = -1;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const currentAngle = startRot + targetAngle * easedProgress;

      currentRotRef.current = currentAngle;
      setRotation(currentAngle % 360);

      // Tick sound on segment change
      if (remaining.length > 0) {
        const segAngle = 360 / remaining.length;
        const normalizedAngle = ((currentAngle % 360) + 360) % 360;
        const currentSegment = Math.floor(normalizedAngle / segAngle);
        if (currentSegment !== lastSegment) {
          playTick();
          lastSegment = currentSegment;
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Determine winner: pointer is at top (270° in standard canvas coords)
        const finalAngle = ((currentAngle % 360) + 360) % 360;
        const segAngle = 360 / remaining.length;
        // Pointer at top = 270° in canvas. The rotation goes clockwise.
        // The segment at the pointer: (360 - finalAngle + 270) mod 360
        const pointerAngle = ((360 - finalAngle + 270) % 360 + 360) % 360;
        const winnerIndex = Math.floor(pointerAngle / segAngle) % remaining.length;

        setWinner(remaining[winnerIndex]);
        setIsSpinning(false);
        fireConfetti();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, remaining, playTick]);

  const handleDoneTalking = () => {
    if (!winner) return;
    const newRemaining = remaining.filter((m) => m.name !== winner.name);
    setDone((prev) => [...prev, winner]);
    setWinner(null);

    if (newRemaining.length === 0) {
      setAllDone(true);
      setRemaining([]);
      fireConfetti();
      setTimeout(fireConfetti, 500);
    } else {
      setRemaining(newRemaining);
    }
  };

  const handleReset = () => {
    setRemaining([...teamMembers]);
    setDone([]);
    setWinner(null);
    setAllDone(false);
    setRotation(0);
    currentRotRef.current = 0;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FinanceIcons />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            <span className="text-foreground">Ruleta de Turnos </span>
            <span className="text-primary neon-text">Personales</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            ¡Bienvenido, <span className="text-primary font-bold neon-text">Juanito Preguntón</span>! Es hora de repartir el juego.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Main roulette area */}
          <div className="flex-1 flex flex-col items-center gap-6">
            {!allDone ? (
              <>
                <div className="animate-scale-in">
                  <RouletteWheel
                    members={remaining}
                    rotation={rotation}
                    isSpinning={isSpinning}
                    juanitoCenterImage={juanito_center_image}
                  />
                </div>

                {/* Winner banner */}
                {winner && !isSpinning && (
                  <div className="glass-card rounded-xl px-8 py-5 text-center animate-scale-in neon-border">
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">¡Aprobado!</p>
                    <p className="text-2xl font-black text-primary neon-text">{winner.name}, te toca hablar</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col items-center gap-3">
                  {!winner && (
                    <Button
                      onClick={spin}
                      disabled={isSpinning || remaining.length === 0}
                      size="lg"
                      className="text-lg px-10 py-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 neon-border transition-all duration-300 disabled:opacity-40"
                    >
                      {isSpinning ? "Girando..." : "¡Juanito, hazla girar!"}
                    </Button>
                  )}

                  {winner && !isSpinning && (
                    <Button
                      onClick={handleDoneTalking}
                      size="lg"
                      variant="outline"
                      className="text-base px-8 py-5 font-semibold border-accent text-accent hover:bg-accent/10 transition-all"
                    >
                      ¡Listo, Juanito! Siguiente préstamo... digo, siguiente persona
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* All done state */
              <div className="text-center animate-fade-in glass-card rounded-2xl p-12 neon-border max-w-lg">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl font-black text-primary neon-text mb-3">
                  ¡Cartera completa!
                </h2>
                <p className="text-lg text-foreground/80 mb-6">
                  Daily terminada. ¡A trabajar, equipo!
                </p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Reiniciar para mañana
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar: Done list */}
          {done.length > 0 && (
            <div className="w-full lg:w-72 glass-card rounded-xl p-5 animate-fade-in">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
                Analistas que ya reportaron
              </h3>
              <div className="space-y-2">
                {done.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary/50 border border-border/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-primary">
                      {member.name.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground/70 line-through">{member.name}</span>
                    <span className="ml-auto text-primary text-xs">✓</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground text-center">
                {remaining.length} restante{remaining.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
