import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const globalErrorHandler = (errors: AxiosError) => {
    if(process.env.NODE_ENV === 'development') {
        console.log('ERROR INFO', errors.response);
    }

    if (errors === undefined) {
        toast.error('Проблемы с интернет соединением', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    } else {
        if (errors.response?.status === 400) {
            if (Array.isArray(errors.response.data)) {
                for (let i = 0; i < errors.response.data.length; i++) {
                    setTimeout(() => {
                        toast.error(errors.response?.data[i].message, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            
                        });
                    }, 200 * (i + 1))
                }
            } else {
                toast.error('Что-то пошло не так', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } else if (errors.response?.status === 401) {
            console.log('NOAUTORIZE')
            
        } else if (errors.response?.status === 403) {
            toast.error('ЗАПРЕЩЕНО!', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } else {
            toast.error('Что-то пошло не так,', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }
}