const Edit = () => {
  return (
    <>
      <div className="flex flex-wrap roundedflex flex-col text-center p-4 rounded-xl">
        <div>Edit Meme</div>
        <div
          id="mainEdit"
          className="border flex flex-wrap roundedflex flex-col text-center p-4 rounded-xl m-4"
        >
          <input
            type="text"
            placeholder="Text input..."
            className="border rounded"
          />
        </div>
      </div>
    </>
  );
};

export default Edit;
