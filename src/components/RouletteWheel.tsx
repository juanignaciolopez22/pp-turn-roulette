import { useRef, useEffect } from "react";

interface TeamMember {
  name: string;
  avatar: string;
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

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
      ctx.fill();

      // Border
      ctx.strokeStyle = "hsl(160, 100%, 50%, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + segAngle / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 13px Inter, sans-serif";

      const textRadius = radius * 0.65;
      ctx.fillText(member.name, textRadius, 0);

      // Avatar circle placeholder
      const avatarRadius = radius * 0.85;
      ctx.beginPath();
      ctx.arc(avatarRadius, 0, 14, 0, 2 * Math.PI);
      ctx.fillStyle = "hsl(220, 25%, 20%)";
      ctx.fill();
      ctx.strokeStyle = "hsl(160, 100%, 50%, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Avatar initials
      ctx.fillStyle = "hsl(160, 100%, 50%)";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.fillText(member.name.charAt(0), avatarRadius, 1);

      ctx.restore();
    });

    // Outer ring glow
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "hsl(160, 100%, 50%, 0.4)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner circle cutout for Juanito
    ctx.beginPath();
    ctx.arc(center, center, 55, 0, 2 * Math.PI);
    ctx.fillStyle = "hsl(220, 25%, 10%)";
    ctx.fill();
    ctx.strokeStyle = "hsl(160, 100%, 50%, 0.6)";
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [members, rotation]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Pointer arrow at top */}
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

      {/* Canvas (spins) */}
      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          transition: isSpinning ? undefined : "none",
        }}
      />

      {/* Static Juanito center overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-[90px] h-[90px] rounded-full bg-background border-[3px] border-neon animate-pulse-neon flex items-center justify-center overflow-hidden">
          <div className="flex flex-col items-center justify-center">
            {/* Placeholder avatar silhouette */}
            <img 
      src={juanitoCenterImage} 
      alt="Juanito" 
      className="w-full h-full object-cover"
    />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;
