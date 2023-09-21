import React, { Component } from 'react';
import './ImageSlider.css'; // You'll create this CSS file for styling

class ImageSlider extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      currentIndex: 0, // Index of the currently displayed image
    };

    // Image data
    this.images = [
      'https://www.mapsofindia.com/ci-moi-images/my-india/sl-ch-punj-00051.jpg',
      'https://static.toiimg.com/thumb/msid-70212125,width-400,resizemode-4/70212125.jpg',
      'https://www.fabhotels.com/blog/wp-content/uploads/2019/04/Corbett-Falls.jpg',
    ];

    // Initialize the imageItems array
    this.imageItems = [];
  }

  // Navigation logic to move to the previous image
  handlePrev = () => {
    this.setState(
      (prevState) => ({
        currentIndex: (prevState.currentIndex - 1 + this.images.length) % this.images.length,
      }),
      () => console.log('Previous Index:', this.state.currentIndex)
    );

    // Apply the 'parallax' class with a delay
    setTimeout(() => {
      this.applyParallaxClass();
    }, 100); // Adjust the delay time as needed
  };

  
  // Navigation logic to move to the next image
  handleNext = () => {
    this.setState(
      (prevState) => ({
        currentIndex: (prevState.currentIndex + 1) % this.images.length,
      }),
      () => console.log('Next Index:', this.state.currentIndex)
    );

    // Apply the 'parallax' class with a delay
    setTimeout(() => {
      this.applyParallaxClass();
    }, 100); // Adjust the delay time as needed
  };

  // Apply or remove the 'parallax' class to the image items
  applyParallaxClass = () => {
    this.imageItems.forEach((item, index) => {
        if (item) {
          if (index === this.state.currentIndex) {
            item.classList.add('parallax');
          } else {
            item.classList.remove('parallax');
          }
        }
      });
    };

  // Navigation logic when a dot is clicked
  handleDotClick = (index) => {
    this.setState({ currentIndex: index }, () => {
      this.applyParallaxClass();
    });
  };

  render() {
    const { currentIndex } = this.state;

    return (
      <div className="image-slider">
        {/* Navigation Arrows */}
        <button className="prev-button" onClick={this.handlePrev}>
          &lt;
        </button>
        <button className="next-button" onClick={this.handleNext}>
          &gt;
        </button>

        {/* Image Container */}
        <div className="image-container">
          {this.images.map((imageUrl, index) => (
            <div
              key={index}
              ref={(item) => (this.imageItems[index] = item)} // Store the reference
              className={`image-item ${index === currentIndex ? 'active parallax' : ''}`} // Apply the 'parallax' class
            >
              <img src={imageUrl} alt={`Image ${index}`} />
            </div>
          ))}
        </div>

        {/* Navigation Dots (Optional) */}
        <div className="navigation-dots">
          {this.images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => this.handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    );
  }
}

export default ImageSlider;
