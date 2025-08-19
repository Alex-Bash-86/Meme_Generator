import { useState } from "react";

const Edit = ({ onTextChange, onColorChange, onNewImage }) => {
  const [topText, setTopText] = useState("");
  const [middleText, setMiddleText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [color, setColor] = useState("black");

  return (
    <div className="flex flex-col text-center p-4 rounded-xl">
      <div className="font-bold mb-2">Edit Meme</div>

      <div
        id="mainEdit"
        className="border flex flex-col text-center p-4 rounded-xl m-4 gap-2 w-[400px]"
      >
        {/* Text #1 */}
        <input
          type="text"
          placeholder="Text #1"
          value={topText}
          onChange={(e) => {
            setTopText(e.target.value);
            onTextChange("top", e.target.value);
          }}
          className="border rounded p-2"
        />

        {/* Text #2 */}
        <input
          type="text"
          placeholder="Text #2"
          value={middleText}
          onChange={(e) => {
            setMiddleText(e.target.value);
            onTextChange("middle", e.target.value);
          }}
          className="border rounded p-2"
        />

        {/* Text #3 */}
        <input
          type="text"
          placeholder="Text #3"
          value={bottomText}
          onChange={(e) => {
            setBottomText(e.target.value);
            onTextChange("bottom", e.target.value);
          }}
          className="border rounded p-2"
        />

        {/* Color */}
        <select
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            onColorChange(e.target.value);
          }}
          className="border rounded p-2"
        >
          <option value="black">Schwarz</option>
          <option value="white">Weiß</option>
          <option value="red">Rot</option>
          <option value="yellow">Gelb</option>
          <option value="green">Grün</option>
          <option value="blue">Blau</option>
        </select>

        <button
          onClick={onNewImage}
          className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600"
        >
          New meme
        </button>
      </div>
    </div>
  );
};

export default Edit;
