"use client";

import { useEffect, useRef } from "react";

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Express",
  "JavaScript",
  "C++",
  "Python",
  "Tailwind",
  "Git",
  "REST APIs",
  "SQL",
  "HTML5",
  "CSS3",
  "Postman",
];

export default function TechSphere() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tags = Array.from(container.children);
    const total = tags.length;
    const radius = 170;
    let angleX = 0.002;
    let angleY = 0.002;

    const items = tags.map((el, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / total);
      const theta = Math.sqrt(total * Math.PI) * phi;
      return {
        el,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });

    let animationFrameId;

    const rotate = () => {
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      items.forEach((item) => {
        const x1 = item.x * cosY - item.z * sinY;
        const z1 = item.z * cosY + item.x * sinY;

        const y1 = item.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + item.y * sinX;

        item.x = x1;
        item.y = y1;
        item.z = z2;

        const scale = (item.z + 300) / 450;
        const alpha = Math.max(0.25, (item.z + 200) / 370);

        item.el.style.transform = `translate3d(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px), 0px) scale(${Math.max(0.7, scale)})`;
        item.el.style.opacity = alpha;
        item.el.style.zIndex = Math.floor(scale * 100);
      });

      animationFrameId = requestAnimationFrame(rotate);
    };

    rotate();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      angleY = x * 0.00008;
      angleX = -y * 0.00008;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="relative w-full h-full">
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              backgroundColor: "var(--tag-bg)",
              borderColor: "var(--tag-border)",
              color: "var(--tag-text)",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 text-xs sm:text-sm font-mono font-bold tracking-wide border rounded-lg select-none shadow-md backdrop-blur-md"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}