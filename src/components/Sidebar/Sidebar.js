import './Sidebar.css'

export default function Sidebar(props) {

    return (
        <div className="sidebar-wrapper">
            <div className='sidebar-container'>
                <h3 className='sidebar-titles' title='' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>All Products</h3>
                <h3 className='sidebar-titles' title='Storage' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Storage</h3>
                <h3 className='sidebar-titles' title='Graphics card' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Graphics card</h3>
                <h3 className='sidebar-titles' title='Processors' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Processors</h3>
                <h3 className='sidebar-titles' title='Bridges + Routers' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Bridges + Routers</h3>
                <h3 className='sidebar-titles' title='Smartphones + Tablets' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Smartphones + Tablets</h3>
                <h3 className='sidebar-titles' title='Gaming + VR' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Gaming + VR</h3>
                <h3 className='sidebar-titles' title='TV + Home cinema' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>TV + Home cinema</h3>
                <h3 className='sidebar-titles' title='Notebooks + PCs' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Notebooks + PCs</h3>
                <h3 className='sidebar-titles' title='Hard Drives' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Hard Drives</h3>
                <h3 className='sidebar-titles' title='Peripherals' onClick={(e)=> props.filterProductsByCategory(e.target.title)}>Peripherals</h3>
            </div>
        </div>
    )
}