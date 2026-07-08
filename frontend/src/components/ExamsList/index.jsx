import { useState, useEffect } from 'react'
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaFileMedical, FaSearch } from 'react-icons/fa'
import apiClient from '../../api/api'

const ExamsList = () => {
    const [page, setPage] = useState(1)
    const [exams, setExams] = useState([])
    const [total, setTotal] = useState(0)
    const [totalPagina, setTotalPagina] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const limite = 10

    useEffect(() => {
        const fetchExames = async () => {
            try {
                setIsLoading(true)
                const response = await apiClient.get(`/exames?pagina=${page}&limite=${limite}`)
                setExams(response.data.exames || [])
                setTotal(response.data.total || 0)
                setTotalPagina(response.data.totalPaginas || 0)
            } catch (error) {
                console.error("Erro ao listar exames", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchExames()
    }, [page])

    const filteredExams = exams.filter((exam) => (
        [
            exam.tipo_exame,
            exam.descricao,
            exam.resultado,
            exam.valor,
            exam.id,
        ]
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    ))

    const formatDate = (date) => {
        if (!date) return '-'
        const parsedDate = new Date(date)
        if (Number.isNaN(parsedDate.getTime())) return '-'
        return parsedDate.toLocaleDateString('pt-BR')
    }

    const startResult = total === 0 ? 0 : ((page - 1) * limite) + 1
    const endResult = Math.min(limite * page, total)

    return (
        <section className="bg-white shadow rounded-2xl p-6 mt-8 text-gray-800">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-cyan-800">Lista de exames</h2>
                    <p className="text-sm text-gray-600 mt-1">Acompanhe os exames cadastrados no sistema</p>
                </div>

                <div className="flex items-center gap-2 bg-cyan-50 text-cyan-800 px-4 py-2 rounded-lg">
                    <FaFileMedical />
                    <span className="font-semibold">{total}</span>
                    <span className="text-sm">exames</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                <label htmlFor="search-exams" className="text-gray-700 font-medium">
                    Buscar exame:
                </label>
                <div className="relative w-full sm:w-80">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        id="search-exams"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Digite tipo, descricao ou resultado"
                        className="border rounded-lg pl-10 pr-3 py-2 w-full focus:ring-2 focus:ring-cyan-600 outline-none"
                    />
                </div>
            </div>

            {isLoading ? (
                <p className="text-gray-500 text-center py-6">Carregando exames...</p>
            ) : filteredExams.length ? (
                <>
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-cyan-700 text-white text-sm">
                                    <th className="p-3 text-left">Registro</th>
                                    <th className="p-3 text-left">Tipo de Exame</th>
                                    <th className="p-3 text-left">Descricao</th>
                                    <th className="p-3 text-left">Data do Exame</th>
                                    <th className="p-3 text-left">Valor</th>
                                    <th className="p-3 text-left">Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExams.map((exame) => (
                                    <tr key={exame.id} className="border-b last:border-b-0 hover:bg-cyan-50 transition">
                                        <td className="p-3 text-sm text-gray-600">#{exame.id}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-cyan-100 text-cyan-700 p-2 rounded-full">
                                                    <FaFileMedical size={16} />
                                                </div>
                                                <span className="font-semibold text-gray-800">{exame.tipo_exame || '-'}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600 max-w-xs">
                                            <span className="line-clamp-2">{exame.descricao || '-'}</span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600">
                                            <span className="inline-flex items-center gap-2">
                                                <FaCalendarAlt className="text-cyan-700" />
                                                {formatDate(exame.data_exame)}
                                            </span>
                                        </td>
                                        <td className="p-3 text-sm text-gray-600">{exame.valor || '-'}</td>
                                        <td className="p-3 text-sm text-gray-600 max-w-xs">
                                            <span className="line-clamp-2">{exame.resultado || '-'}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                        <span className="text-sm text-gray-600">Resultado {startResult} a {endResult} de {total}</span>
                        <div className="flex gap-2 items-center justify-center">
                            <button
                                onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg border text-cyan-700 hover:bg-cyan-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Pagina anterior"
                            >
                                <FaChevronLeft />
                            </button>

                            {Array.from(Array(totalPagina)).map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setPage(i + 1)}
                                    className={`min-w-9 px-3 py-2 ${i + 1 === page ? "bg-cyan-800" : "bg-cyan-600"} cursor-pointer text-white rounded-lg hover:bg-cyan-700 transition`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setPage((currentPage) => Math.min(currentPage + 1, totalPagina))}
                                disabled={page === totalPagina}
                                className="p-2 rounded-lg border text-cyan-700 hover:bg-cyan-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                aria-label="Proxima pagina"
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-center py-6">
                    Nenhum exame encontrado
                </p>
            )}
        </section>
    )
}

export default ExamsList
