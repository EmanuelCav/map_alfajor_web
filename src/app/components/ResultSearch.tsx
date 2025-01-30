import { ResultSearchPropsType } from "../types/props.types"

const ResultSearch = ({ data, searchQuery, handleSearch }: ResultSearchPropsType) => {

    const normalizeString = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    const filteredResults = data
        .filter((alfajor) =>
            normalizeString(alfajor.alfajor).toLowerCase().includes(normalizeString(searchQuery).toLowerCase())
        )
        .sort((a, b) => {
            const queryLower = normalizeString(searchQuery).toLowerCase();
            const startsWithA = normalizeString(a.alfajor).toLowerCase().startsWith(queryLower)
            const startsWithB = normalizeString(b.alfajor).toLowerCase().startsWith(queryLower)

            if (startsWithA && !startsWithB) return -1
            if (!startsWithA && startsWithB) return 1
            return 0
        }).slice(0, 6)

    return (
        <div className={`absolute bg-white z-20 top-16 sm:top-18 left-13 sm:left-20 rounded-md 
        ${filteredResults.length > 0 && "border border-gray-500"} w-72 flex justify-center flex-col items-center`}>
            {
                filteredResults.map((alfajor) => {
                    return <button className="py-2 border-b border-gray-200 w-full rounded-md hover:bg-gray-100 active:bg-white cursor-pointer mx-2"
                        key={alfajor.id} onClick={() => handleSearch(alfajor.alfajor)}>
                        {alfajor.alfajor}
                    </button>
                })
            }
        </div>
    )
}

export default ResultSearch