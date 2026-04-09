import { useRef, useEffect, useState } from "react";

interface TeamMember {
  name: string;
  avatar: string; // ruta a la imagen, ej: "/pp-turn-roulette/juani.png"
}

interface RouletteWheelProps {
  members: TeamMember[];
  rotation: number;
  isSpinning: boolean;
  juanitoCenterImage: string;
}

const SEGMENT_COLORS = [
  "hsl(220, 60%, 25%)",
  "hsl(200, 70%, 22%)",
  "hsl(240, 50%, 28%)",
  "hsl(210, 65%, 20%)",
  "hsl(230, 55%, 26%)",
  "hsl(195, 60%, 24%)",
  "hsl(250, 45%, 30%)",
  "hsl(215, 70%, 22%)",
];

const RouletteWheel = ({ members, rotation, isSpinning, juanitoCenterImage }: RouletteWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 420;
  const center = size / 2;
  const radius = size / 2 - 10;

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, size, size);

    if (members.length === 0) return;

    const segAngle = (2 * Math.PI) / members.length;
    const rotRad = (rotation * Math.PI) / 180;

    members.forEach((member, i) => {
      const startAngle = rotRad + i * segAngle;
      const endAngle = startAngle + segAngle;

      // Segmento
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
      ctx.fill();

      // Borde
      ctx.strokeStyle = "hsl(160, 100%, 50%, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Texto
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 13px Inter, sans-serif";

      const textRadius = radius * 0.65;
      ctx.fillText(member.name, textRadius, 0);

      // Avatar
      const avatarRadius = radius * 0.85;
      const img = new Image();
      img.src = member.avatar;
      img.onload = () => {
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(startAngle + segAngle / 2);

        ctx.beginPath();
        ctx.arc(avatarRadius, 0, 14, 0, 2 * Math.PI);
        ctx.clip();

        ctx.drawImage(img, avatarRadius - 14, -14, 28, 28);

        ctx.restore();
      };

      ctx.restore();
    });

    // Glow externo
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "hsl(160, 100%, 50%, 0.4)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Círculo interno para Juanito
    ctx.beginPath();
    ctx.arc(center, center, 55, 0, 2 * Math.PI);
    ctx.fillStyle = "hsl(220, 25%, 10%)";
    ctx.fill();
    ctx.strokeStyle = "hsl(160, 100%, 50%, 0.6)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // --- Detectar ganador Agus ---
    if (!isSpinning) {
      const winnerIndex = Math.floor(((rotation % 360) / 360) * members.length);
      const winner = members[winnerIndex];
      if (winner?.name.toLowerCase() === "Agus") {
        setShowModal(true);
      }
    }
  }, [members, rotation, isSpinning]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Flecha arriba */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderTop: "24px solid hsl(160, 100%, 50%)",
            filter: "drop-shadow(0 0 8px hsl(160, 100%, 50%, 0.6))",
          }}
        />
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          transition: isSpinning ? undefined : "none",
        }}
      />

      {/* Centro Juanito */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-[90px] h-[90px] rounded-full bg-background border-[3px] border-neon animate-pulse-neon flex items-center justify-center overflow-hidden">
          <img 
            src={juanitoCenterImage} 
            alt="Juanito" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Modal inline */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <img
              src="/optimista.png" // pon tu imagen en public
              alt="Optimista del gol"
              className="w-48 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold mb-4">¡El optimista del gol!</h2>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouletteWheel;
