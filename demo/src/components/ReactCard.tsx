import { useEffect, useRef } from 'react';
import { shine } from 'shine-on-hover';

interface Props {
	title: string;
	description: string;
	customClass?: string;
}

export const ReactCard: React.FC<Props> = ({ title, description }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			const cleanup = shine(ref.current);
			return cleanup;
		}
	}, []);

	return (
		<div ref={ref} className='p-4 w-96 h-42 rounded-lg bg-gray-900 shadow-md'>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
	);
};
