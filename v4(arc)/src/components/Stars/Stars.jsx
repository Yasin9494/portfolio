import React, { useEffect, useRef, useState } from 'react';

export const Canvas = (props) => {
  const { draw, establishContext, establishCanvasWidth, ...rest } = props;
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  const resizeCanvas = (context) => {
    const canvas = context.canvas;
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      if (establishCanvasWidth) {
        establishCanvasWidth(canvas.width);
      }
      context.scale(ratio, ratio);
      return true;
    }
    return false;
  };

  useEffect(() => {
    //i.e. value other than null or undefined
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
      resizeCanvas(ctx);
      if (establishContext) {
        establishContext(ctx);
      }
    }
  }, []);

  useEffect(() => {
    //i.e. value other than null or undefined
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      window.addEventListener('resize', () => {
        resizeCanvas(ctx);
      });

      return (_) => {
        window.removeEventListener('resize', () => {
          resizeCanvas(ctx);
        });
      };
    }
  }, [context]);

  useEffect(() => {
    let animationFrameId;

    if (context) {
      const render = () => {
        animationFrameId = window.requestAnimationFrame(render);
        draw(context);
      };
      render();
    }
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, context, resizeCanvas]);

  return <canvas ref={canvasRef} {...rest} />;
};

export const Stars = (props) => {
  const [lastScroll, setlastScroll] = useState(0);
  const [stars, setStars] = useState([]);
  const [s, setS] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const opacity = (t, e) => {
    return Math.floor(Math.random() * 0.5 + 0.5);
  };

  useEffect(() => {
    if (Object.keys(s).length > 0) {
      var stars = [];

      for (var t = 0; t < 150; t++)
        stars.push({
          x: Math.random() * s.width - s.width / 2,
          y: Math.random() * s.height - s.height / 2,
          z: Math.random() * 1e3,
          d: Math.random() * 2 + 4,
          opacity: opacity(0.5, 1),
        });
      setStars(stars);
    }
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      setTimeout(async () => {
        setlastScroll(window.scrollY);
      }, 50);
    };
    const handleResize = (event) => {
      setS({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return (_) => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  });

  const onUpdate = (context) => {
    if (stars.length === 0) return;
    context.clearRect(0, 0, s.width, s.height);
    const scrollTop = window.scrollY;
    var delta = 0.5 + Math.abs(lastScroll - scrollTop) / 5;
    var speed = delta;
    for (var t = 0; t < stars.length; t++) {
      stars[t].z -= speed;
      if (stars[t].z <= 0) {
        stars[t].z = 1e3;
        stars[t].x = Math.random() * s.width - s.width / 2;
        stars[t].y = Math.random() * s.height - s.height / 2;
      }
    }
    for (var t = 0; t < stars.length; t++) {
      var e = 1e3 / stars[t].z,
        h = stars[t].x * e + s.width / 2,
        a = stars[t].y * e + s.height / 2,
        o = (1 - stars[t].z / 1e3) * stars[t].d,
        i = 1e3 / (stars[t].z + speed);
      i < 1 && (i = 1);
      var r = stars[t].x * i + s.width / 2,
        n = stars[t].y * i + s.height / 2;
      context.beginPath();
      context.strokeStyle = '#878787';
      context.lineWidth = o / 1.5;
      context.moveTo(r, n);
      context.lineTo(h, a);
      context.closePath();
      context.stroke();
      context.beginPath();
      context.arc(h, a, o / 1.5, 0, 2 * Math.PI);
      context.fill();
      context.fillStyle = '#878787';
    }
  };

  return <Canvas draw={onUpdate} style={{ width: '100%', height: '100%' }} />;
};
export default Stars;
