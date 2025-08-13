import { useEffect, useState } from "react";
import Edit from "./Edit";

const Image = () => {
  const [data, setData] = useState();

  let randomMeme = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const image = await response.json();
        setData(image.data.memes);
      } catch {
        console.log("Error fetching");
      }
    };
    fetchData();
  }, []);
  console.log(data);

  if (data) {
    const random = Math.floor(Math.random() * data.length);
    randomMeme = data[random];
    console.log(random);
  }

  return (
    <div
      id="mainBox"
      className="border max-w-[1400px] flex flex-wrap justify-between mx-auto bg-zinc-400"
    >
      <div id="meme" className="flex flex-col text-center flex-wrap p-4">
        {randomMeme.name}
        {randomMeme && (
          <img
            src={randomMeme.url}
            alt={randomMeme.name}
            className="max-w-110 border rounded-xl m-4"
          />
        )}
      </div>
      <Edit />
    </div>
  );
};

export default Image;
