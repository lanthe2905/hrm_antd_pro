import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined,EllipsisOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import Create from './create';

type CongTac = {
  ma_cong_tac: string;
  mo_ta: number;
};

const columns: ProColumns<CongTac>[] = [

  {
    title: 'Khu đoạn',
    dataIndex: 'khu_doan',
    ellipsis: true,
  },
  {
    title: 'Mô tả',
    dataIndex: 'mo_ta',
  },
  {
    title: 'Thao tác',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [

        <a>
         <EditOutlined /> Sửa
        </a>,
         <a>
         <DeleteOutlined /> Xoá
       </a>,
    ],
  },
];
const TinhChat=()=>{
  const actionRef = useRef<ActionType>();
  return (
    // <PageContainer>
    <ProTable<CongTac>
      columns={columns}
      // actionRef={actionRef}
      cardBordered
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto'
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}

      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Bảng danh sách các khu đoạn"
      toolBarRender={() => [
        <Create/>,
      ]}
    />
    // </PageContainer>
  );

}
export default TinhChat;
