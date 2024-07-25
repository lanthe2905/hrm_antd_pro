import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined,EllipsisOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import Create from './create';

type GithubIssueItem = {
  ten_sp: string;
  dvt: number;
  ki_hieu: number;
  don_gia_t: string;
  don_gia_p: string;
};

const columns: ProColumns<GithubIssueItem>[] = [

  {
    title: 'Tên sản phẩm',
    dataIndex: 'ten_sp',
    ellipsis: true,
  },
  {
    title: 'ĐVT',
    dataIndex: 'dvt',
  },
  {
    title: 'Kí hiệu',
    dataIndex: 'ki_hieu',
  },
  {
    title: 'Đơn giá tài',
    dataIndex: 'don_gia_t',
  },
  {
    title: 'Đơn giá phụ',
    dataIndex: 'don_gia_p',
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
 const DonGiaLaiTau =() => {
  const actionRef = useRef<ActionType>();
  return (
    // <PageContainer>
    <ProTable<GithubIssueItem>
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
      headerTitle="Bảng danh sách đơn giá"
      toolBarRender={() => [
        <Create/>,
      ]}
    />
    // </PageContainer>
  );
};
export default DonGiaLaiTau
