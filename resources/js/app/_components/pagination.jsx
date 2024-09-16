// import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
// import { Link } from "@inertiajs/react";

// export default function Pagination({ data }) {
//     const currentPage = data?.current_page;
//     const lastPage = data?.last_page;
//     const maxVisiblePages = 5; // Maximum number of pages to show

//     const getPageNumbers = () => {
//         const pages = [];

//         if (lastPage <= maxVisiblePages) {
//             for (let i = 1; i <= lastPage; i++) {
//                 pages.push(i);
//             }
//         } else {
//             if (currentPage <= 3) {
//                 pages.push(1, 2, 3, 4, '...', lastPage);
//             } else if (currentPage > lastPage - 3) {
//                 pages.push(1, '...', lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
//             } else {
//                 pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage);
//             }
//         }

//         return pages;
//     };

//     return (
//         <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 w-full">
//             <div className="-mt-px flex w-0 flex-1">
//                 {currentPage > 1 && (
//                     <Link
//                         href={`?page=${currentPage - 1}`}
//                         className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                     >
//                         <ArrowLongLeftIcon
//                             aria-hidden="true"
//                             className="mr-3 h-5 w-5 text-gray-400"
//                         />
//                         Previous
//                     </Link>
//                 )}
//             </div>
//             <div className="hidden md:-mt-px md:flex">
//                 {getPageNumbers().map((page, index) => (
//                     <Link
//                         key={index}
//                         href={typeof page === 'number' ? `?page=${page}` : "#"}
//                         className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${currentPage === page
//                             ? "text-blue-600 border-blue-600"
//                             : "text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                             }`}
//                     >
//                         {page}
//                     </Link>
//                 ))}
//             </div>
//             <div className="-mt-px flex  flex-1 justify-end w-full">
//                 {currentPage < lastPage && (
//                     <Link
//                         href={`?page=${currentPage + 1}`}
//                         className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                     >
//                         Next
//                         <ArrowLongRightIcon
//                             aria-hidden="true"
//                             className="ml-3 h-5 w-5 text-gray-400"
//                         />
//                     </Link>
//                 )}
//             </div>
//         </nav>
//     );
// }


import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ currentPage, lastPage, setCurrentPage }) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < lastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // Generate pagination items
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={handlePrevious}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    disabled={currentPage === lastPage}
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to <span className="font-medium">{Math.min(currentPage * 10, lastPage * 10)}</span> of{' '}
                        <span className="font-medium">{lastPage * 10}</span> results
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            onClick={handlePrevious}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageClick(page)}
                                aria-current={page === currentPage ? "page" : undefined}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === currentPage
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            disabled={currentPage === lastPage}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
