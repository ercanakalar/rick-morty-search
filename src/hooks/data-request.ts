import { useState } from 'react';
import axios from 'axios';

export const DataRequest = (props: any) => {
  const { url, method } = props;

  const [errors, setErrors] = useState<string[]>([]);
  
  const doRequest = async () => {
    try {
      setErrors([]);
      const response = await axios(url, {
        method,
      });

      return response.data;
    } catch (err: any) {
      setErrors([err.response.data.error]);
    }
  };

  return { doRequest, errors };
};
