import useSWR from 'swr';
import axios from 'axios';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';
import { COUNTRY_ROUTE } from 'src/utils/apiendpoints';

// ----------------------------------------------------------------------

export function UsegetActiviteis() {
  const URL = endpoints.activity.list;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      products: data?.data || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function UsegetActivity(productId) {
  const URL = productId ? endpoints.activity.details(productId) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      product: data?.data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [(data?.data, error, isLoading, isValidating)]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function UseSearchActivity(query) {
  const URL = query ? [endpoints.activity.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.data || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.data.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export const FetchActivity = async (token) => {
  try {
    const response = await axios.get(endpoints.activity.list, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};

export const CreateActivity = async (data, token) => {
  try {
    const response = await axios.post(endpoints.activity.create, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};

// Update user
export const UpdateActivity = async (id, data, token) => {
  try {
    const response = await axios.put(endpoints.activity.details(id), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};

//  delete user
export const DeleteActivity = async (id, token) => {
  try {
    const response = await axios.delete(endpoints.activity.details(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};

export const DeleteMultipleActivity = async (id, token) => {
  try {
    const response = await axios.delete(endpoints.activity.deletes(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};

export const DeleteImageRemoval = async (id, token) => {
  try {
    const response = await axios.delete(endpoints.activity.imgdlt(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};


export const COUNTRIES = async ( token) => {
  try {
    const response = await axios.get(COUNTRY_ROUTE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error update property:', error);
    return null;
  }
};
