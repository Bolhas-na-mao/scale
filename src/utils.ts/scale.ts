let zoom = {
  current: 1,
  target: 1,
};

window.addEventListener('wheel', (event: WheelEvent) => {
  event.preventDefault();

  if (event.deltaY < 0) {
    zoom.target += 0.1;
  } else {
    zoom.target -= 0.1;
  }

  zoom.target = Math.max(0.5, Math.min(3, zoom.target));
});

export const scale = { zoom };
