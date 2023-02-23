import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

import { CiCircleAlert } from 'react-icons/ci';
function Alert() {
	const { alert: message } = useContext(AlertContext);
	return (
		<div>
			{message !== null && (
				<p className='flex items-start mb-4 space-x-2'>
					{message.type === 'error' && (<CiCircleAlert size={30} color='red'/>)}
					<p className='flex-1 text-base leading-7 text-red-500'>
						<strong>{message.msg}</strong>
					</p>
				</p>
			)}
		</div>
	);
}

export default Alert;
