import { http } from '@/shared/api'
import type { Invoice } from '../model'

const INVOICE_PATH = '/invoices'

interface InvoiceDTO {
  id: string
  user_id: string
  amount: number
  status: string
  created_at: string
  users: {
    id: string
    name: string | null
    email: string
  }
}

export const getInvoiceList = async (): Promise<Array<Invoice>> => {
  const list = await http.fetchData<Array<Invoice>>({ url: INVOICE_PATH, method: 'GET' })

  return list === null ? [] : list.map(invoiceMapDTO)
}

const invoiceMapDTO = ({ id, users: { email }, amount, status }: InvoiceDTO): Invoice => ({
  id,
  email,
  amount,
  status
})

export const createInvoice = async (userId: string = ''): Promise<boolean> =>
  http.isSuccess({
    url: `${INVOICE_PATH}/generate/${userId}`,
    method: 'POST'
  })
