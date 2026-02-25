
interface buttontype {
    children: string;
    onClick: () => void;

}

export default function Button({
    children,
    onClick,
}: buttontype){
    return <div onClick={onClick} className='bg-blue-500 text-xl font-bold font-mono rounded-lg py-4 px-10 text-white hover:bg-blue-400 cursor-pointer'>
        {children}
    </div>
}