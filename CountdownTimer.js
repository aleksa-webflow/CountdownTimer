class CountdownTimer {
  constructor(selector, deadline) {
    this.containers = Array.from(document.querySelectorAll(selector));
    if (this.containers.length === 0) {
      console.error(`CountdownTimer: No elements found for selector "${selector}"`);
      return;
    }

    this.deadline = new Date(deadline);
    if (isNaN(this.deadline)) {
      console.error(`CountdownTimer: Invalid deadline "${deadline}"`);
      return;
    }

    this.start();
  }

  start() {
    this.update(); // immediate first update
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    const diff = this.deadline - now;

    let days = 0, hours = 0, minutes = 0, seconds = 0;

    if (diff > 0) {
      days = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((diff / (1000 * 60)) % 60);
      seconds = Math.floor((diff / 1000) % 60);
    } else {
      this.stop();
    }

    this.setValues(days, hours, minutes, seconds);
  }

  setValues(days, hours, minutes, seconds) {
    for (const container of this.containers) {
      const daysEl = container.querySelector('[timer="days"]');
      const hoursEl = container.querySelector('[timer="hours"]');
      const minutesEl = container.querySelector('[timer="minutes"]');
      const secondsEl = container.querySelector('[timer="seconds"]');

      if (daysEl) daysEl.textContent = this.pad(days);
      if (hoursEl) hoursEl.textContent = this.pad(hours);
      if (minutesEl) minutesEl.textContent = this.pad(minutes);
      if (secondsEl) secondsEl.textContent = this.pad(seconds);
    }
  }

  pad(value) {
    return value.toString().padStart(2, '0');
  }

  stop() {
    clearInterval(this.interval);
  }
}