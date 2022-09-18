import React from 'react';
import '../Apps.css';
import { Button } from './Button';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className='hero-container'>
      <video type="gif" src='/videos/video-3.mp4' autoPlay loop muted />
      <h1>ADVENTURE AWAITS !</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
