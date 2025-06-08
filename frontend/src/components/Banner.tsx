type BannerProps = {
	title: string;
}

export const Banner = ({title}: BannerProps) => 
<>
    <div className='flex justify-center -z-10 h-40 max-full bg-sky-11 
    absolute top-0 left-0 w-full'>
        <h1 className='text-white font-bold text-3xl mt-10'>{title}</h1>
    </div>
    <div className='-z-10 h-20 max-full bg-sky-7 absolute top-40 
    left-0 w-full'></div>
    <div className='-z-10 h-10 max-full bg-sky-4 absolute top-60 
    left-0 w-full'></div>

</>

