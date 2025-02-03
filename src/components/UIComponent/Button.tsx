

const Button = ({ onclick, children }: { onclick: () => void, children: React.ReactNode }) => {
    return (
        <div onClick={onclick} className='rounded-xl border-2 border-gray-300 border-double px-4 py-2  cursor-pointer hover:bg-cyan-700 '>
            <div className='font-bold geist-about text-white'>
                {children}
            </div>

        </div>
    )
}

export default Button
