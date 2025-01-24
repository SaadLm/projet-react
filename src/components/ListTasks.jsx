import React, {useEffect, useState} from 'react';
// import { Space,Table, Tag } from 'antd';
// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         render: (text) => <a>{text}</a>,
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//         key: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//         key: 'address',
//     },
//     {
//         title: 'Etat',
//         key: 'tags',
//         dataIndex: 'tags',
//         render: (_, { tags }) => (
//             <>
//                 {tags.map((tag) => {
//                     let color = tag.length > 5 ? 'red' : 'green';
//
//                     return (
//                         <Tag color={color} key={tag}>
//                             {tag.toUpperCase()}
//                         </Tag>
//                     );
//                 })}
//             </>
//         ),
//     },
//     {
//         title: 'Action',
//         key: 'action',
//         render: (_, record) => (
//             <Space size="middle">
//                 <a>Invite {record.name}</a>
//                 <a>Delete</a>
//             </Space>
//         ),
//     },
// ];

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Check if data exists in localStorage
        const storedData = localStorage.getItem('tableData');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            // If no data in localStorage, initialize it with default data
            const initialData = [
                {
                    key: '1',
                    name: 'Projet 1',
                    tags: ['En Attente'],
                },
                {
                    key: '2',
                    name: 'Controle 2',
                    tags: ['En Attente'],
                },
                {
                    key: '3',
                    name: 'EFF',
                    tags: ['Done'],
                },
            ];
            localStorage.setItem('tableData', JSON.stringify(initialData));
            setData(initialData);
        }
    }, []);

    const handleChangeTag = (key) => {
        const updatedData = data.map((item) =>
            item.key === key
                ? { ...item, tags: item.tags[0] === 'En Attente' ? ['Done'] : ['En Attente'] }
                : item
        );

        // Update localStorage and state
        localStorage.setItem('tableData', JSON.stringify(updatedData));
        setData(updatedData);
    };

    const handleDeleteLog = (key)=>{
        const updatedData = data.filter(item => item.key !== key);
        localStorage.setItem('tableData', JSON.stringify(updatedData));
        setData(updatedData);
    }


    return <>
        <table className="table table-rounded mt-5 table-flush w-100 fw-bolder ">
            <thead>
            <tr>
                <th>Name</th>
                <th>Etat</th>
                <th>Action</th>
                <th>Suprimer</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.key}>
                    <td>{item.name}</td>
                    <td>
                        {item.tags.map((tag, index) => (
                            <span
                                className='me-0'
                                key={index}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: tag === 'Done' ? 'green' : 'red',
                                    color: 'white',
                                    borderRadius: '5px',
                                    fontSize: '12px',
                                    width: '100%'
                                }}
                            >
                                    {tag}
                                </span>
                        ))}
                    </td>
                    <td>
                        {/* Conditional rendering for the icons */}
                        {item.tags.includes("Done") && (
                            <i
                                className="m-2 text-danger bi bi-exclamation-circle-fill"
                                title="clické pour annuler"
                                style={{cursor: 'pointer'}}
                                onClick={() => handleChangeTag(item.key)}
                            ></i>
                        )}
                        {item.tags.includes("En Attente") && (
                            <i className="m-2 text-success bi bi-check-square-fill bi-2x"
                               title="clické pour terminer la tache"
                               style={{cursor: 'pointer'}}
                               onClick={() => handleChangeTag(item.key)}
                            ></i>
                        )}
                    </td>
                    <td className="text-danger" style={{cursor:'pointer'}}>
                        <span onClick={()=>handleDeleteLog(item.key)}>suprimer</span>
                    </td>

                </tr>
            ))}
            </tbody>
        </table>
    </>;
};
export default App;
