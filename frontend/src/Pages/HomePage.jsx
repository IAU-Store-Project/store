import GeneralLayout from "./../Layouts/GeneralLayout";
import Search from "./../Components/Common/Search";
import Heros from "./../Components/Common/Heros";
import ListProducts from "./../Components/List/ListProducts";

const HomePage = () => {
  return (
    <GeneralLayout>
      <Search />
      <Heros />
      <ListProducts />
    </GeneralLayout>
  );
};

export default HomePage;
