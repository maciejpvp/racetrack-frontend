import { useEffect, useState } from "react";

type TimerProps = {
  size?: number;
  color?: string;
  onFinish?: () => void;
};

export const Timer = ({
  size = 90,
  color = "#358f01",
  onFinish,
}: TimerProps) => {
  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progressDegrees = Math.min((elapsed / 2000) * 360, 360);
      setDegrees(progressDegrees);

      if (progressDegrees < 360) {
        requestAnimationFrame(animate);
      } else {
        onFinish?.();
      }
    };

    requestAnimationFrame(animate);
  }, [onFinish]);

  const radius = size / 2;
  const currentAngle = degrees % 360;
  const radians = (currentAngle - 90) * (Math.PI / 180);

  const endX = radius + radius * Math.cos(radians);
  const endY = radius + radius * Math.sin(radians);
  const isLargeArc = currentAngle > 180 ? 1 : 0;

  const arcPath = `
    M ${radius},${radius}
    L ${radius},0
    A ${radius},${radius} 0 ${isLargeArc} 1 ${endX},${endY}
    Z
  `;

  return (
    <div className="absolute bottom-5 left-5 flex items-center flex-col">
      <p className="text-3xl">Your Turn:</p>
      <svg
        width={size}
        height={size}
        style={{ display: "block", background: "transparent" }}
      >
        {degrees > 0 && <path d={arcPath} fill={color} />}
      </svg>
    </div>
  );
};
