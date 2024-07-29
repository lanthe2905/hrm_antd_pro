import { PageContainer } from '@ant-design/pro-components'
import KhoiConLai from './khoi-con-lai'
import KhoiSC from './sc'
import KhoiLaiMay from './khoi-lm'
import DoiTruongLT from './doi-truong'
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
    key: 'lai-may',
    tab: 'Khối LM',
  },
  {
    key: 'doi-truong',
    tab: 'Đội trưởng',
  },
]

const Search: FC<SearchProps> = () => {
  const [activeTabKey, setActiveTabKey] = useState('general')
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

    switch (tab) {
      case 'general':
        return <KhoiConLai></KhoiConLai>
      case 'sc':
        return <KhoiSC></KhoiSC>
      case 'lai-may':
        return <KhoiLaiMay></KhoiLaiMay>
      case 'doi-truong':
        return <DoiTruongLT></DoiTruongLT>
    }
  }

  return (
    <PageContainer
      tabList={tabList}
      tabActiveKey={activeTabKey}
      onTabChange={handleTabChange}
    >
      {renderChildrenByTabKey(activeTabKey)}
    </PageContainer>
  )
}

export default Search
