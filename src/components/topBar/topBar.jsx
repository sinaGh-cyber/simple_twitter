import { FiRefreshCcw } from 'react-icons/fi';
const TopBar = ({ pageName, refreshHandler }) => {
  return (
    <div className="flex justify-between items-center ">
      <div>{pageName}</div>
      {refreshHandler && (
        <button
          className="p-4 hover:bg-gray-ExtraLight rounded-md"
          onClick={refreshHandler}
        >
          <FiRefreshCcw />
        </button>
      )}
    </div>
  );
};

export default TopBar;
