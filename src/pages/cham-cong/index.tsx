import { PageContainer, ProCard } from '@ant-design/pro-components'
import KhoiConLai from './khoi-con-lai'
import { useState, type FC } from 'react'

type SearchProps = {
  children?: React.ReactNode
}

const tabList = [
  {
    key: 'general',
    tab: 'Khối GTBT - BTC',
  },
  {
    key: 'sc',
    tab: 'SC',
  },
  {
    key: 'lm',
    tab: 'Khối LM',
  },
  {
    key: 'dt',
    tab: 'Đội trưởng',
  },
]

const Search: FC<SearchProps> = () => {
  const [activeTabKey, setActiveTabKey] = useState('tab1')
  const handleTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value)
  }

  const renderChildrenByTabKey = (tab: string) => {
    if (tab === 'general') {
      return <KhoiConLai></KhoiConLai>
    }
  }

  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        tabList={tabList}
        tabActiveKey={activeTabKey}
        onTabChange={handleTabChange}
      >
        {renderChildrenByTabKey(activeTabKey)}
      </PageContainer>
    </div>
  )
}

export default Search
