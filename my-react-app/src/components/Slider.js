import React, { useState, useEffect } from 'react';
import './Main.css';

const Slider = () => {
  const [currentAd, setCurrentAd] = useState(0);
  const randomAds = [
    {
      image: 'https://mblogthumb-phinf.pstatic.net/MjAyMzAzMTlfMTg4/MDAxNjc5MjIzNjM2MjM4.ZfmZKR8miRxvYfhdBAI3Qv9mf4E2zQvr59Sb74qSuTQg.EPXvjl8WT-8jGdgdQiY3cWW8F3VLDwq9V00VDh0gHc4g.JPEG.babtol2000/%EA%B5%90%EC%9C%A1_9_%EB%B3%B5%EC%82%AC.jpg?type=w800',
      title: '한옥에서의 평화로운 시간',
      description: '논산 한옥스테이와 함께 여유와 쉼을 느껴보세요.',
    },
    {
      image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNjEwMjVfMjQ2%2FMDAxNDc3MzY0NjMwNDIy.1ma9Tb7-ba5I-21jyusrof5G1tCY2zXEu28pjfSkD0og.uh63GdzvG_LPY4WJfyh8mMh_XBeFGRJgJ9uEJpsP4SEg.JPEG.lyu1388%2FDPP_0044.JPG&type=sc960_832',
      title: '제주도의 푸른 바다',
      description: '제주에서 만나는 에메랄드빛 바다와 돌담길.',
    },
    {
      image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMzFfMTQ1%2FMDAxNzA2NjcwMDE4NDUy.rGjWElE76tZi5k5IE_PzI9toVuqjamOVm-QBWQWpEVgg.T1TGYiZSaZfiqQZBzGpeLgR4SHV65SI2K2SDdT7xt0Ag.JPEG.green472%2F20240129_084605.jpg&type=sc960_832',
      title: '설악산 겨울 여행',
      description: '눈 덮인 설악산의 웅장함을 느껴보세요.',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prevAd) => (prevAd + 1) % randomAds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      <div className="slide">
        <img src={randomAds[currentAd].image} alt={randomAds[currentAd].title} />
        <div className="slide-text">
          <h2>{randomAds[currentAd].title}</h2>
          <p>{randomAds[currentAd].description}</p>
        </div>
      </div>
    </div>
  );
};

export default Slider;