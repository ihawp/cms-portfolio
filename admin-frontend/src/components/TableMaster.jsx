import { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";

function TableMaster({ Display, Form, formOrig, items, normalizeItem, title }) {

    const [addVisible, setAddVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateForm, setUpdateForm] = useState(formOrig);

    const changeUpdateForm = (e, itemId) => {
        const item = items.find(p => p.id === itemId);
        if (!item) return;

        const normalized = normalizeItem(item);

        setUpdateForm(normalized);
        setIsUpdate(itemId);
        setAddVisible(true);
    };

    const handleAddButton = (e) => {
        e.preventDefault();

        setUpdateForm(formOrig);

        setIsUpdate(false);

        setAddVisible(prev => !prev)
    }

    return <main className='flex flex-col'>
        
        <header className="w-full my-4 px-3 flex items-center justify-between">
            <h1 className="text-xl">{addVisible ? isUpdate ? `Update ${title} Item:` : `Add ${title} Item:` : `${title} Table:`}</h1>

            <nav aria-label={`${title} Table Navigation`}>
                <ul className='flex gap-3 justify-end'>
                    <li>
                        <a className="border border-blue-500 text-blue-500 w-max p-2 rounded-lg cursor-pointer flex gap-2" href={import.meta.env.VITE_SERVER_URL + title} title={`View the live site (ihawp.com/${title}).`} target='_blank' rel='noreferrer'><FaExternalLinkAlt size={14} className='self-center' /> View Page</a>
                    </li>
                    <li>
                        <button className={`${addVisible ? 'bg-red-600' : 'bg-green-600'} w-max p-2 rounded-lg cursor-pointer`} onClick={handleAddButton}>{addVisible ? '- Discard' : '+ Add'}</button>
                    </li>
                </ul>
            </nav>
        </header>

        {addVisible ? <section className='overflow-x-visible overflow-y-hidden flex flex-col items-center'>
            <Form formOrig={updateForm} isUpdate={isUpdate} setIsUpdate={setIsUpdate} setUpdateForm={setUpdateForm} />
        </section> : <section className='w-full overflow-x-auto overflow-y-hidden'>
            <Display changeUpdateForm={changeUpdateForm} />
        </section>}

    </main>
}

export default TableMaster;