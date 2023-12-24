import { RiseLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen Spinner w-full fixed top-0 z-10">
      <RiseLoader
        color="#02e44d"
        size={40}
      />
    </div>
  );
};

export default Spinner;
