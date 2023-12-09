import { Year2023Day1 } from './day1';
import { Year2023Day2 } from './day2';

export function Year2023() {
    return (
        <>
            <h1 className='text-4xl'>2023</h1>
            <div className='flex gap-y-1 flex-col'>
                <Year2023Day1 />
                <Year2023Day2 />
            </div>
        </>
    );
}
