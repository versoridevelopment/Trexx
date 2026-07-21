import { apiFetch } from '../client'

export const settingsService = {
  getByKey: async (key: string) => {
    const data = await apiFetch<any>(`/settings/${key}`)
    return data.value
  },
  
  updateByKey: async (key: string, value: any, accessToken: string) => {
    return apiFetch<any>(`/settings/${key}`, {
      method: 'PUT',
      body: { value },
      accessToken
    })
  },

  uploadMedia: async (file: File, accessToken: string, folder?: string) => {
    const formData = new FormData()
    formData.append('file', file)
    if (folder) {
      formData.append('folder', folder)
    }

    const data = await apiFetch<any>('/settings/upload', {
      method: 'POST',
      body: formData,
      accessToken
    })
    
    return data.url
  }
}
