import { Tabs } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import DonGiaLaiTau from "./don-gia-san-pham";
import CongTac from "./cong-tac";
import TinhChat from "./tinh-chat";
const CaiDatLaiTau =() => {
  return ( <>
   <PageContainer>
  <Tabs
  defaultActiveKey="1"
  tabPosition='left'
  items={[{label:'Đơn giá sản phẩm lái tàu', key:'1', children:<DonGiaLaiTau />},
    {label:'Công tác', key:'2', children:<CongTac />},
    {label:'Tính chất', key:'3', children:<TinhChat />}]}

/> </PageContainer></>)
}
export default CaiDatLaiTau;
