import Header from "../../../components/organisms/header/Header";
import PickDetail from "../../../components/views/pick/PickDetail";

function index() {
  return (
    <>
      <Header logoIcon="logo" backIcon={true} />
      <PickDetail />
    </>
  );
}

export default index;