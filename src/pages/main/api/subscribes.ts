import { http } from '@/shared/api'

export const subscribeToTariff = async (tariff_id: string): Promise<boolean> => {
  http.isSuccess({ url: '/subscription', method: 'POST', data: { tariff_id } })
  return true
}
