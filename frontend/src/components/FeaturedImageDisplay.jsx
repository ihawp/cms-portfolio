import { useState } from 'react';

function FeaturedImageDisplay({ item, mainImageClasses, secondaryClasses, containerClasses, imageClasses, smallImageClasses, addClasses }) {

    const [selectedImage, setSelectedImage] = useState(item.images ? item.images[0] : 'default-img.webp');
    const [keyMax, setKeyMax] = useState(1);

    const updateSelectedImage = (e) => {

        setSelectedImage(e.target.dataset.item)
    }

    const updateSelectedImageByKey = (e) => {

        if (e.key === 'Enter') {
            updateSelectedImage(e);
        }

    }

    const updateKeyMax = () => {
        setKeyMax(item.images.length);
    }

    const updateKeyMaxByKey = (e) => {
        if (e.key === 'Enter') {
            updateKeyMax();
        }
    }

    return item.images ? <div className={containerClasses}>
        <div className={mainImageClasses}>
            <img src={import.meta.env.VITE_SERVER_URL + 'images/' + (selectedImage)} alt="" title="" draggable="false" className={imageClasses} />
        </div>
        
        <div className={secondaryClasses}>
            {item.images.length > 1 ? item.images.map((image, key) => {

                if (key < keyMax) { 
                    return <img src={import.meta.env.VITE_SERVER_URL + 'images/' + image} tabIndex={0} alt="" title="" draggable="false" onClick={ updateSelectedImage } onKeyDown={ updateSelectedImageByKey } data-item={image} className={`${smallImageClasses} ${image === selectedImage ? 'border-[#555]' : 'border-transparent'}`} key={key} /> 
                } else if (item.images.length - 1 === key) {
                    return <div className='flex items-center' tabIndex={0} key={key} onClick={ updateKeyMax } onKeyDown={ updateKeyMaxByKey }>
                        <div className={addClasses} key={key}>+{item.images.length - 1}
                        </div>
                    </div>
                }

            }) : null }
        </div>
    </div> : <div className="loader"></div>
}

export default FeaturedImageDisplay;