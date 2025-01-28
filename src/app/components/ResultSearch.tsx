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
        <div className="absolute bg-white z-10 top-18 sm:top-20 left-15 sm:left-20 rounded-md border border-gray-500 w-72 flex justify-center flex-col items-center px-2">
            {
                filteredResults.map((alfajor) => {
                    return <button className="py-2 border-b border-gray-200 w-full" key={alfajor.id} onClick={() => handleSearch(alfajor.alfajor)}>
                        {alfajor.alfajor}
                    </button>
                })
            }
        </div>
    )
}

export default ResultSearch