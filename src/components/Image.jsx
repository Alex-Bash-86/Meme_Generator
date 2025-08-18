import { useEffect, useState, useRef } from "react";
import Edit from "./Edit";

const Image = () => {
  const [data, setData] = useState();
  const [selectedMeme, setSelectedMeme] = useState(null);

  const [overlayTexts, setOverlayTexts] = useState({
    top: "",
    middle: "",
    bottom: "",
  });
  const [color, setColor] = useState("black");

  const [positions, setPositions] = useState({
    top: { x: 50, y: 20 },
    middle: { x: 50, y: 50 },
    bottom: { x: 50, y: 80 },
  });

  const [dragging, setDragging] = useState(null);
  const memeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const image = await response.json();
        setData(image.data.memes);

        const random = Math.floor(Math.random() * image.data.memes.length);
        setSelectedMeme(image.data.memes[random]);
      } catch {
        console.log("Error fetching");
      }
    };
    fetchData();
  }, []);

  const handleNewImage = () => {
    if (data) {
      const random = Math.floor(Math.random() * data.length);
      setSelectedMeme(data[random]);
    }
  };

  const handleTextChange = (pos, value) => {
    setOverlayTexts((prev) => ({ ...prev, [pos]: value }));
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const imgBox = memeRef.current.getBoundingClientRect();
      const x = ((e.clientX - imgBox.left) / imgBox.width) * 100;
      const y = ((e.clientY - imgBox.top) / imgBox.height) * 100;
      setPositions((prev) => ({ ...prev, [dragging]: { x, y } }));
    }
  };

  return (
    <div
      id="mainBox"
      className="border max-w-[1000px] flex flex-wrap justify-between mx-auto bg-zinc-400"
    >
      <div
        id="meme"
        className="relative flex flex-col text-center flex-wrap p-4"
      >
        {selectedMeme?.name}
        {selectedMeme && (
          <div
            id="meme-box"
            ref={memeRef}
            className="relative inline-block"
            onMouseMove={handleMouseMove}
            onMouseUp={() => setDragging(null)}
          >
            <img
              src={selectedMeme.url}
              alt={selectedMeme.name}
              className="max-w-110 border rounded-xl m-4"
            />

            {overlayTexts.top && (
              <div
                className="absolute text-2xl font-bold drop-shadow-lg cursor-move select-none"
                style={{
                  left: `${positions.top.x}%`,
                  top: `${positions.top.y}%`,
                  color,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseDown={() => setDragging("top")}
              >
                {overlayTexts.top}
              </div>
            )}

            {Object.entries(overlayTexts).map(([pos, text]) =>
              text ? (
                <div
                  key={pos}
                  className="absolute text-2xl font-bold drop-shadow-lg cursor-move select-none"
                  style={{
                    left: `${positions[pos].x}%`,
                    top: `${positions[pos].y}%`,
                    color,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseDown={() => setDragging(pos)}
                >
                  {text}
                </div>
              ) : null
            )}

            {overlayTexts.bottom && (
              <div
                className="absolute text-2xl font-bold drop-shadow-lg cursor-move select-none"
                style={{
                  left: `${positions.bottom.x}%`,
                  top: `${positions.bottom.y}%`,
                  color,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseDown={() => setDragging("bottom")}
              >
                {overlayTexts.bottom}
              </div>
            )}
          </div>
        )}
      </div>

      <Edit
        onTextChange={handleTextChange}
        onColorChange={setColor}
        onNewImage={handleNewImage}
      />
    </div>
  );
};

export default Image;

