"use client";

const backgroundLayerStars = 200;
const middleLayerStars = 100;
const foregroundLayerStars = 50;

function createStars(n: number) {
  return Array.from({ length: n })
    .map(() => {
      const x = Math.floor(Math.random() * 2000) - 2000 / 4;
      const y = Math.floor(Math.random() * 2000) - 2000 / 4;
      return `${x}px ${y}px 1px white`;
    })
    .join(",");
}

export default function Gekkou() {
  const starLayers = [
    {
      stars: backgroundLayerStars,
      size: "w-0.5 h-0.5",
      speed: "40s",
      zIndex: "z-10",
    },
    {
      stars: middleLayerStars,
      size: "w-1 h-1",
      speed: "60s",
      zIndex: "z-20",
    },
    {
      stars: foregroundLayerStars,
      size: "w-1.5 h-1.5",
      speed: "80s",
      zIndex: "z-30",
    },
  ];

  return (
    <div className="h-screen w-screen grid place-items-center bg-white saturate-200">
      <div
        className="w-[500px] h-[500px] bg-gradient-to-b from-[#0b042e] to-[#292465]
      shadow-lg shadow-gray-900 relative overflow-hidden
      "
      >
        {starLayers.map((layer) => (
          <div
            key={layer.zIndex}
            style={{
              boxShadow: createStars(layer.stars),
              animation: `star-movement ${layer.speed} linear infinite`,
              animationDelay: `-${parseFloat(layer.speed) / 2}s`,
            }}
            className={`${layer.size} ${layer.zIndex} rounded-full absolute`}
          ></div>
        ))}
        <div className="h-full w-full grid place-items-center">
          <div className="bg-black h-72 w-72 rounded-full z-40 shadow-lg shadow-white grid place-items-center">
            <span className="[text-shadow:0_0_10px_white] text-4xl font-bold text-white">
              月光
            </span>
          </div>
          <div className="absolute z-50 bottom-0 left-1/2 rounded-full shadow-[0px_0px_200px_50px_#eeadb1,0px_0px_150px_#6354a2]" />
        </div>
      </div>
      <style jsx>
        {`
          @keyframes star-movement {
            0% {
              transform: translate(800px, 800px);
            }
            100% {
              transform: translate(-1200px, -1200px);
            }
          }
        `}
      </style>
    </div>
  );
}
