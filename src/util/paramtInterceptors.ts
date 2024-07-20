export default (params: any) => {
  const removeKeys = ['pageSize', 'current']
  params.per_page = params.pageSize
  params.page = params.current
  Object.keys(params).forEach((key: string) => {
    if (removeKeys.includes(key)) {
      delete params[key]
    }
  })
  return params
}