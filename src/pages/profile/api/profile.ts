import { http } from '@/shared/api'
import type { User } from '@/entities/user'
import type { Profile } from '../model'

const PROFILE_PATH = '/profile'

interface ProfileDTO {
  id: string
  email: string
  name: string | null
  address: string | null
  role: User['role']
  created_at: string
}

export const getProfile = async (): Promise<Profile | null> => {
  const data = await http.fetchData<ProfileDTO>({ url: PROFILE_PATH, method: 'GET' })

  return data === null ? null : profileMapDTO(data)
}

const profileMapDTO = ({ email, name, address }: ProfileDTO): Profile => ({ email, name, address })

export const updateProfile = (payload: { name: string; address: string }): Promise<boolean> =>
  http.isSuccess({ url: PROFILE_PATH, method: 'PUT', data: payload })
