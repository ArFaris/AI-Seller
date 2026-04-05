const BASE_URL = 'http://localhost:8080';

export const getItems = async (params?: {
    q?: string,
    limit?: number,
    skip?: number,
    sortColumn?: string,
    sortDirection?: string,
    categories?: string
}) => {
    const queryParams = new URLSearchParams();
    
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                queryParams.append(key, String(value));
            }
        });
    }
    
    const query = queryParams.toString();
    const url = `${BASE_URL}/items${query ? `?${query}` : ''}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Ошибка загрузки списка');
    }

    return res.json();
}

export const getItem = async (id:  string) => {
    const res = await fetch(`${BASE_URL}/items/${id}`);

    if (!res.ok) {
        throw new Error('Ошибка загрузки товара');
    }

    const data = await res.json();
    
    return data;
}

export const updateItem = async (id: string, body: Record<string, any>) => {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const responseData = await res.json();
    
    if (!res.ok) {
        throw new Error(responseData.error || 'Ошибка обновления товара');
    }

    return responseData;
}
