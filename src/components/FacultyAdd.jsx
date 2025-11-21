const FacultyAdd = ({ add }) => {
  return (
    <>
      <div>
        <button
          onClick={() => {
            add(true);
          }}
          className="button ripple red round margin padding-16"
        >
          Add Faculty
        </button>
      </div>
    </>
  );
};

export default FacultyAdd;
