import { useOutletContext } from "react-router-dom";
import HomeCard from "../../components/homeCard";

type ContextType = { searchValue: string };

const Home: React.FC = () => {
  const { searchValue } = useOutletContext<ContextType>();

  return <HomeCard searchValue={searchValue} />;
};

export default Home;
