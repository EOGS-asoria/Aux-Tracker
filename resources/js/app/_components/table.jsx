import { useLayoutEffect, useRef, useState } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Table({
    data,
    columns,
    isCheckbox,
    dataChecked,
    setDataChecked,
}) {
    const checkbox = useRef();
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    // PROPERTIES
    // setDataChecked = useState
    // dataChecked = useState
    // columns=[]
    // data=[]
    // isCheckbox=boolean

    useLayoutEffect(() => {
        const isIndeterminate =
            dataChecked.length > 0 && dataChecked.length < data.length;
        setChecked(dataChecked.length === data.length);
        setIndeterminate(isIndeterminate);
        checkbox.current.indeterminate = isIndeterminate;
    }, [dataChecked]);

    function toggleAll() {
        setDataChecked(
            checked || indeterminate ? [] : data.map((res) => res.id)
        );
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    }

    return (
        <div className="flow-root w-full shadow-2xl">
            {/* <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"> */}
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle ">
                    <div className="relative">
                        {isCheckbox && dataChecked.length > 0 && (
                            <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                                >
                                    Bulk edit
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                                >
                                    Delete all
                                </button>
                            </div>
                        )}
                        <table className="min-w-full table-fixed divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    {isCheckbox && (
                                        <th
                                            scope="col"
                                            className="relative px-7 sm:w-12 sm:px-6"
                                        >
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                ref={checkbox}
                                                checked={checked}
                                                onChange={toggleAll}
                                            />
                                        </th>
                                    )}

                                    {columns.map((column, i) => (
                                        <th
                                            key={i}
                                            scope="col"
                                            className="min-w-[8rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                        >
                                            {column.title}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {data.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className={
                                            dataChecked.includes(row.id)
                                                ? "bg-gray-50"
                                                : undefined
                                        }
                                    >
                                        {isCheckbox && (
                                            <td className="relative px-7 sm:w-12 sm:px-6">
                                                {dataChecked.includes(
                                                    row.id
                                                ) && (
                                                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                                    )}

                                                <input
                                                    type="checkbox"
                                                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={row.id}
                                                    checked={dataChecked.includes(
                                                        row.id
                                                    )}
                                                    onChange={(e) =>
                                                        setDataChecked(
                                                            e.target.checked
                                                                ? [
                                                                    ...dataChecked,
                                                                    row.id,
                                                                ]
                                                                : dataChecked.filter(
                                                                    (p) =>
                                                                        p !==
                                                                        row.id
                                                                )
                                                        )
                                                    }
                                                />
                                            </td>
                                        )}

                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className={classNames(
                                                    "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                                                    dataChecked.includes(row)
                                                        ? "text-indigo-600"
                                                        : "text-gray-900"
                                                )}
                                            >
                                                {row[column.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
