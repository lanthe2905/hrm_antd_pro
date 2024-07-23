import { GridContent, PageContainer } from '@ant-design/pro-components'
import { Menu } from 'antd'
import React, { useLayoutEffect, useRef, useState } from 'react'
import useStyles from './index.style'
import LoaiNgayPhep from './loai-ngay-phep'
import NgayLe from './ngay-le'
type SettingsStateKeys = 'tag1' | 'tag2'
type SettingsState = {
  mode: 'inline' | 'horizontal'
  selectKey: SettingsStateKeys
}
const Settings: React.FC = () => {
  const { styles } = useStyles()
  const menuMap: Record<string, React.ReactNode> = {
    tag1: 'Loại ngày phép',
    tag2: 'Ngày lễ',
  }
  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'tag1',
  })
  const dom = useRef<HTMLDivElement>()
  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return
      }
      let mode: 'inline' | 'horizontal' = 'inline'
      const { offsetWidth } = dom.current
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      setInitConfig({
        ...initConfig,
        mode: mode as SettingsState['mode'],
      })
    })
  }
  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize)
      resize()
    }
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [dom.current])
  const getMenu = () => {
    return Object.keys(menuMap).map((item) => ({
      key: item,
      label: menuMap[item],
    }))
  }
  const renderChildren = () => {
    const { selectKey } = initConfig
    switch (selectKey) {
      case 'tag1':
        return <LoaiNgayPhep />
      case 'tag2':
        return <NgayLe />
      default:
        return null
    }
  }
  return (
    <PageContainer>
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            if (ref) {
              dom.current = ref
            }
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={initConfig.mode}
              selectedKeys={[initConfig.selectKey]}
              onClick={({ key }) => {
                setInitConfig({
                  ...initConfig,
                  selectKey: key as SettingsStateKeys,
                })
              }}
              items={getMenu()}
            />
          </div>

          <div className={styles.right}>
            <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
            {renderChildren()}
          </div>
        </div>
      </GridContent>
    </PageContainer>
  )
}
export default Settings
