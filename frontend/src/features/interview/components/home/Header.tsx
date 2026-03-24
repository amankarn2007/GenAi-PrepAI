

export default function Header() {
    
    return (
        <div className='w-full flex flex-col items-center'>
            <h1 className="text-4xl text-white font-bold">
                Create Your Custom <span className='text-pink-500'>Interview Plan</span>
            </h1>
            <p className="text-gray-400 w-[75%] text-center py-2">
                Let our AI analyze the job requirements and your unique profile to build a winning strategy.
            </p>
        </div>
    )
}