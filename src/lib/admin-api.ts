// Payload REST API Client
const API_BASE = '/api'

interface ApiResponse<T> {
    docs?: T[]
    doc?: T
    totalDocs?: number
    totalPages?: number
    page?: number
}

class PayloadAPI {
    private async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }))
            throw new Error(error.message || `HTTP ${response.status}`)
        }

        return response.json()
    }

    // Generic CRUD operations
    async find<T>(
        collection: string,
        params?: {
            page?: number
            limit?: number
            where?: any
            sort?: string
        }
    ): Promise<ApiResponse<T>> {
        const searchParams = new URLSearchParams()
        if (params?.page) searchParams.set('page', params.page.toString())
        if (params?.limit) searchParams.set('limit', params.limit.toString())
        if (params?.where) searchParams.set('where', JSON.stringify(params.where))
        if (params?.sort) searchParams.set('sort', params.sort)

        const query = searchParams.toString()
        return this.request(`/${collection}${query ? `?${query}` : ''}`)
    }

    async findById<T>(collection: string, id: string): Promise<{ doc: T }> {
        return this.request(`/${collection}/${id}`)
    }

    async create<T>(collection: string, data: any): Promise<{ doc: T }> {
        return this.request(`/${collection}`, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async update<T>(collection: string, id: string, data: any): Promise<{ doc: T }> {
        return this.request(`/${collection}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        })
    }

    async delete(collection: string, id: string): Promise<void> {
        return this.request(`/${collection}/${id}`, {
            method: 'DELETE',
        })
    }

    // File upload
    async uploadFile(file: File): Promise<{ doc: any }> {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch(`${API_BASE}/media`, {
            method: 'POST',
            body: formData,
        })

        if (!response.ok) {
            throw new Error('File upload failed')
        }

        return response.json()
    }
}

export const payloadAPI = new PayloadAPI()

// Type-safe collection helpers
export const resourcesAPI = {
    list: (params?: any) => payloadAPI.find('resources', params),
    get: (id: string) => payloadAPI.findById('resources', id),
    create: (data: any) => payloadAPI.create('resources', data),
    update: (id: string, data: any) => payloadAPI.update('resources', id, data),
    delete: (id: string) => payloadAPI.delete('resources', id),
}

export const documentariesAPI = {
    list: (params?: any) => payloadAPI.find('documentaries', params),
    get: (id: string) => payloadAPI.findById('documentaries', id),
    create: (data: any) => payloadAPI.create('documentaries', data),
    update: (id: string, data: any) => payloadAPI.update('documentaries', id, data),
    delete: (id: string) => payloadAPI.delete('documentaries', id),
}

export const usersAPI = {
    list: (params?: any) => payloadAPI.find('users', params),
    get: (id: string) => payloadAPI.findById('users', id),
    update: (id: string, data: any) => payloadAPI.update('users', id, data),
}

export const ordersAPI = {
    list: (params?: any) => payloadAPI.find('orders', params),
    get: (id: string) => payloadAPI.findById('orders', id),
}

export const membershipsAPI = {
    list: (params?: any) => payloadAPI.find('membership-plans', params),
    get: (id: string) => payloadAPI.findById('membership-plans', id),
    create: (data: any) => payloadAPI.create('membership-plans', data),
    update: (id: string, data: any) => payloadAPI.update('membership-plans', id, data),
    delete: (id: string) => payloadAPI.delete('membership-plans', id),
}
