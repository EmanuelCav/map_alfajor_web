
const Loading = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col">
            <img src="/loading.gif" alt="loading..." className="w-20 h-20" />
            <p className="text-amber-600 mt-4 text-xl font-semibold">Cargando</p>
        </div>
    )
}

export default Loading