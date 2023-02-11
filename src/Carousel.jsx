import {Component} from 'react'

class Carousel extends Component {
    state = {
        active: 0
    }
    static defaultProps = {
        images: ["https://pets-images.dev-apis.com/pets/none.jpg"]
    }

    handleIndexClick = (e) => {
        this.setState({
            active: +e.target.dataset.index,
            //+ turns a string to a number, index was a string coming from DOM
        })
    }

    render () {
        const {active} = this.state
        const {images} = this.props

        return (
            <div className='carousel'>
                <img src={images[active]} alt="animal hero" />
                <div className='carousel-smaller'>
                    {images.map((photo, index) => (
                        // eslint-disable-next-line
                        <img onClick={this.handleIndexClick} data-index={index} key={photo} src={photo} className={index === active ? "active": ""} alt="animal" />
                    ))}
                </div>

            </div>
        )
    }
}
export default Carousel