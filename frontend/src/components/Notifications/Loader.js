import { ScaleLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <ScaleLoader color="#183253" />
    </div>
  );
}

export default Loader;
