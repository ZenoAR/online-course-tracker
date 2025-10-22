import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useTable, usePagination } from 'react-table'
import api from '../api'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const UpdateCourse = ({ id }) => {
    const handleUpdate = () => {
        window.location.href = `/courses/update/${id}`
    }
    return <Update onClick={handleUpdate}>Update</Update>
}

const DeleteCourse = ({ id, onDelete }) => {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Do you want to delete the Course ${id} permanently?`);

        if (confirmDelete) {
            try {
                const response = await api.deleteCourseById(id);
                if (response.status === 200) {
                    if (onDelete) onDelete(id); // Pass the id to the parent callback
                    window.alert('Course deleted successfully.');
                } else {
                    throw new Error('Failed to delete Course from server');
                }
            } catch (error) {
                console.error('Failed to delete Course:', error);
                window.alert('There was an error deleting the Course. Please try again.');
            }
        }
    };

    return <Delete onClick={handleDelete}>Delete</Delete>;
};

const CoursesList = () => {
    const [Courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await api.getAllCourses();
                setCourses(response.data.data);
            } catch (error) {
                console.error('Error fetching Courses:', error);
            }
            setIsLoading(false);
        };
        fetchCourses();
    }, []);

    const handleDelete = useCallback(
        (id) => {
            setCourses((prevCourses) => prevCourses.filter((Course) => Course._id !== id));
        },
        [] // No dependencies
    );

    const data = useMemo(() => Courses, [Courses]);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: '_id',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ value }) => (value ? value.join(' / ') : ''),
            },
            {
                Header: 'Term',
                accessor: 'term',
                Cell: ({ value }) => (value ? value.join(' / ') : ''),
            },
            {
                Header: 'Location',
                accessor: 'location',
            },
            {
                Header: 'Credit Hour',
                accessor: 'credit_hr',
            },
            {
                Header: '',
                id: 'delete',
                Cell: ({ row }) => <DeleteCourse id={row.original._id} onDelete={handleDelete} />,
            },
            {
                Header: '',
                id: 'update',
                Cell: ({ row }) => <UpdateCourse id={row.original._id} />,
            },
        ],
        [handleDelete]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        pageOptions,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    return (
        <Wrapper>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <table {...getTableProps()} className="table table-striped">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            Previous
                        </button>
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </Wrapper>
    )
}

export default CoursesList
