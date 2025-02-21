export const SomethingWentWrong = () => {
    return (
        <div className="hero bg-base-200 min-h-[85vh]">
            <div className="hero-content text-center">
                <div className="max-w-md">
                <h1 className="text-5xl font-bold">Something Went Wrong</h1>
                <p className="py-6">
                    Something didn't go as expected, unable to connect to the server
                </p>
                <button className="btn btn-primary" onClick={() => location.reload()}>Try Again</button>
                </div>
            </div>
        </div>
    )
}