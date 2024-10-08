import Header from "../../components/UI/organisms/header/Header";
import PurchaseContent from "../../components/views/purchase/PurchaseContent";
import PurchaseHeader from "../../components/views/purchase/PurchaseHeader";

import Nav from "../../components/UI/organisms/nav/Nav";
import S from "../../components/views/purchase/Purchase.module.css";

function index() {
  return (
    <div className={S.purchase}>
      <Header backIcon={true} logoIcon="logo" backUrl="/" />
      <div style={{ paddingTop: "2.75rem" }}>
        <PurchaseHeader />
        <PurchaseContent />
        <Nav/>
      </div>
    </div>
  );
}

export default index;
