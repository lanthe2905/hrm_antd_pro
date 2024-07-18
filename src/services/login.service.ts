import { User } from '@/models/user.model'
// import Cookies from 'universal-cookie'

const initUser: any = { id: 0, ho_va_ten: '' }
// const cookies = new Cookies(null, { path: '/' })

const getUserLogin = (): User => {
  let userStore = localStorage.getItem('user')
  let user: User | null = null

  try {
    if (userStore) {
      user = JSON.parse(userStore)
    }

    return user ?? (initUser as User)
  } catch (error) {
    return initUser as User
  }
}
  
const setUserLogin = async (user: User): Promise<void> => {
  try {
    let userJson: string = JSON.stringify(user)
    localStorage.setItem('user', userJson)
  } catch (error) {
    JSON.stringify(initUser)
  }
}

export {  setUserLogin, getUserLogin }
